import { MiddlewareCallback } from '../../type'
import {
  MIDDLEWARE_KEY,
  CONTROLLER_MIDDLEWARE_KEY,
  POST_CONTROLLER_MIDDLEWARE_KEY,
  POST_MIDDLEWARE_KEY
} from '../constants'

export function Middleware(
  callback: MiddlewareCallback | MiddlewareCallback[],
  position: 'pre' | 'post' = 'pre'
) {
  return function (target: any, key?: string) {
    if (key) {
      const metaDataKey =
        position === 'post' ? POST_MIDDLEWARE_KEY : MIDDLEWARE_KEY
      const middleware: MiddlewareCallback[] =
        Reflect.getMetadata(metaDataKey, target, key) || []
      if (Array.isArray(callback)) {
        middleware.push(...callback)
      } else {
        middleware.push(callback)
      }
      Reflect.defineMetadata(metaDataKey, middleware, target, key)
    } else {
      const metaDataKey =
        position === 'post'
          ? POST_CONTROLLER_MIDDLEWARE_KEY
          : CONTROLLER_MIDDLEWARE_KEY

      const controllerMiddleware: MiddlewareCallback[] =
        Reflect.getMetadata(metaDataKey, target) || []
      if (Array.isArray(callback)) {
        controllerMiddleware.push(...callback)
      } else {
        controllerMiddleware.push(callback)
      }
      Reflect.defineMetadata(metaDataKey, controllerMiddleware, target)
    }
  }
}
