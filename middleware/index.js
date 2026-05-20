const jwt = require("jsonwebtoken")
const { SECRET } = require('../util/config')
const { Blog } = require("../models")

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if (!req.blog) {
    return res.status(404).send({ error: 'blog not found' })
  }
  next()
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const error = []

  err.errors.forEach(e => {
    switch (e.validatorKey) {
      case "isEmail":
        error.push({ error: 'username must be a valid email address' })
        break
      case "min":
      case "max":
        error.push({ error: `year must be in range [1991, ${new Date().getFullYear()}]`})
        break
      default:
        error.push(e)
    }
  })
  
  res.send(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (!(authorization && authorization.toLowerCase().startsWith('bearer '))) {
    return res.status(401).json({ error: 'token missing' })
  }

  try {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
  } catch (err) {
    next(err)
  }

  next()
}

module.exports = {
  blogFinder,
  errorHandler,
  tokenExtractor
}