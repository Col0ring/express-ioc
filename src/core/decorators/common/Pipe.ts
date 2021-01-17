import { PIPE_KEY } from '../constants'
import { PipeTransform, PipeItem } from '../../type'
export function Pipe(...pipes: PipeTransform[]) {
  return function (target: any, methodKey?: string, index?: number | object) {
    if (methodKey && typeof index !== 'undefined') {
      const pipeItems: PipeItem[] =
        Reflect.getMetadata(PIPE_KEY, target, methodKey) || []
      // 获取所有注入的服务
      const providers: any[] =
        Reflect.getMetadata('design:paramtypes', target, methodKey) || []
      if (typeof index === 'object') {
        Reflect.defineMetadata(
          PIPE_KEY,
          [
            ...pipeItems,
            ...pipes.map<PipeItem>((pipe) => ({ pipe, providers, index: -1 }))
          ],
          target,
          methodKey
        )
      } else {
        Reflect.defineMetadata(
          PIPE_KEY,
          [
            ...pipeItems,
            ...pipes.map<PipeItem>((pipe) => ({
              pipe,
              providers: [providers[index]],
              index
            }))
          ],
          target,
          methodKey
        )
      }
    } else {
      for (const key in target.prototype) {
        const pipeItems: PipeItem[] =
          Reflect.getMetadata(PIPE_KEY, target.prototype, key) || []
        // 获取所有注入的服务
        const providers: any[] =
          Reflect.getMetadata('design:paramtypes', target.prototype, key) || []
        Reflect.defineMetadata(
          PIPE_KEY,
          [
            ...pipeItems,
            ...pipes.map<PipeItem>((pipe) => ({ pipe, providers, index: -1 }))
          ],
          target.prototype,
          key
        )
      }
    }
  }
}
