import { ErrorRequestHandler } from 'express'
import { EXCEPTION_KEY, CONTROLLER_EXCEPTION_KEY } from './constants'
export function Exception() {
  return function (target: any, key?: string) {
    const errorMiddleware: ErrorRequestHandler = function (
      err,
      req,
      res,
      next
    ) {
      const status = err.status || 200
      const data = err.data
      const message = err.message
      // 设置状态码为500
      res.status(status).send({
        status,
        message,
        data
      })
    }
    if (key) {
      Reflect.defineMetadata(EXCEPTION_KEY, errorMiddleware, target, key)
    } else {
      Reflect.defineMetadata(CONTROLLER_EXCEPTION_KEY, errorMiddleware, target)
    }
  }
}
