import { ContextItem, Key } from '../../type'
import { REQUEST_KEY } from '../constants'
export function Req(prop?: Key) {
  return function (target: any, methodKey: string, index: number) {
    if (methodKey) {
      const metadataValue: ContextItem[] =
        Reflect.getMetadata(REQUEST_KEY, target) || []
      metadataValue.push({
        prop,
        index
      })
      Reflect.defineMetadata(REQUEST_KEY, metadataValue, target, methodKey)
    }
  }
}
