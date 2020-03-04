'use strict'

const Controller=require('../controllers/todoController')
const express = require('express')
const router = express.Router()

router.get('/', Controller.findAll)
router.post('/', Controller.create)
router.get('/:id', Controller.findOne)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.destroy)

module.exports = router