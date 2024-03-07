import { Router } from 'express'

import { protect } from '../controllers/authController'
import {
  createCharacter,
  getCharacters,
  deleteCharacter,
  getCharacter,
} from '../controllers/characterController'

const router = Router()

router.use(protect)

router.get('/', getCharacters)
router.get('/get/:id', getCharacter)
router.post('/create', createCharacter)
router.delete('/delete/:id', deleteCharacter)

export default router
