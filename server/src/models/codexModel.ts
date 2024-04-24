import { Schema, model, Types, Document, Query } from 'mongoose'
import User from './userModel'

interface DocType {
  docId: Types.ObjectId
  refModel: string
  docName: string
  docType: string
  docImage: string
}

export interface CategoryType {
  _id: string
  categoryName: string
  categoryUrl: string
  docs: DocType[]
}

const refModelEnum = ['Characters']

const categorySchema = new Schema<CategoryType>(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryUrl: {
      type: String,
    },
    docs: [
      {
        docId: {
          type: Schema.ObjectId,
          ref: 'refModel',
        },
        docName: {
          type: String,
        },
        docType: {
          type: String,
        },
        refModel: {
          type: String,
          enum: refModelEnum,
          required: true,
        },
      },
    ],
  },
  {
    _id: false,
  }
)

interface CodexDocument extends Document {
  createdBy: Types.ObjectId
  codexName: string
  codexUrl: string
  recent: string[]
  isCurrent: Boolean
  categories: CategoryType[]
}

const codexSchema = new Schema<CodexDocument>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    codexName: {
      type: String,
      required: true,
      // unique: true,
    },
    codexUrl: {
      type: String,
    },
    recent: [],
    categories: [categorySchema],
    isCurrent: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

// Format codex and category names
codexSchema.pre('save', function (next) {
  if (this.codexName) {
    const url = this.codexName.replace(/ /g, '-').toLowerCase()

    this.codexUrl = url
  }

  if (this.categories) {
    this.categories.map((el) => {
      el.categoryUrl = el.categoryName.replace(/ /g, '-').toLowerCase()
    })
  }

  next()
})

codexSchema.pre(
  /^find/,
  function (this: Query<CodexDocument[], CodexDocument>, next) {
    this.populate({
      path: 'recent',
      select: '-__v',
    })
    next()
  }
)

// Add codex to user
codexSchema.pre('save', async function () {
  try {
    if (this.isNew) {
      const user = await User.findById(this.createdBy)

      if (user) {
        user.codex.push(this._id)
        await user.save()
      }
    }

    // next()
  } catch (error) {
    // next()
  }
})

export const Codex = model<CodexDocument>('Codex', codexSchema)
