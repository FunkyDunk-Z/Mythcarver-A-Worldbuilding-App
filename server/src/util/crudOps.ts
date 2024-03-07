import { Model, Document, Types } from 'mongoose'
import { Request, Response, NextFunction } from 'express'

//----------Create One----------

export const createOne =
  <T extends Document>(Model: Model<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Model.create(req.body)

      res.status(201).json({
        status: 'success',
        data,
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

type DataType = Doc[]

export const getAll =
  <T extends Document>(Model: Model<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user
      const docs: DataType = await Model.find()

      let data: DataType = []

      for (let i = 0; i < docs.length; i++) {
        if (docs[i].createdBy.toString() === userId.toString()) {
          data.push(docs[i])
        }
      }

      if (!data) {
        return next()
      }

      res.status(201).json({
        status: 'success',
        results: data.length,
        data,
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
      const data: Doc | null = await Model.findById(req.params.id)

      if (!data) {
        return next()
      }

      res.status(200).json({
        status: 'success',
        data,
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
      const data = await Model.findByIdAndDelete(req.params.id)

      if (!data) {
        return next()
      }

      res.status(204).json({
        status: 'success',
        data: null,
      })
    } catch (error) {
      console.error(error)
      return next()
    }
  }
