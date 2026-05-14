const router = require('express').Router()
const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if (!req.blog) {
    return res.status(404).end()
  }
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    date: new Date()
  })
  res.json(blog)
})

router.delete(blogFinder, '/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    blog.destroy()
    res.status(204).send('Blog deleted.')
  } else {
    res.status(404).end()
  }
})

module.exports = router