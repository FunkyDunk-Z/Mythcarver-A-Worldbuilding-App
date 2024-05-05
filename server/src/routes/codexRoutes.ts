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

router.use('/', protect)

router.get('/', getAllCodex)
router.post('/create', createCodex)

router.route('/:id').get(getCodex).patch(updateCodex).delete(deleteCodex)

export default router
