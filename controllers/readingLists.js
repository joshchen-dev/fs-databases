const { tokenExtractor } = require('../middleware')
const { Blog, User, ReadingList } = require('../models')

const router = require('express').Router()

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body

  if (isNaN(Number(blogId)) || isNaN(Number(userId))) {
    return res.status(400).send({ error: 'blogId and userId must be integer.' })
  }

  const blog = await Blog.findByPk(blogId)
  const user = await User.findByPk(userId)

  if (!blog) {
    return res.status(404).send({ error: 'blog doesn\'t exist.' })
  }

  if (!user) {
    return res.status(404).send({ error: 'user doesn\'t exist.' })
  }

  const exist = await ReadingList.findOne({
    where: {
      blogId, userId
    }
  })

  if (exist) {
    return res.status(400).send({ error: 'blog already exist in user\'s reading list. ' })
  }

  const list = await ReadingList.create({
    userId: user.id,
    blogId: blog.id,
    read: false
  })

  return res.send({
    id: list.id,
    user_id: list.userId,
    blog_id: list.blogId,
    read: false
  })
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const id = req.params.id
  const read = req.body.read

  if (isNaN(Number(id))) {
    return res.status(400).send({ error: 'wrong id.' })
  }

  if (typeof read !== 'boolean') {
    return res.status(400).send({ error: 'read should be boolean.' })
  }

  const list = await ReadingList.findOne({
    where: { id: id }
  })

  if (!list) {
    return res.status(404).send({ error: 'blog not found in reading list.' })
  }

  if (list.userId !== req.decodedToken.id) {
    return res.status(401).send({ error: 'operation not permitted.' })
  }

  list.read = read
  await list.save()

  res.send(list)
})

module.exports = router