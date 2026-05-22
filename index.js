const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')
const readingListRouter = require('./controllers/readingLists')
const logoutRouter = require('./controllers/logout')
const { errorHandler } = require('./middleware')
const { Blog, User, Session, ReadingList } = require('./models')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglists', readingListRouter)
app.use('/api/logout', logoutRouter)

app.post('/api/reset', async (req, res) => {
  await Blog.truncate({ cascade: true })
  await User.truncate({ cascade: true })
  await Session.truncate({ cascade: true })
  await ReadingList.truncate({ cascade: true })
  res.end()
})

app.get('/', async (req, res) => {
  res.end()
})

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()