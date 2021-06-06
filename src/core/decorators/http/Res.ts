import { ContextItem, Key } from '../../type'
import { RESPONSE_KEY } from '../constants'
export function Res(prop?: Key) {
  return function (target: any, methodKey: string, index: number) {
    if (methodKey) {
      const metadataValue: ContextItem[] =
        Reflect.getMetadata(RESPONSE_KEY, target) || []
      metadataValue.push({
        index,
        prop
      })
      Reflect.defineMetadata(RESPONSE_KEY, metadataValue, target, methodKey)
    }
  }
}
