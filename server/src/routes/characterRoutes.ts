import { Router } from 'express'

import { protect } from '../controllers/authController'
import {
  createCharacter,
  getAllCharacters,
  getCharacter,
  updateCharacter,
  deleteCharacter,
} from '../controllers/characterController'

const router = Router()

router.use(protect)

router.route('/').get(getAllCharacters).post(createCharacter)

router
  .route('/:id')
  .get(getCharacter)
  .patch(updateCharacter)
  .delete(deleteCharacter)

export default router
