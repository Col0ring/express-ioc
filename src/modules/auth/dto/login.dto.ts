import { IsString, IsNotEmpty } from 'class-validator'

export class LoginDto {
  @IsString({
    message: 'Please input correct username'
  })
  username: string
  @IsString({
    message: 'Please input correct password'
  })
  password: string
}
