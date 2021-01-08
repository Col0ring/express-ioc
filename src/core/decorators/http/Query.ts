import { RequestValueType } from '@/core/type'
import { REQUEST_QUERY_KEY } from '../constants'
export function Query(name?: string) {
  return function (target: any, methodKey: string, index: number) {
    if (methodKey) {
      const metadataValue: RequestValueType[] =
        Reflect.getMetadata(REQUEST_QUERY_KEY, target) || []
      metadataValue.push([index, name])
      Reflect.defineMetadata(
        REQUEST_QUERY_KEY,
        metadataValue,
        target,
        methodKey
      )
    }
  }
}
