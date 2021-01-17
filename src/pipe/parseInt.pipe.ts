import { PipeTransform } from '@/core'

export class ParseIntPipe implements PipeTransform {
  async transform(value: any) {
    const num = +value
    return Number.isNaN(num) ? undefined : num
  }
}
