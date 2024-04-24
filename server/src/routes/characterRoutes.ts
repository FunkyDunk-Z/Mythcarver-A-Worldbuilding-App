import { Router } from 'express'

import { protect } from '../controllers/authController'
import {
  createCharacter,
  getAllCharacters,
  deleteCharacter,
  getCharacter,
  updateCharacter,
} from '../controllers/characterController'

const router = Router()

router.use(protect)

router.route('/').get(getAllCharacters).post(createCharacter)

router
  .route('/:id')
  .get(getCharacter)
  .delete(deleteCharacter)
  .patch(updateCharacter)

export default router
