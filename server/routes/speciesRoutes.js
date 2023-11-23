const express = require('express')
const speciesController = require('../controllers/speciesController')
const authController = require('../controllers/authController')

const router = express.Router()

router.use(authController.protect)

router
  .route('/')
  .get(speciesController.getAllSpecies)
  .post(speciesController.createSpecies)

router
  .route('/:id')
  .get(speciesController.getSpecies)
  .patch(speciesController.updateSpecies)
  .delete(speciesController.deleteSpecies)

module.exports = router
