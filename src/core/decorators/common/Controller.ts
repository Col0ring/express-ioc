import { Router, Request, Response, RouterOptions } from 'express'
import path from 'path'
import { MiddlewareCallback, Method, Constructor } from '../../type'
import {
  INJECT_KEY,
  INJECTABLE_KEY,
  CONTROLLER_EXCEPTION_KEY,
  EXCEPTION_KEY,
  METHOD_KEY,
  PATH_KEY,
  MIDDLEWARES_KEY,
  CONTROLLER_MIDDLEWARES_KEY
} from '../constants'

let router: Router | null = null
let globalPrefix: string = ''
export function createRouter(
  options: RouterOptions & { prefix?: string } = {}
) {
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

// 获取异步的错误或数据
function getPromiseResult(value: any) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value
        .then((res) => {
          resolve(getPromiseResult(res))
        })
        .catch(reject)
    } else {
      resolve(value)
    }
  })
}

export function Controller(prefix = '/') {
  return function (target: any) {
    const controllerException =
      Reflect.getMetadata(CONTROLLER_EXCEPTION_KEY, target) || (() => {})
    const controllerMiddlewares =
      Reflect.getMetadata(CONTROLLER_MIDDLEWARES_KEY, target) || []

    const controller = createConstructor(target)

    for (const key in target.prototype) {
      if (typeof controller[key] !== 'function') {
        return
      }
      const currentPath = Reflect.getMetadata(PATH_KEY, controller, key)
      const method: Method = Reflect.getMetadata(METHOD_KEY, controller, key)
      const middlewares: MiddlewareCallback[] =
        Reflect.getMetadata(MIDDLEWARES_KEY, controller, key) || []
      const exception =
        Reflect.getMetadata(EXCEPTION_KEY, controller, key) || (() => {})

      // fix the prefix
      const url = path.join('/' + globalPrefix, prefix, currentPath)
      const handler = controller[key].bind(controller)

      const hadnlerWrapper = (req: Request, res: Response) => {
        try {
          const result = handler(req, res)
          if (!res.headersSent) {
            getPromiseResult(result)
              .then((value) => {
                res.send(value)
              })
              .catch((err) => {
                // 内部的 exception 可以不用重新获取，但是外部必须重新获取
                const exceptionHandler =
                  Reflect.getMetadata(EXCEPTION_KEY, controller, key) ||
                  Reflect.getMetadata(CONTROLLER_EXCEPTION_KEY, target)

                exceptionHandler
                  ? exceptionHandler(err, req, res, () => {})
                  : res.status(500).send(err.stack || 'Server Error')
              })
          }
        } catch (err) {
          throw err
        }
      }

      router?.[method](
        url,
        ...middlewares,
        ...controllerMiddlewares,
        hadnlerWrapper,
        exception,
        controllerException
      )
    }
  }
}
