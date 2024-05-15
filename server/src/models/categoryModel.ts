import { Schema, model, Types, Query, Document } from 'mongoose'

// Models
import User from './userModel'
import { Codex } from './codexModel'

// Utils
import { formatForUrl } from '../util/formatForUrl'
import AppError from '../util/appError'
import { docSchema, DocType } from './docSchema'

export interface CategoryType extends Document {
  createdBy: Types.ObjectId
  codexId: Types.ObjectId
  categoryName: string
  categoryUrl: string
  docs: DocType[]
  docType: string
  thumbnail?: string
  isCurrent: boolean
}

const categorySchema = new Schema<CategoryType>({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  codexId: {
    type: Schema.Types.ObjectId,
    ref: 'Codex',
  },
  categoryName: {
    type: String,
    required: true,
  },
  categoryUrl: {
    type: String,
  },
  docs: [docSchema],
  docType: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  isCurrent: {
    type: Boolean,
    default: false,
  },
})

categorySchema.pre('save', async function (next) {
  try {
    this.categoryUrl = formatForUrl(this.categoryName)
    this.docType = this.categoryName

    if (this.isNew) {
      const codex = await Codex.findById(this.codexId)

      if (!codex) {
        return next(new AppError('No codex with that ID', 404))
      }

      codex.categories.push(this._id)
      codex.save()
    }

    next()
  } catch (error) {
    console.error(error)
    next(new AppError('Could not create Category', 404))
  }
})

categorySchema.pre(
  /^find/,
  function (this: Query<CategoryType[], CategoryType>, next) {
    this.populate({
      path: 'docs',
      select: '-__v',
    })
    next()
  }
)

categorySchema.post('findOneAndDelete', function (doc) {
  if (doc && doc.docs && doc.docs.length > 0) {
    doc.docs.map(async (el: DocType) => {
      try {
        const modelName = el.modelRef

        const modelToDelete = model(modelName)

        if (modelToDelete) {
          await modelToDelete.findByIdAndDelete(el.docId)
        } else {
          console.error(`Model "${modelName}" not found.`)
        }
      } catch (error) {
        console.error(error)
        new AppError('could not do post delete action', 404)
      }
    })
  }
})

export const Category = model<CategoryType>('Category', categorySchema)
