import { Schema, model, Types, Document, Query } from 'mongoose'
import User from './userModel'

interface DocType {
  doc: Types.ObjectId
  refModel: string
}

interface CategoryType {
  categoryName: string
  docs: DocType[]
}

const categorySchema = new Schema<CategoryType>(
  {
    categoryName: {
      type: String,
      required: true,
    },
    docs: [
      {
        doc: {
          type: Schema.ObjectId,
          ref: 'refModel',
        },
        refModel: {
          type: String,
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
  recent: Types.ObjectId[]
  isCurrent: Boolean
  categories: CategoryType[]
  campaigns: Types.ObjectId[]
  characters: Types.ObjectId[]
  factions: Types.ObjectId[]
  species: Types.ObjectId[]
  traits: Types.ObjectId[]
  nations: Types.ObjectId[]
  locations: Types.ObjectId[]
  settlements: Types.ObjectId[]
  items: Types.ObjectId[]
  bestairy: Types.ObjectId[]
  lore: Types.ObjectId[]
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
      unique: true,
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

codexSchema.pre(
  /^find/,
  function (this: Query<CodexDocument[], CodexDocument>, next) {
    this.populate({
      path: 'categories',
      select: '-__v ',
    })
    this.populate({
      path: 'recent',
      select: '-__v',
    })
    next()
  }
)

codexSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const user = await User.findById(this.createdBy)

      if (user) {
        user.codex.push(this._id)
        await user.save()
      }
    }

    next()
  } catch (error) {
    next()
  }
})

const Codex = model<CodexDocument>('Codex', codexSchema)

export default Codex
