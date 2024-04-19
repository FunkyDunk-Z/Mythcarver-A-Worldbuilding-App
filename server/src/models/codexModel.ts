import { Schema, model, Types, Document, Query } from 'mongoose'
import User from './userModel'
import { CategoryType } from './categoryModel'
import AppError from '../util/appError'

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
    categories: [
      {
        type: Schema.ObjectId,
        ref: 'Category',
      },
    ],
  },
  {
    timestamps: true,
  }
)

codexSchema.pre('save', async function (next) {
  try {
    console.log('do something here')
    console.log(this.categories)
  } catch (error) {
    console.log(error)
    new AppError('Could not create category!', 404)
  }
  next()
})

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
