import { Controller, Get, Param, Post, Query } from '@/core'
import { ParseIntPipe } from '@/pipe/parseInt.pipe'
import { ValidatorIntPipe } from '@/pipe/validateInt.pipe'
import { PostService } from './post.service'

@Controller('/post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  list(
    @Query('pageSize', new ParseIntPipe()) pageSize: number = 10,
    @Query('pageNum', new ParseIntPipe()) pageNum: number = 1
  ) {}

  @Post('/create')
  create() {}

  @Post('/edit/:id')
  edit(@Param('id', new ValidatorIntPipe()) id: number) {}
}
