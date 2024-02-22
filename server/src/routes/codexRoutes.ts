import { Router } from 'express'

import { protect } from '../controllers/authController'
import { createCodex, getAllCodex } from '../controllers/codexController'

const router = Router()

router.use('/', protect)

router.get('/', getAllCodex)
router.post('/create-codex', createCodex)

export default router
