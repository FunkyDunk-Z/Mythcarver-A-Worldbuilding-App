import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import env from './util/validateEnv'

import userRouter from './routes/userRoutes'
import codexRouter from './routes/codexRoutes'

const app = express()

if (env.isDevelopment) {
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

app.use(express.json({ limit: '100mb' }))
app.use(cookieParser())

app.use('/api/v2/users', userRouter)
app.use('/api/v2/codex', codexRouter)

export default app
