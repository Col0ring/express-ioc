import { RequestValueType } from '@/core/type'
import { REQUEST_HEADER_KEY } from '../constants'
export function Header(name?: string) {
  return function (target: any, methodKey: string, index: number) {
    if (methodKey) {
      const metadataValue: RequestValueType[] =
        Reflect.getMetadata(REQUEST_HEADER_KEY, target) || []
      metadataValue.push([index, name])
      Reflect.defineMetadata(
        REQUEST_HEADER_KEY,
        metadataValue,
        target,
        methodKey
      )
    }
  }
}
