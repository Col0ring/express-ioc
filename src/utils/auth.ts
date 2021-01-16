import jwt from 'jsonwebtoken'
import { authConfig } from '@/config/auth'

export function signToken(payload: Record<string, any>): string {
  return jwt.sign(payload, authConfig.authKey, {
    expiresIn: authConfig.expiresIn
  })
}

export function verifyToken(token: string): object | string {
  return jwt.verify(token, authConfig.authKey)
}
