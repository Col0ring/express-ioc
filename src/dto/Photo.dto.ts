import { IsInt } from 'class-validator'

export class PhotoDto {
  @IsInt({
    message: 'Please input the correct age',
  })
  age: string
  @IsInt({
    message: 'Please input the correct a',
  })
  a: string
  @IsInt({
    message: 'Please input the correct name',
  })
  name: string
}
