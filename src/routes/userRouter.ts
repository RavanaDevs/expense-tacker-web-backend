import express from 'express'
import { 
  createUser, 
  getUser, 
  getUserById,
  updateUser,
  deleteUser 
} from '../controllers/userController'
import { protect } from '../middlewares/authMiddleware'

const router = express.Router()

// Protect all routes
router.use(protect)

router.get('/all', getUser)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
