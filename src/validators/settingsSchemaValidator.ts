import { z } from 'zod'

const quickAmountSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  enabled: z.boolean(),
})

const categorySchema = z.object({
  id: z.string(),
  value: z.string().min(1),
  label: z.string().min(1),
  emoji: z.string().min(1),
  enabled: z.boolean(),
})

export const currencySettingsSchema = z.object({
  currencySymbol: z.string().min(1),
  currencyCode: z.string().length(3),
  symbolPosition: z.enum(['before', 'after']),
})

export const quickAmountSettingsSchema = z.object({
  quickAmounts: z.array(quickAmountSchema),
})

export const categorySettingsSchema = z.object({
  categories: z.array(categorySchema),
})

export const themeSchema = z.enum(['dark', 'light'])

export const settingsSchema = z.object({
  currencySettings: currencySettingsSchema,
  quickAmountSettings: quickAmountSettingsSchema,
  categorySettings: categorySettingsSchema,
  theme: themeSchema,
}) 