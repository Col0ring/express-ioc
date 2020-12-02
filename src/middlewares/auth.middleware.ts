import { MiddlewareCallback } from '@/core'
import { UnAuthorized } from '@/exceptions'
export const authMiddleware: MiddlewareCallback = (req, res, next) => {
  throw new UnAuthorized()
}
