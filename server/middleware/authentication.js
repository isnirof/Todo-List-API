const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token=req.headers.token
        req.user=jwt.verify(token,"token")
        next()
    } catch (err) {
        res.status(404).json({message:'Invalid token!!'})
    }
}