const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {
        exclude: ['userId']
      }
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const throughFilter = {}

  if (req.query.read) {
    throughFilter.read = req.query.read
  }

  const user = await User.findOne({
    where: { id: req.params.id },
    include: [{
      model: Blog,
      attributes: {
        exclude: ['userId']
      }
    },
    {
      model: Blog,
      as: 'readings',
      through: {
        attributes: ['read', 'id'],
        where: throughFilter
      }
    }
    ]
  })
  res.json(user)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:username', async (req, res) => {
  try {
    const a = req.params.username
    const user = await User.findOne({
      where: {
        username: a
      }
    })
    user.username = req.body.username
    await user.save()
    return res.send(user)
  } catch (err) {
    return res.status(400).json({ err })
  }
})

module.exports = router