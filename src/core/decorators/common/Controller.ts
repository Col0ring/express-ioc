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
  RESPONSE_KEY,
  REQUEST_UPLOADED_FILE_KEY,
  REQUEST_HEADER_KEY,
  RequestProps
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

      const requestProps = [
        { key: REQUEST_QUERY_KEY, prop: RequestProps.Query },
        { key: REQUEST_PARAM_KEY, prop: RequestProps.Param },
        { key: REQUEST_BODY_KEY, prop: RequestProps.Body },
        { key: REQUEST_HEADER_KEY, prop: RequestProps.Header },
        { key: REQUEST_UPLOADED_FILE_KEY, prop: RequestProps.None }
      ]
      const handlerParams = requestProps.map(({ key: propKey, prop }) => {
        return {
          data: (Reflect.getMetadata(propKey, controller, key) ||
            []) as RequestValueType[],
          prop
        }
      })

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
          handlerParams.forEach(({ data, prop }) => {
            data.forEach(([index, name]) => {
              if (prop) {
                args[index] = name ? req[prop][name] : req[prop]
              } else {
                args[index] = req[name as 'file' | 'files']
              }
            })
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
