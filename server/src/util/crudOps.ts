import { Model, Document, Types, IfAny, Require_id } from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import env from '../util/validateEnv'
import { v2 } from 'cloudinary'

import AppError from './appError'
import { CategoryType } from '../models/categoryModel'

v2.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_SECRET,
})

//----------Create One----------

export const createOne =
  <T extends Document>(Model: Model<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doc = await Model.create(req.body)

      // Upload image to Cloudinary
      const imageUploader = async (
        doc: Document,
        thumbnail: string,
        reqBody: Request,
        isCommonProp: boolean
      ) => {
        try {
          const result = await v2.uploader.upload(thumbnail, {
            public_id: doc._id,
            folder: `mythcarver/user-images`,
          })

          console.log(result) // Log the result for debugging

          if (isCommonProp === true) {
            reqBody.body.commonProps.thumbnail = result.secure_url
          } else {
            reqBody.body.thumbnail = result.secure_url
          }

          if (req.body.thumbnail) {
            imageUploader(doc, req.body.thumbnail, req.body, false)
          }
          if (req.body.commonProps) {
            imageUploader(doc, req.body.commonProps.thumbnail, req.body, true)
          }
        } catch (error) {
          console.error(error)
          return next(new AppError('Could not upload image', 404))
        }
      }

      res.status(201).json({
        status: 'success',
        doc,
      })
    } catch (error) {
      console.error(error)
      return next(new AppError('Could Not create document', 404))
    }
  }

// ----------Get All----------

interface Doc extends Document {
  createdBy: Types.ObjectId
}

type DocArrayType = Doc[]

export const getAll =
  <T extends Document>(Model: Model<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user
      const model: DocArrayType = await Model.find()

      let docs: DocArrayType = []

      for (let i = 0; i < model.length; i++) {
        if (model[i].createdBy.toString() === userId.toString()) {
          docs.push(model[i])
        }
      }

      if (!docs) {
        return next()
      }

      res.status(201).json({
        status: 'success',
        results: docs.length,
        docs,
      })
    } catch (error) {
      console.error(error)
      return next()
    }
  }

//----------Get One------------

export const getOne =
  <T extends Document>(Model: Model<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doc: Doc | null = await Model.findById(req.params.id)

      if (!doc) {
        return next()
      }

      res.status(200).json({
        status: 'success',
        doc,
      })
    } catch (error) {
      console.error(error)
      return next()
    }
  }

//----------Update One----------

export const updateOne =
  <T extends Document>(Model: Model<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Format codex name
      if (req.body.codexName) {
        req.body.codexUrl = req.body.codexName.replace(/ /g, '-').toLowerCase()
      }

      // Format Category name
      if (req.body.categories) {
        req.body.categories.map((el: CategoryType) => {
          el.categoryUrl = el.categoryName.replace(/ /g, '-').toLowerCase()
        })
      }

      // Get document
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: false,
      })

      if (!doc) {
        return next(new AppError('No Document found with that ID', 404))
      }

      // await doc.save()

      res.status(200).json({
        status: 'success',
        doc,
      })
    } catch (error) {
      console.error(error)
      return next()
    }
  }

//----------Update Many---------

export const updateMany =
  <T extends Document>(Model: Model<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updates = req.body.updates // Assuming updates are sent as an array of objects

      if (!Array.isArray(updates) || updates.length === 0) {
        return next(new AppError('No updates provided', 400))
      }

      const bulkOps = updates.map((update) => ({
        updateOne: {
          filter: { _id: update.id }, // The ID of the document to update
          update: { $set: update.fields }, // The fields to update
        },
      }))

      const bulkWriteResult = await Model.bulkWrite(bulkOps)

      // Check if any documents were actually updated
      if (bulkWriteResult.modifiedCount === 0) {
        return next(new AppError('No documents were updated', 400))
      }

      // Collect the IDs of the updated documents
      const updatedIds = updates.map((update) => update.id)

      // Retrieve the updated documents
      const docs = await Model.find({ _id: { $in: updatedIds } })

      res.status(200).json({
        status: 'success',
        results: docs.length,
        docs,
      })
    } catch (error) {
      console.error(error)
      return next(new AppError('Could not update documents', 500))
    }
  }

//----------Delete One----------

export const deleteOne =
  <T extends Document>(Model: Model<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const docToDelete = await Model.findById(req.params.id)

      if (!docToDelete) {
        return next()
      }

      if ('avatarURL' in docToDelete) {
        v2.uploader.destroy(`mythcarver/user-images/${docToDelete?._id}`)
        docToDelete.avatarURL = null
        console.log(docToDelete.avatarURL)
      }

      const doc = await Model.findByIdAndDelete(docToDelete._id)

      if (!doc) {
        return next()
      }

      res.status(204).json({
        status: 'success',
        doc: null,
      })
    } catch (error) {
      console.error(error)
      return next()
    }
  }
