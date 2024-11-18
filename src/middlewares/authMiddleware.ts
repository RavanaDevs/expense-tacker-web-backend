import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

interface JwtPayload {
  userId: string
}

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Not authorized' })
      return
    }

    const token = authHeader.split(' ')[1]

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    
    // Get user from token
    const user = await User.findById(decoded.userId).select('-password')
    if (!user) {
      res.status(401).json({ message: 'User not found' })
      return
    }

    // Attach user to request
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' })
  }
} 