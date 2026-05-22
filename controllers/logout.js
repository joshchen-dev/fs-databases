const { tokenExtractor } = require('../middleware')
const { Session } = require('../models')

const router = require('express').Router()

router.delete('/', tokenExtractor, async (req, res, next) => {
  try {
    const userId = req.decodedToken.id
    await Session.destroy({
      where: {
        userId
      }
    })
    
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
