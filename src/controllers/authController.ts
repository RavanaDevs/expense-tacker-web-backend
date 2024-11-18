import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'
import { userSchema } from '../validators/userSchemaValidator'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const JWT_EXPIRES_IN = '24h'

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationData = userSchema.parse(req.body)
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: validationData.email })
    if (existingUser) {
      res.status(400).json({ message: 'Email already registered' })
      return
    }

    // Create new user
    const user = new User(validationData)
    await user.save()

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    })

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    })
  } catch (err) {
    next(err)
  }
}

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    })

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    })
  } catch (err) {
    next(err)
  }
}

export const signout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Since JWT is stateless, we just send a success response
    // The client should remove the token from storage
    res.status(200).json({ 
      message: 'Signout successful',
      // Optional: send a new token expiry time of now to help client
      tokenExpiry: new Date().toISOString()
    })
  } catch (err) {
    next(err)
  }
} 