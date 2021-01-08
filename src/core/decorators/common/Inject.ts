import { INJECT_KEY } from '../constants'
// Inject value
// property
// only can be injected by constructor params
export function Inject(param: any) {
  return function (target: any, methodKey: string, index: number) {
    // constructor
    if (typeof methodKey === 'undefined') {
      const metadataValue = Reflect.getMetadata(INJECT_KEY, target) || {}
      metadataValue[INJECT_KEY + index] = param
      Reflect.defineMetadata(INJECT_KEY, metadataValue, target)
    }
  }
}
