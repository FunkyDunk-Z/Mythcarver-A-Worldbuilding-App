const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const userRouter = require('./routes/userRoutes')
const codexRouter = require('./routes/codexRoutes')
const speciesRouter = require('./routes/speciesRoutes')
const characterRouter = require('./routes/characterRoutes')
const traitRouter = require('./routes/traitRoutes')

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/codex', codexRouter)
app.use('/api/v1/species', speciesRouter)
app.use('/api/v1/characters', characterRouter)
app.use('/api/v1/traits', traitRouter)

module.exports = app
