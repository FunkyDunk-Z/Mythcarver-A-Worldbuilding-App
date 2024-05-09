import { Schema, model, Types, Query } from 'mongoose'

// Utils
import { formatForUrl } from '../util/formatForUrl'
import { docSchema, DocType } from './docSchema'

export interface CategoryType {
  categoryName: string
  categoryUrl: string
  docs: DocType[]
}

const categorySchema = new Schema<CategoryType>({
  categoryName: {
    type: String,
    required: true,
  },
  categoryUrl: {
    type: String,
  },
  docs: [docSchema],
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
      select: '-__v',
    })
    next()
  }
)

export const Category = model<CategoryType>('Category', categorySchema)
