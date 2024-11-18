import express from 'express'
import { 
  createUser, 
  getUser, 
  getUserById,
  updateUser,
  deleteUser 
} from '../controllers/userController'

const router = express.Router()

router.get('/all', getUser)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
