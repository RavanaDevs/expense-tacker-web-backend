import express from 'express'
import userRouter from './routes/userRouter'
import authRouter from './routes/authRouter'
import errorHandler from './middlewares/errorHandler'
import expenseRouter from './routes/expenseRouter'

const app = express()

app.use(express.json())

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/expense', expenseRouter)

app.use(errorHandler)

export { app }
