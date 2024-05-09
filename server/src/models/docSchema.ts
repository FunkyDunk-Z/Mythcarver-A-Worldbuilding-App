import { Schema, Types } from 'mongoose'

export interface DocType {
  docId: Types.ObjectId
  // modelRef: string
  thumbnail?: string
  docName?: string
  docType?: string
  docSubType?: string
  categoryUrl: string
}

export const docSchema = new Schema<DocType>(
  {
    docId: {
      type: Schema.Types.ObjectId,
      // ref: 'modelRef',
    },
    // modelRef: {
    //   type: String,
    // },
    thumbnail: {
      type: String,
    },
    docName: {
      type: String,
    },
    docType: {
      type: String,
    },
    docSubType: {
      type: String,
    },
    categoryUrl: {
      type: String,
    },
  },
  {
    _id: false,
  }
)
