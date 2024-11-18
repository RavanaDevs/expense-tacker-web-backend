import express from 'express'
import { protect } from '../middlewares/authMiddleware'
import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpensesByDate,
  bulkCreateExpenses,
} from '../controllers/expenseController'

const router = express.Router()

// Protect all expense routes
router.use(protect)

router.post('/', createExpense)
router.post('/bulk', bulkCreateExpenses)
router.get('/all', getExpenses)
router.get('/date/:date', getExpensesByDate)
router.get('/:id', getExpenseById)
router.put('/:id', updateExpense)
router.delete('/:id', deleteExpense)

export default router 