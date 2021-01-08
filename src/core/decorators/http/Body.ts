import { RequestValueType } from '@/core/type'
import { REQUEST_BODY_KEY } from '../constants'
export function Body(name?: string) {
  return function (target: any, methodKey: string, index: number) {
    if (methodKey) {
      const metadataValue: RequestValueType[] =
        Reflect.getMetadata(REQUEST_BODY_KEY, target) || []
      metadataValue.push([index, name])
      Reflect.defineMetadata(REQUEST_BODY_KEY, metadataValue, target, methodKey)
    }
  }
}
