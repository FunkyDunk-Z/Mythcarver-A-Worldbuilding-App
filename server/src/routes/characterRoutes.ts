import { Router } from 'express'

import { protect } from '../controllers/authController'
import { createCharacter } from '../controllers/characterController'

const router = Router()

router.use('/', protect)

router.post('/create-character', createCharacter)

export default router
