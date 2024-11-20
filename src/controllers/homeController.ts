import { NextFunction, Request, Response } from 'express'

export const home = (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello, World! It is working 😋')
}
