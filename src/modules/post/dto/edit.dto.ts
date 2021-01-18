import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class PostEditDto {
  @IsString({
    message: 'Please input correct title'
  })
  @IsNotEmpty({
    message: "title can't be empty"
  })
  title: string
  @IsString({
    message: 'Please input correct description'
  })
  description: string
  @IsString({
    message: 'Please input correct content'
  })
  @IsNotEmpty({
    message: "content can't be empty"
  })
  content: string

  @IsInt({
    message: 'the views of post are wrong'
  })
  views: number
}
