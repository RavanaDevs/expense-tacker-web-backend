import { NextFunction, Request, Response } from 'express'
import { userSchema } from '../validators/userSchemaValidator'
import User from '../models/userModel'

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validationData = userSchema.parse(req.body)
    const ob = new User(validationData)
    const user = await ob.save()
    res.status(201).json({ message: 'User created successfully', user: user })
  } catch (e) {
    next(e)
  }
}

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
    } else {
      res.status(200).json(user)
    }
  } catch (err) {
    next(err)
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validationData = userSchema.partial().parse(req.body)
    const user = await User.findByIdAndUpdate(req.params.id, validationData, {
      new: true,
    })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
    } else {
      res.status(200).json({ message: 'User updated successfully', user })
    }
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (err) {
    next(err)
  }
}
