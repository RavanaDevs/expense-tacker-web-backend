import { Request, Response, NextFunction } from 'express'
import { expenseSchema, bulkExpenseSchema } from '../validators/expenseSchemaValidator'
import Expense from '../models/expenseModel'

export const createExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationData = expenseSchema.parse(req.body)
    const expense = new Expense({
      ...validationData,
      date: new Date(validationData.date),
      user: req.user._id,
    })
    await expense.save()
    res.status(201).json({ message: 'Expense created successfully', expense })
  } catch (err) {
    next(err)
  }
}

export const getExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate, category } = req.query
    const query: any = { user: req.user._id }

    if (startDate || endDate) {
      query.date = {}
      if (startDate) {
        query.date.$gte = new Date(startDate as string)
      }
      if (endDate) {
        query.date.$lte = new Date(endDate as string)
      }
    }

    if (category) {
      query.category = category
    }

    const expenses = await Expense.find(query)
      .sort({ date: -1})
      .exec()
      
    res.status(200).json(expenses)
  } catch (err) {
    next(err)
  }
}

export const getExpenseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id,
    })
    if (!expense) {
      res.status(404).json({ message: 'Expense not found' })
    } else {
      res.status(200).json(expense)
    }
  } catch (err) {
    next(err)
  }
}

export const updateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationData = expenseSchema.partial().parse(req.body)
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      validationData,
      { new: true }
    )
    if (!expense) {
      res.status(404).json({ message: 'Expense not found' })
    } else {
      res.status(200).json({ message: 'Expense updated successfully', expense })
    }
  } catch (err) {
    next(err)
  }
}

export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    })
    if (!expense) {
      res.status(404).json({ message: 'Expense not found' })
    } else {
      res.status(200).json({ message: 'Expense deleted successfully' })
    }
  } catch (err) {
    next(err)
  }
}

export const getExpensesByDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date } = req.params
    const { category } = req.query
    
    // Create start and end of the day
    const startDate = new Date(date)
    startDate.setHours(0, 0, 0, 0)
    
    const endDate = new Date(date)
    endDate.setHours(23, 59, 59, 999)

    // Build query
    const query: any = {
      user: req.user._id,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }

    // Add category filter if provided
    if (category) {
      query.category = category
    }

    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .exec()

    res.status(200).json(expenses)
  } catch (err) {
    next(err)
  }
}

export const bulkCreateExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationData = bulkExpenseSchema.parse(req.body)
    
    // Prepare expenses with user ID and convert dates
    const expenses = validationData.map(expense => ({
      ...expense,
      date: new Date(expense.date),
      user: req.user._id,
    }))

    // Insert all expenses
    const result = await Expense.insertMany(expenses)

    res.status(201).json({ 
      message: 'Expenses created successfully', 
      count: result.length,
      expenses: result 
    })
  } catch (err) {
    next(err)
  }
} 