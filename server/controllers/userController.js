const { User } = require('../models/index')
const bcrypt = require('bcryptjs')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')

class Controller {
    static findAll(req, res, next) {
        User.findAll()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                next(err)
            })
    }
    static register(req, res, next) {
        let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User
            .create(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                next(err)
            })
    }
    static login(req, res, next) {
        let userLogin = {
            email: req.body.email,
            password: req.body.password
        }
        User
            .findOne({
                where: {
                    email: userLogin.email
                }
            })
            .catch(user => {
                if (!user) {
                    throw createError(400, 'Error 400: User not Found')
                }
                let compare = bcrypt.compareSync(userLogin.password, user.password)
                if (!compare) {
                    throw createError(400, 'Error 400: User not Found')
                }
                let token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY)
                res.status(200).json(token)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller