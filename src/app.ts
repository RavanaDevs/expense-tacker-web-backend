import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routes/userRouter'
import authRouter from './routes/authRouter'
import expenseRouter from './routes/expenseRouter'
import settingsRouter from './routes/settingsRouter'
import homeRouter from './routes/homeRouter'

const app = express()

// CORS configuration
// const corsOptions = {
//   origin: process.env.NODE_ENV === 'production'
//     ? process.env.CORS_ORIGIN
//     : ['http://localhost:3000', 'http://localhost:5173'], // Common frontend dev ports
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   maxAge: 86400 // 24 hours
// }

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/', homeRouter)
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/expenses', expenseRouter)
app.use('/settings', settingsRouter)

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err.stack)
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
    })
  },
)

export { app }
