import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/',(req:Request, res:Response, next:NextFunction)=>{
    res.send("Hello World")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
