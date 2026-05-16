const router = require('express').Router()
const { blogFinder, tokenExtractor } = require('../middleware')
const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({
      ...req.body,
      date: new Date(),
      userId: user.id
    })
    res.json(blog)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', blogFinder, async (req, res) => {
  const blog = req.blog
  if (blog) {
    blog.destroy()
    res.status(204).send('Blog deleted.')
  } else {
    res.status(404).end()
  }
})

router.put('/:id', blogFinder, async (req, res, next) => {
  try {
    const blog = req.blog
    blog.likes = req.body.likes
    await blog.save()
    res.send('Success.')
  } catch (err) {
    next(err)
  }
})

module.exports = router