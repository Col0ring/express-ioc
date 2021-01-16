import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { PipeTransform, ArgumentMetadata } from '@/core'
import { BadRequest } from '@/exceptions'

export class ValidatorPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      throw new BadRequest({
        message: errors
          .map((error) =>
            error.constraints
              ? Object.values(error.constraints)
              : error.constraints
          )
          .join()
      })
    }
    return value
  }
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
