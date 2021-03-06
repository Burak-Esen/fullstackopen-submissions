const logger = require('./logger')
const util = require('util')

const requestLogger = (request, response, next) => {
  logger.info(
    `Method: ${request.method}`,
    `Path: ${request.path}`,
    `Body: ${util.inspect(request.body, false, null)}`,
    '-----'
  )
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error : 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }
  next(error)
}

const setRequestToken = (request, response, next) => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
    request.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  setRequestToken
}
