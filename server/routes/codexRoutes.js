const express = require('express')
const codexController = require('../controllers/codexController')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const router = express.Router()

router.use(authController.protect)

router
  .route('/')
  .get(userController.getMyAccount, codexController.getAllCodexs)
  .post(codexController.createCodex)

router
  .route('/:id')
  .get(codexController.getCodex)
  .patch(codexController.updateCodex)
  .delete(codexController.deleteCodex)

module.exports = router
