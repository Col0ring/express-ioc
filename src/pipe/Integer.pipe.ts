import { PipeTransform } from '@/core'
import { BadRequest } from '@/exceptions'

export class IntegerPipe implements PipeTransform {
  async transform(value: any) {
    const num = +value
    if (Number.isNaN(num)) {
      throw new BadRequest({
        message: '应传入整形'
      })
    }
    return value
  }
}
