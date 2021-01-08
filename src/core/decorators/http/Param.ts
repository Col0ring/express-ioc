import { RequestValueType } from '@/core/type'
import { REQUEST_PARAM_KEY } from '../constants'
export function Param(name?: string) {
  return function (target: any, methodKey: string, index: number) {
    if (methodKey) {
      const metadataValue: RequestValueType[] =
        Reflect.getMetadata(REQUEST_PARAM_KEY, target) || []
      metadataValue.push([index, name])
      Reflect.defineMetadata(
        REQUEST_PARAM_KEY,
        metadataValue,
        target,
        methodKey
      )
    }
  }
}
