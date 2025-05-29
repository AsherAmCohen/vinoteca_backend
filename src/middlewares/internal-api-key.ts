import { Request, Response, NextFunction } from 'express'

const validKey = process.env.INTERNAL_API_KEY

export const verifyInternalApiKey = (request: Request, response: Response, next: NextFunction) => {
  const internalKey = request.headers['x-internal-api-key']

  if (!internalKey || internalKey !== validKey) {
    response.status(403).json({ message: 'Acceso denegado: API Key inválida' })
    return
  }

  next()
}