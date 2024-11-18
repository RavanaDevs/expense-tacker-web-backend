import { Request, Response, NextFunction } from 'express'
import Settings from '../models/settingsModel'
import {
  settingsSchema,
  currencySettingsSchema,
  quickAmountSettingsSchema,
  categorySettingsSchema,
  themeSchema,
} from '../validators/settingsSchemaValidator'

// Helper function to get or create settings
const getOrCreateSettings = async (userId: string) => {
  let settings = await Settings.findOne({ user: userId })
  if (!settings) {
    settings = new Settings({ user: userId })
    await settings.save()
  }
  return settings
}

export const getAllSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const settings = await getOrCreateSettings(req.user._id)
    res.status(200).json(settings)
  } catch (err) {
    next(err)
  }
}

export const updateAllSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationData = settingsSchema.parse(req.body)
    const settings = await Settings.findOneAndUpdate(
      { user: req.user._id },
      validationData,
      { new: true, upsert: true }
    )
    res.status(200).json(settings)
  } catch (err) {
    next(err)
  }
}

export const getCurrencySettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const settings = await getOrCreateSettings(req.user._id)
    res.status(200).json(settings.currencySettings)
  } catch (err) {
    next(err)
  }
}

export const updateCurrencySettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationData = currencySettingsSchema.parse(req.body)
    const settings = await Settings.findOneAndUpdate(
      { user: req.user._id },
      { currencySettings: validationData },
      { new: true, upsert: true }
    )
    res.status(200).json(settings.currencySettings)
  } catch (err) {
    next(err)
  }
}

export const getQuickAmountSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const settings = await getOrCreateSettings(req.user._id)
    res.status(200).json(settings.quickAmountSettings)
  } catch (err) {
    next(err)
  }
}

export const updateQuickAmountSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationData = quickAmountSettingsSchema.parse(req.body)
    const settings = await Settings.findOneAndUpdate(
      { user: req.user._id },
      { quickAmountSettings: validationData },
      { new: true, upsert: true }
    )
    res.status(200).json(settings.quickAmountSettings)
  } catch (err) {
    next(err)
  }
}

export const getCategorySettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const settings = await getOrCreateSettings(req.user._id)
    res.status(200).json(settings.categorySettings)
  } catch (err) {
    next(err)
  }
}

export const updateCategorySettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationData = categorySettingsSchema.parse(req.body)
    const settings = await Settings.findOneAndUpdate(
      { user: req.user._id },
      { categorySettings: validationData },
      { new: true, upsert: true }
    )
    res.status(200).json(settings.categorySettings)
  } catch (err) {
    next(err)
  }
}

export const getTheme = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const settings = await getOrCreateSettings(req.user._id)
    res.status(200).json({ theme: settings.theme })
  } catch (err) {
    next(err)
  }
}

export const updateTheme = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const theme = themeSchema.parse(req.body.theme)
    const settings = await Settings.findOneAndUpdate(
      { user: req.user._id },
      { theme },
      { new: true, upsert: true }
    )
    res.status(200).json({ theme: settings.theme })
  } catch (err) {
    next(err)
  }
} 