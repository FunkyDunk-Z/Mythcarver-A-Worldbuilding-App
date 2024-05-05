import { Schema, Types, Document } from 'mongoose'

export interface DocType {
  docId: Types.ObjectId
  refModel: string
  docName: string
  docType: string
  docSubType?: string
  docImage: string | null
}

export interface CommonSchemaType extends Document {
  createdBy: Types.ObjectId
  codexId: Types.ObjectId
  isPublic: boolean
  docName: string
  docType: string
  docSubType?: string
  categoryIndex: number
  modelRef: string
  connections: DocType[]
}

export const docSchema = new Schema<DocType>(
  {
    docId: {
      type: Schema.ObjectId,
      ref: 'refModel',
    },
    docImage: {
      type: String,
    },
    docName: {
      type: String,
    },
    docType: {
      type: String,
    },
    refModel: {
      type: String,
      //   required: true,
    },
  },
  {
    _id: false,
  }
)

export const commonSchema = new Schema<CommonSchemaType>(
  {
    createdBy: {
      type: Schema.ObjectId,
      ref: 'User',
      //   required: true,
    },
    codexId: {
      type: Schema.ObjectId,
      ref: 'Codex',
      //   required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    docName: {
      type: String,
      //   required: true,
    },
    docType: {
      type: String,
      //   required: true,
    },
    docSubType: {
      type: String,
    },
    categoryIndex: {
      type: Number,
      //   required: true,
    },
    modelRef: {
      type: String,
    },
    connections: [docSchema],
  },
  {
    _id: false,
  }
)
