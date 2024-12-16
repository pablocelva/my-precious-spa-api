const errors = require('../helpers/errorsMessages')

const errorMiddleware = (err, req, res, next) => {
    console.error(err, 'Error desde el middleware')
    /*res.status(500).json({
        msg: "Error interno del servidor",
        data: err
    })*/
    const errorDetails = errors[err.message] || errors['SERVER_ERROR']

    const response = {
        id: errorDetails.id,
        message: errorDetails.message,
        description: errorDetails.description
    }
    res.status(errorDetails.statusCode).json(response)
}

module.exports = errorMiddleware