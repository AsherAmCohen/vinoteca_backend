import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const SECRET_KEY = `${process.env.SECRET_KEY}`

interface JwtPayload {
  name: string;
  email: string;
  phone: string
  role: string;
  permissions: string[],
  shoppingCart: string
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        email: string;
        phone: string
        role: string;
        permissions: string[],
        shoppingCart: string
      }
    }
  }
}

export const authenticateToken = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (!token) {
    response.status(401).json({msg: 'Token no proporcionado'})
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload
    request.user = decoded
    next()
  } catch (error) {
    response.status(403).json({msg: 'Token invalido'})
  }
}