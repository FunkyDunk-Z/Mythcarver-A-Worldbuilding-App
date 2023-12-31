const express = require('express')
const characterController = require('../controllers/characterController')
const authController = require('../controllers/authController')

const router = express.Router()

router.use(authController.protect)

router
  .route('/')
  .get(characterController.getAllCharacters)
  .post(characterController.createCharacter)

router
  .route('/:id')
  .get(characterController.getCharacter)
  .patch(characterController.updateCharacter)
  .delete(characterController.deleteCharacter)

module.exports = router
