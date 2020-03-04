'use strict'

const { Todo } = require('../models/index')
const createError = require('http-errors')
// console.log(Todo)

class Controller {
    static findAll(req, res, next) {
        Todo
            .findAll({
                where: {
                    UserId: req.user.id
                }
            })
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(err => {
                next(err)
            })

    }
    static create(req, res, next) {
        let newTodo = {
            task: req.body.task,
            description: req.body.description,
            dueDate: req.body.dueDate,
            UserId: req.user.id
        }
        Todo
            .create(newTodo)
            .then(todo => {
                // res.redirect('/')
                res.status(201).json(todo)
            })
            .catch(err => {
                if (err.message) {
                    res.status = 400
                }
                next(err)
            })
    }
    static findOne(req, res, next) {
        let todo = {
            id: req.params.id
        }
        Todo
            .findOne({
                where: {
                    id: todo.id,
                    UserId: req.user.id
                }
            })
            .then(todo => {
                // res.send(todo)
                if (todo) {
                    res.status(200).json(todo)
                } else {
                    throw createError(404, "Error 404: Command Not Found!")
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static update(req, res, next) {
        let update = {
            task: req.body.task,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate
        }
        // let id = req.params.id
        Todo
            .update(update, {
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                },
                returning: true
            })
            .then(todo => {
                if (todo[0] !== 0) {
                    res.status(200).json(todo)
                } else {
                    throw createError(404, "Error 404: Command Not Found!")
                }
            })
            .catch(err => {
                if (err.name == "SequelizeValidationError") {
                    next(createError(400, 'Error 400: Bad Requests'))
                }
                next(err)
            })
    }
    static destroy(req, res, next) {
        // let id = req.params.id
        let deleted
        Todo
            .findOne({
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                }
            })
            .then(todo => {
                deleted = todo
                return Todo
                    .destroy({
                        where: {
                            id: id
                        }
                    })
            })
            .then(todo => {
                if (todo) {
                    res.status(200).json(deleted)
                } else {
                    throw createError(404, "Error 404: Command Not Found!")
                }
                // res.status(200).json(todo)
            })
            .catch(err => {
                next(err)
            })
    }
}
module.exports = Controller