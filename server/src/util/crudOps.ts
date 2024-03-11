import { Model, Document, Types } from 'mongoose'
import { Request, Response, NextFunction } from 'express'

//----------Create One----------

export const createOne =
  <T extends Document>(Model: Model<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
