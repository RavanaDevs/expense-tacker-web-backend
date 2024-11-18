import express from 'express'
import { protect } from '../middlewares/authMiddleware'
import {
  getAllSettings,
  updateAllSettings,
  getCurrencySettings,
  updateCurrencySettings,
  getQuickAmountSettings,
  updateQuickAmountSettings,
  getCategorySettings,
  updateCategorySettings,
  getTheme,
  updateTheme,
} from '../controllers/settingsController'

const router = express.Router()

// Protect all settings routes
router.use(protect)

// All settings
router.get('/', getAllSettings)
router.put('/', updateAllSettings)

// Currency settings
router.get('/currency', getCurrencySettings)
router.put('/currency', updateCurrencySettings)

// Quick amount settings
router.get('/quick-amounts', getQuickAmountSettings)
router.put('/quick-amounts', updateQuickAmountSettings)

// Category settings
router.get('/categories', getCategorySettings)
router.put('/categories', updateCategorySettings)

// Theme
router.get('/theme', getTheme)
router.put('/theme', updateTheme)

export default router 