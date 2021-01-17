import { MiddlewareCallback } from '@/core'
import { UnAuthorized } from '@/exception'
import { verifyToken } from '@/utils/auth'
export const authMiddleware: MiddlewareCallback = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      const user: any = verifyToken(token)
      if (user && user.id) {
        return next()
      }
    } else {
      throw new UnAuthorized()
    }
  } catch (error) {
    throw new UnAuthorized({
      message: error.message
    })
  }
}
