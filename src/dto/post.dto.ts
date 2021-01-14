import { IsString } from 'class-validator'

export class PostDto {
  @IsString({
    message: '请输入正确的名称'
  })
  name: string
}
