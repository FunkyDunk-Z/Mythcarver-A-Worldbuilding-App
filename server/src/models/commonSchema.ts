import { Schema, Types, Document } from 'mongoose'

export interface CommonSchemaType extends Document {
  createdBy: Types.ObjectId
  codexId: Types.ObjectId
  isPublic: boolean
  docName: string
  docType: string
  docSubType?: string
  categoryId: Types.ObjectId
  modelRef: string
  connections: Types.ObjectId[]
  thumbnail: string
}

export const commonSchema = new Schema<CommonSchemaType>(
  {
    createdBy: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    codexId: {
      type: Schema.Types.ObjectId,
      ref: 'Codex',
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    docName: {
      type: String,
      required: true,
    },
    docType: {
      type: String,
      required: true,
    },
    docSubType: {
      type: String,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    modelRef: {
      type: String,
    },
    connections: [
      {
        connectionId: {
          type: Schema.Types.ObjectId,
          ref: 'connectionRef',
        },
        connectionRef: {
          type: String,
          required: true,
        },
      },
    ],
    thumbnail: {
      type: String,
    },
  },
  {
    _id: false,
  }
)
