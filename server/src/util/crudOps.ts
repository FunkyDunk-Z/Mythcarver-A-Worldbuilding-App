import { Model, Document, Types } from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import env from '../util/validateEnv'
import { v2 } from 'cloudinary'

import AppError from './appError'

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

      if (req.body.avatarURL) {
        const result = await v2.uploader.upload(req.body.avatarURL, {
          public_id: doc._id,
          folder: `mythcarver/user-images`,
        })
        console.log(result) // Log the result for debugging

        req.body.avatarURL = result.secure_url
      }

      res.status(201).json({
        status: 'success',
        doc,
      })
    } catch (error) {
      console.error(error)
      return next()
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

      let doc: DocArrayType = []

      for (let i = 0; i < model.length; i++) {
        if (model[i].createdBy.toString() === userId.toString()) {
          doc.push(model[i])
        }
      }

      if (!doc) {
        return next()
      }

      res.status(201).json({
        status: 'success',
        results: doc.length,
        doc,
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
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })

      if (!doc) {
        return next(new AppError('No Document found with that ID', 404))
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
