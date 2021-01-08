import { Router, Request, Response, NextFunction } from 'express'
import path from 'path'
import { getPromiseResult } from '../../utils'
import {
  MiddlewareCallback,
  Method,
  Constructor,
  ApplicationRouterOptions,
  RequestValueType
} from '../../type'
import {
  INJECT_KEY,
  INJECTABLE_KEY,
  CONTROLLER_EXCEPTION_KEY,
  EXCEPTION_KEY,
  METHOD_KEY,
  PATH_KEY,
  MIDDLEWARE_KEY,
  CONTROLLER_MIDDLEWARE_KEY,
  POST_CONTROLLER_MIDDLEWARE_KEY,
  POST_MIDDLEWARE_KEY,
  REQUEST_QUERY_KEY,
  REQUEST_PARAM_KEY,
  REQUEST_BODY_KEY,
  REQUEST_KEY,
  RESPONSE_KEY
} from '../constants'

let router: Router | null = null
let globalPrefix: string = ''
export function createRouter(options: ApplicationRouterOptions = {}) {
  const { prefix, ...rest } = options
  router = Router(rest)
  globalPrefix = typeof prefix === 'string' ? prefix : globalPrefix
  return router
}

export function setGlobalPrefix(prefix: string = '/') {
  globalPrefix = typeof prefix === 'string' ? prefix : globalPrefix
}

function createConstructor<T = any>(target: Constructor<T>): T {
  // 获取所有注入的服务
  const providers: any[] =
    Reflect.getMetadata('design:paramtypes', target) || [] // [OtherService]

  const injects: Record<string, any> =
    Reflect.getMetadata(INJECT_KEY, target) || {}

  const args = providers.map((provider: Constructor, index) => {
    const isInjectable = Reflect.getMetadata(INJECTABLE_KEY, provider)
    const injectValue = injects[INJECT_KEY + index]
    if (typeof injectValue === 'function') {
      return createConstructor(injectValue)
    } else if (injectValue !== undefined) {
      return injectValue
    } else if (isInjectable) {
      return createConstructor(provider)
    } else {
      return undefined
    }
  })
  return new target(...args)
}

export function Controller(prefix = '/') {
  return function (target: any) {
    const controllerException =
      Reflect.getMetadata(CONTROLLER_EXCEPTION_KEY, target) || (() => {})
    const controllerMiddleware =
      Reflect.getMetadata(CONTROLLER_MIDDLEWARE_KEY, target) || []

    const postControllerMiddleware =
      Reflect.getMetadata(POST_CONTROLLER_MIDDLEWARE_KEY, target) || []

    const controller = createConstructor(target)

    for (const key in target.prototype) {
      if (typeof controller[key] !== 'function') {
        return
      }
      const currentPath = Reflect.getMetadata(PATH_KEY, controller, key)

      const middleware: MiddlewareCallback[] =
        Reflect.getMetadata(MIDDLEWARE_KEY, controller, key) || []

      const postMiddleware: MiddlewareCallback[] =
        Reflect.getMetadata(POST_MIDDLEWARE_KEY, controller, key) || []
      const exception =
        Reflect.getMetadata(EXCEPTION_KEY, controller, key) || (() => {})

      // http
      const method: Method = Reflect.getMetadata(METHOD_KEY, controller, key)
      const requests: number[] =
        Reflect.getMetadata(REQUEST_KEY, controller, key) || []
      const responses: number[] =
        Reflect.getMetadata(RESPONSE_KEY, controller, key) || []
      const requestQueries: RequestValueType[] =
        Reflect.getMetadata(REQUEST_QUERY_KEY, controller, key) || []
      const requestParams: RequestValueType[] =
        Reflect.getMetadata(REQUEST_PARAM_KEY, controller, key) || []
      const requestBodies: RequestValueType[] =
        Reflect.getMetadata(REQUEST_BODY_KEY, controller, key) || []

      // fix the prefix
      const url = path.join('/' + globalPrefix, prefix, currentPath)
      const handler = controller[key].bind(controller)
      const handlerWrapper = (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const args: any[] = []

          requests.forEach((index) => {
            args[index] = req
          })
          responses.forEach((index) => {
            args[index] = res
          })

          requestQueries.forEach(([index, name]) => {
            args[index] = name ? req.query[name] : req.query
          })
          requestParams.forEach(([index, name]) => {
            args[index] = name ? req.params[name] : req.params
          })
          requestBodies.forEach(([index, name]) => {
            args[index] = name ? req.body[name] : req.body
          })
          const result = handler(...args)
          if (!res.headersSent) {
            getPromiseResult(result)
              .then((value) => {
                res.send(value)
                next()
              })
              .catch((err) => {
                next()
                next(err)
              })
          } else {
            next()
          }
        } catch (err) {
          next()
          next(err)
        }
      }

      router?.[method](
        url,
        ...controllerMiddleware,
        ...middleware,
        handlerWrapper,
        ...postMiddleware,
        ...postControllerMiddleware,
        exception,
        controllerException
      )
    }
  }
}
