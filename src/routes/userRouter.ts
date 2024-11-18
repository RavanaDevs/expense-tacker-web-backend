import express from 'express'
import { createUser, getUser } from '../controllers/userController'

const router = express.Router()

router.get('/all', getUser)
router.post('/', createUser)

export default router
