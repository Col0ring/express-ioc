import { MiddlewareCallback } from '@/core'
import { UnAuthorized } from '@/exceptions'
export const authMiddleware: MiddlewareCallback = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
      next()
    }
  }
  throw new UnAuthorized()
}
