import { Method } from '../type'
import { PATH_KEY, METHOD_KEY } from './constants'
function getMethodDecorator(type: Method) {
  return function (path: string = '/') {
    return function (target: any, key: string) {
      Reflect.defineMetadata(PATH_KEY, path, target, key)
      Reflect.defineMetadata(METHOD_KEY, type, target, key)
    }
  }
}

export const All = getMethodDecorator('all')
export const Get = getMethodDecorator('get')
export const Post = getMethodDecorator('post')
export const Put = getMethodDecorator('put')
export const Delete = getMethodDecorator('delete')
export const Patch = getMethodDecorator('patch')
export const Options = getMethodDecorator('options')
export const Head = getMethodDecorator('head')
