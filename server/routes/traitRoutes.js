const express = require('express')
const traitController = require('../controllers/traitController')
const authController = require('../controllers/authController')

const router = express.Router()

router.use(authController.protect)

router
  .route('/')
  .get(traitController.getAllTraits)
  .post(traitController.createTrait)

router
  .route('/:id')
  .get(traitController.getTrait)
  .patch(traitController.updateTrait)
  .delete(traitController.deleteTrait)

module.exports = router
