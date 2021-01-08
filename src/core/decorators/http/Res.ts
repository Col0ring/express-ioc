import { RESPONSE_KEY } from '../constants'
export function Res() {
  return function (target: any, methodKey: string, index: number) {
    if (methodKey) {
      const metadataValue: number[] =
        Reflect.getMetadata(RESPONSE_KEY, target) || []
      metadataValue.push(index)
      Reflect.defineMetadata(RESPONSE_KEY, metadataValue, target, methodKey)
    }
  }
}
