import { Schema, model, Types, Query } from 'mongoose'

// Utils
import { formatForUrl } from '../util/formatForUrl'
import { docSchema, DocType } from './docSchema'

export interface CategoryType {
  createdBy: Types.ObjectId
  categoryName: string
  categoryUrl: string
  docs: DocType[]
  thumbnail: string
}

const categorySchema = new Schema<CategoryType>({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  categoryName: {
    type: String,
    required: true,
  },
  categoryUrl: {
    type: String,
  },
  docs: [docSchema],
  thumbnail: {
    type: String,
  },
})

categorySchema.pre('save', function (next) {
  this.categoryUrl = formatForUrl(this.categoryName)

  next()
})

categorySchema.pre(
  /^find/,
  function (this: Query<CategoryType[], CategoryType>, next) {
    this.populate({
      path: 'docs',
      select: '-__v -modelRef',
    })
    next()
  }
)

export const Category = model<CategoryType>('Category', categorySchema)
