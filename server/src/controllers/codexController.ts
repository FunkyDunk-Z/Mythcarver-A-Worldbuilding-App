import { Request, Response, NextFunction } from 'express'
import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from '../util/crudOps'
import { Codex } from '../models/codexModel'
import { Category, CategoryType } from '../models/categoryModel'
import AppError from '../util/appError'

// export const createCodex = createOne(Codex)

export const createCodex = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryPromises = req.body.categories.map(
      async (el: CategoryType) => {
        return await Category.create(el)
      }
    )

    const categories = await Promise.all(categoryPromises)

    if (!categories || categories.length === 0) {
      return next(new AppError('Could not create categories', 404))
    }

    const codexBody = {
      ...req.body,
      categories,
    }

    const doc = await Codex.create(codexBody)

    res.status(201).json({
      status: 'success',
      doc,
    })
  } catch (error) {
    console.error(error)
    return next()
  }
}

export const getCodex = getOne(Codex)
export const getAllCodex = getAll(Codex)
export const updateCodex = updateOne(Codex)
export const deleteCodex = deleteOne(Codex)
