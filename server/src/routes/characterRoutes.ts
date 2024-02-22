import { Router } from 'express'

import { protect } from '../controllers/authController'
import {
  createCharacter,
  getCharacters,
} from '../controllers/characterController'

const router = Router()

router.use('/', protect)

router.get('/', getCharacters)
router.post('/create-character', createCharacter)

export default router
