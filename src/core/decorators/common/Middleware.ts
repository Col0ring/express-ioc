import { MiddlewareCallback } from '../../type'
import { MIDDLEWARES_KEY, CONTROLLER_MIDDLEWARES_KEY } from '../constants'

export function Middleware(callback: MiddlewareCallback) {
  return function (target: any, key?: string) {
    if (key) {
      const middlewares: MiddlewareCallback[] =
        Reflect.getMetadata(MIDDLEWARES_KEY, target, key) || []
      middlewares.push(callback)
      Reflect.defineMetadata(MIDDLEWARES_KEY, middlewares, target, key)
    } else {
      const controllerMiddlewares: MiddlewareCallback[] =
        Reflect.getMetadata(CONTROLLER_MIDDLEWARES_KEY, target) || []
      controllerMiddlewares.push(callback)
      Reflect.defineMetadata(
        CONTROLLER_MIDDLEWARES_KEY,
        controllerMiddlewares,
        target
      )
    }
  }
}
