import { ErrorRequestHandler, Request, Response } from 'express'
import { EXCEPTION_KEY, CONTROLLER_EXCEPTION_KEY } from '../constants'
export function Exception(
  cb?: (err: any, req: Request, res: Response) => void
) {
  return function (target: any, key?: string) {
    const errorMiddleware: ErrorRequestHandler = function (
      err,
      req,
      res,
      next
    ) {
      // set status 500
      const status = err.status || 500
      const data = err.data
      const message = err.message || 'Server Error'
      cb && cb(err, req, res)
      if (!res.headersSent) {
        res.status(status).send({
          status,
          message,
          data
        })
      }
    }
    if (key) {
      Reflect.defineMetadata(EXCEPTION_KEY, errorMiddleware, target, key)
    } else {
      Reflect.defineMetadata(CONTROLLER_EXCEPTION_KEY, errorMiddleware, target)
    }
  }
}
