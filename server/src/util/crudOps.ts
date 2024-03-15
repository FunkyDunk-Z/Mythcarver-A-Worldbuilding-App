import { Model, Document, Types } from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import env from '../util/validateEnv'
import { v2 } from 'cloudinary'
import User from '../models/userModel'

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
      const user = await User.findById(req.user)

      const result = await v2.uploader.upload(req.body.avatarURL, {
        public_id: user?.email.split('@')[0],
      })
      // console.log(result) // Log the result for debugging

      req.body.avatarURL = result.secure_url

      const doc = await Model.create(req.body)

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

//----------Delete One----------

export const deleteOne =
  <T extends Document>(Model: Model<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id)

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
