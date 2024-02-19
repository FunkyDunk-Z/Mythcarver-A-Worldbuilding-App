import { Model, Document } from 'mongoose'
import { Request, Response, NextFunction } from 'express'

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
