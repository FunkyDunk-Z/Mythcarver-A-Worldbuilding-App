import { Schema, model, Types, Document, Query } from 'mongoose'
import User from './userModel'
import { NextFunction } from 'express'
import AppError from '../util/appError'

export interface DocType {
  docId: Types.ObjectId
  refModel: string
  docName: string
  docType: string
  docImage: string | null
}

export interface CategoryType {
  categoryName: string
  categoryUrl: string
  docs: DocType[]
}

export interface RecentType {
  docs: DocType[]
  lengthAllowed: number
}

const refModelEnum = ['Character']

const docSchema = new Schema<DocType>(
  {
    docId: {
      type: Schema.ObjectId,
      ref: 'refModel',
    },
    docImage: {
      type: String,
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
  {
    _id: false,
  }
)

const categorySchema = new Schema<CategoryType>(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryUrl: {
      type: String,
    },
    docs: [docSchema],
  },
  {
    _id: false,
  }
)

interface CodexDocument extends Document {
  createdBy: Types.ObjectId
  codexName: string
  codexUrl: string
  recent: RecentType
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
    },
    codexUrl: {
      type: String,
    },
    recent: {
      docs: [docSchema],
      lengthAllowed: {
        type: Number,
        default: 5,
      },
    },
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

// codexSchema.pre(
//   /^find/,
//   function (this: Query<CodexDocument[], CodexDocument>, next) {
//     this.populate({
//       path: 'recent',
//       select: '-__v',
//     })
//     next()
//   }
// )

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
  } catch (error) {
    console.error(error)
    new AppError('Could add codex to user', 404)
  }
})

export const Codex = model<CodexDocument>('Codex', codexSchema)
