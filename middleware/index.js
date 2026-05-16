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
  console.error(err.errors[0].validatorKey)

  switch (err.errors[0].validatorKey) {
    case "isEmail":
      return res.status(400).send({ error: 'username must be a valid email address' })
    default:
      return res.status(400).send(err)

  }

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