import { Router } from 'express'

import { protect } from '../controllers/authController'
import {
  createCharacter,
  getCharacters,
  deleteCharacter,
} from '../controllers/characterController'

const router = Router()

router.use('/', protect)

router.get('/', getCharacters)
router.post('/create', createCharacter)
router.delete('/delete/:id', deleteCharacter)

export default router
