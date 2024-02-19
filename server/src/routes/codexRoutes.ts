import { Router } from 'express'

import { protect } from '../controllers/authController'
import { createCodex } from '../controllers/codexController'

const router = Router()

router.use('/', protect)

router.post('/create-codex', createCodex)

export default router
