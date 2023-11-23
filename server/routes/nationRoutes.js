const express = require('express')
const modelController = require('../controllers/modelController')
const authController = require('../controllers/authController')

const router = express.Router()

router.use(authController.protect)

router
  .route('/')
  .get(modelController.getAllNations)
  .post(modelController.createNation)

router
  .route('/:id')
  .get(modelController.getNation)
  .patch(modelController.updateNation)
  .delete(modelController.deleteNation)

module.exports = router
