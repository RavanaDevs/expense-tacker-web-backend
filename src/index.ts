import { app } from './app'
import dotenv from 'dotenv'

import connectDB from './config/database'

dotenv.config()
const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  await connectDB()
  console.log(`Server is running on port ${PORT}`)
})
