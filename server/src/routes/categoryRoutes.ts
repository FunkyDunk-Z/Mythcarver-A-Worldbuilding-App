import { Router } from 'express'

import { protect } from '../controllers/authController'
import {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  updateCategories,
  deleteCategory,
} from '../controllers/categoryController'

const router = Router()

router.use(protect)

router
  .route('/')
  .get(getAllCategories)
  .post(createCategory)
  .patch(updateCategories)

router
  .route('/:id')
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory)

export default router
