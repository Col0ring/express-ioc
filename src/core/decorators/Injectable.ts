import { INJECTABLE_KEY } from './constants'
// class
export function Injectable() {
  return function (target: any) {
    const metaData: any[] = []
    Reflect.defineMetadata(INJECTABLE_KEY, metaData, target)
  }
}
