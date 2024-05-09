import { Router } from 'express'

import { protect } from '../controllers/authController'
import {
  createCodex,
  getAllCodex,
  getCodex,
  updateCodex,
  deleteCodex,
} from '../controllers/codexController'

const router = Router()

router.use(protect)

router.route('/').get(getAllCodex).post(createCodex)

router.route('/:id').get(getCodex).patch(updateCodex).delete(deleteCodex)

export default router
