import { Request, Response, NextFunction } from 'express'

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('Error!\n', error)
  res.status(500).json({ message: 'Somthing went wrong!' })
}

export default errorHandler
