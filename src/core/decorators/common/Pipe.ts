export interface ArgumentMetadata {
  readonly metatype?: any
  readonly data?: string
}
export interface PipeTransform<T = any, R = any> {
  transform(value: T, metadata: ArgumentMetadata): R
}

export function Pipe(pipe: any) {
  return function (target: any, methodKey: string, index?: number) {
    // 获取所有注入的服务
    const providers: any[] =
      Reflect.getMetadata('design:paramtypes', target) || []
    if (typeof index !== 'undefined') {
    } else {
    }
  }
}
