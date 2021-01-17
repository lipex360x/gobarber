import AppError from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import sessionConfig from './config/session.config'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function sessionStarted (request:Request, response:Response, next:NextFunction): void {
  const tokenHeader = request.headers.authorization

  if (!tokenHeader) {
    throw new AppError('JWT token is missing')
  }

  const [, token] = tokenHeader.split(' ')

  try {
    const decoded = verify(token, sessionConfig.jwt.secret)

    const { sub } = decoded as TokenPayload

    request.user = {
      id: sub
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT Token')
  }
}
