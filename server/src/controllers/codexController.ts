import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'
import { getAll, getOne, updateOne } from '../util/crudOps'

// Models
import User from '../models/userModel'
import { Codex } from '../models/codexModel'
import { Category, CategoryType } from '../models/categoryModel'

// Utils
import AppError from '../util/appError'

// export const createCodex = createOne(Codex)

export const createCodex = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { createdBy, codexName, categories } = req.body
    const user = await User.findById(createdBy)

    if (!user) {
      return next(new AppError('Could not find user', 404))
    }

    const codexBody = {
      createdBy,
      codexName,
    }
    const doc = await Codex.create(codexBody)

    if (!doc) {
      return next(new AppError('Could not create Codex', 404))
    }

    categories.map(async (el: CategoryType) => {
      el.codexId = doc._id
      console.log(el)

      return await Category.create(el)
    })

    // await Promise.all(categoryPromises)

    // if (!categories || categories.length === 0) {
    //   return next(new AppError('Could not create categories', 404))
    // }

    // createdCategories.map((el) => doc.categories.push(el))

    // doc.save()

    user.codex.map(async (el) => {
      try {
        if (el._id.toHexString() !== doc._id.toHexString()) {
          const codex = await Codex.findById(el._id)

          if (!codex) {
            return new AppError('Could not find Codex with that ID', 404)
          }
          codex.isCurrent = false
          codex.save()
        }
      } catch (error) {
        console.error(error)
      }
    })

    res.status(201).json({
      status: 'success',
      doc,
    })
  } catch (error) {
    console.error(error)
    return next()
  }
}

export const deleteCodex = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const docToDelete = await Codex.findById(req.params.id)

    if (!docToDelete) {
      return next()
    }

    docToDelete.categories.map(async (el) => {
      return await Category.findByIdAndDelete(el)
    })

    const user = await User.findById(docToDelete.createdBy)

    if (!user) {
      return next()
    }

    const spliceArray = (array: Types.ObjectId[]) => {
      const index = array.findIndex(
        (obj) => obj._id.toHexString() === docToDelete._id.toHexString()
      )

      if (index !== -1) {
        array.splice(index, 1)
      }
    }

    spliceArray(user.codex)

    const doc = await Codex.findByIdAndDelete(docToDelete._id)

    if (!doc) {
      return next()
    }

    user.save()

    res.status(204).json({
      status: 'success',
      doc: null,
    })
  } catch (error) {
    console.error(error)
    return next()
  }
}

export const getCodex = getOne(Codex)
export const getAllCodex = getAll(Codex)
export const updateCodex = updateOne(Codex)
// export const deleteCodex = deleteOne(Codex)
