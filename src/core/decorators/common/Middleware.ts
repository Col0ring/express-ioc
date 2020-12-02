import { MiddlewareCallback } from '../../type'
import {
  MIDDLEWARES_KEY,
  CONTROLLER_MIDDLEWARES_KEY,
  POST_CONTROLLER_MIDDLEWARES_KEY,
  POST_MIDDLEWARES_KEY
} from '../constants'

export function Middleware(
  callback: MiddlewareCallback | MiddlewareCallback[],
  position: 'pre' | 'post' = 'pre'
) {
  return function (target: any, key?: string) {
    if (key) {
      const metaDataKey =
        position === 'post' ? POST_MIDDLEWARES_KEY : MIDDLEWARES_KEY
      const middlewares: MiddlewareCallback[] =
        Reflect.getMetadata(metaDataKey, target, key) || []
      if (Array.isArray(callback)) {
        middlewares.push(...callback)
      } else {
        middlewares.push(callback)
      }
      Reflect.defineMetadata(metaDataKey, middlewares, target, key)
    } else {
      const metaDataKey =
        position === 'post'
          ? POST_CONTROLLER_MIDDLEWARES_KEY
          : CONTROLLER_MIDDLEWARES_KEY

      const controllerMiddlewares: MiddlewareCallback[] =
        Reflect.getMetadata(metaDataKey, target) || []
      if (Array.isArray(callback)) {
        controllerMiddlewares.push(...callback)
      } else {
        controllerMiddlewares.push(callback)
      }
      Reflect.defineMetadata(metaDataKey, controllerMiddlewares, target)
    }
  }
}
