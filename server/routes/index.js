const express = require('express')
const router = express.Router()
const todo = require('../routes/todo')
const login = require('../routes/login')
const register = require('../routes/register')
const authentication = require('../middleware/authentication')

router.use('/register', register)
router.use('/login', login)

router.use(authentication)

router.use('/todos',todo)

module.exports = router