import { Schema, Types } from 'mongoose'

export interface DocType {
  docId: Types.ObjectId
  modelRef: string
}

export const docSchema = new Schema<DocType>(
  {
    docId: {
      type: Schema.Types.ObjectId,
      ref: 'modelRef',
    },
    modelRef: {
      type: String,
    },
  },
  {
    _id: false,
  }
)
