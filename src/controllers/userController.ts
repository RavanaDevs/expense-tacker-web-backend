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
