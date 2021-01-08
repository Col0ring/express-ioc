import { REQUEST_KEY } from '../constants'
export function Req() {
  return function (target: any, methodKey: string, index: number) {
    if (methodKey) {
      const metadataValue: number[] =
        Reflect.getMetadata(REQUEST_KEY, target) || []
      metadataValue.push(index)
      Reflect.defineMetadata(REQUEST_KEY, metadataValue, target, methodKey)
    }
  }
}
