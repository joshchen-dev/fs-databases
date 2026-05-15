const { Blog } = require("../models")

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if (!req.blog) {
    return res.status(404).end()
  }
  next()
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(err.message)
  console.error(err.name)
  
  return res.status(400).send(err.message)
}

module.exports = {
  blogFinder,
  errorHandler
}