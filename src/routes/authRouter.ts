import express from 'express'
import { signup, signin, signout } from '../controllers/authController'
import { protect } from '../middlewares/authMiddleware'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', protect, signout)

export default router 