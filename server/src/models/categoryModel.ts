import { Schema, model, Types, Document, Query } from 'mongoose'

export interface DocType {
  doc: Types.ObjectId
  refModel: string
}

export interface CategoryType {
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
  }
  // {
  //   _id: false,
  // }
)

const Category = model<CategoryType>('Category', categorySchema)

export { Category }
