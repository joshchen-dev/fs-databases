const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const { Session } = require('../models')

router.post('/', async (req, res) => {
  try {
    const body = req.body

    const user = await User.findOne({
      where: {
        username: body.username
      }
    })

    const passwordCorrect = body.password === user.password

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user.id
    }

    const token = jwt.sign(userForToken, SECRET)

    const session = Session.build({
      session: token,
      user_id: user.id
    })
    
    await session.save()

    res.status(200).send({
      token,
      username: user.username,
      name: user.name
    })
  } catch (err) {
    console.error(err)
    return res.status(400).send(err)
  }
})

module.exports = router