module.exports = (req, res, next) => {
    try {
        let error = new Error
        switch (err.name) {
            case 'SequelizeValidationError':
                error.statusCode = 400
                error.message = {}
                err.errors.forEach(element => {
                    error.message[element.path] = element.message
                });
                throw error
            default:
                throw error
        }
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message || err)
    }
}