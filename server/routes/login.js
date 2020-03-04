const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/', userController.login)
// router.get('/',userController.findAll)
// router.post('/google', userController.googleSignIn)

module.exports = router