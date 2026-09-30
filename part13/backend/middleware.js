const jwt = require('jsonwebtoken')
const { SECRET } = require('./util/config')
const User = require('./models/user')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  } else {
    req.token = null
  }
  next()
}

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: 'token missing' })
  }

  const decodedToken = jwt.verify(req.token, SECRET)
  const user = await User.findByPk(decodedToken.id)

  if (!user) {
    return res.status(401).json({ error: 'invalid token' })
  }

  req.user = user
  next()
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message })
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  }

  next(error)
}

module.exports = { tokenExtractor, userExtractor, errorHandler }
