import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
  updateMany,
} from '../util/crudOps'
import { Category } from '../models/categoryModel'

export const getAllCategories = getAll(Category)
export const getCategory = getOne(Category)
export const createCategory = createOne(Category)
export const updateCategory = updateOne(Category)
export const updateCategories = updateMany(Category)
export const deleteCategory = deleteOne(Category)