const router = require('express').Router()
const { Op } = require('sequelize')
const { blogFinder, tokenExtractor } = require('../middleware')
const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`
        }
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%`
        }
      }
    ]
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    order: [['likes', 'DESC']],
    where
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

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  console.log(req.decodedToken.id)
  console.log(req.blog.dataValues.userId)
  if (req.blog && req.decodedToken.id === req.blog.dataValues.userId) {
    req.blog.destroy()
    res.status(204).send('Blog deleted.')
  } else {
    res.status(404).end({ error: 'user doesn\'t own this blog' })
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