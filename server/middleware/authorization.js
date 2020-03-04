import { Todo } from '../models/index';
const createError = require('http-errors')

module.exports = (req, res, next) => {
    try {
        Todo
        .findOne({
            where:{
                id:req.params.id
            }
        })
        .then(result=>{
            if(!result) {
                throw createError(404,'Error 404:Task not found!')
            }
            if(result.UserId!==req.user.id) {
                throw createError(401,'Error 401: FOrbidden access!')
            }
            next()
        })
    } catch (err) {
        next(err)
    }
}