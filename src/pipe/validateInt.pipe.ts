import { PipeTransform } from '@/core'
import { BadRequest } from '@/exception'

export class ValidatorIntPipe implements PipeTransform {
  async transform(value: any) {
    const num = +value
    if (Number.isNaN(num)) {
      throw new BadRequest({
        message: 'Please input a integer'
      })
    }
    return num
  }
}
