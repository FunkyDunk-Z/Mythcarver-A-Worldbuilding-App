import { Router } from 'express'

import { protect } from '../controllers/authController'
import {
  createCodex,
  getAllCodex,
  updateCodex,
} from '../controllers/codexController'

const router = Router()

router.use('/', protect)

router.get('/', getAllCodex)
router.post('/create', createCodex)

router.route('/:id').patch(updateCodex)

export default router
