import { Schema, model, Types, Document, Query } from 'mongoose'

// Models
import User from './userModel'
import { docSchema, DocType } from './docSchema'

// Utils
import AppError from '../util/appError'
import { formatForUrl } from '../util/formatForUrl'

interface CodexDocument extends Document {
  createdBy: Types.ObjectId
  codexName: string
  codexUrl: string
  recent: DocType[]
  isCurrent: Boolean
  categories: Types.ObjectId[]
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
    recent: [docSchema],
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
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
  this.codexUrl = formatForUrl(this.codexName)

  next()
})

codexSchema.pre(
  /^find/,
  function (this: Query<CodexDocument[], CodexDocument>, next) {
    this.populate({
      path: 'categories',
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
  } catch (error) {
    console.error(error)
    new AppError('Could add codex to user', 404)
  }
})

export const Codex = model<CodexDocument>('Codex', codexSchema)
