import {
  Body,
  Controller,
  Delete,
  Exception,
  Get,
  Param,
  Pipe,
  Post,
  Put,
  Query
} from '@/core'
import { ParseIntPipe } from '@/pipe/parseInt.pipe'
import { ValidatorIntPipe } from '@/pipe/validateInt.pipe'
import { PostService } from './post.service'
import { PostEditDto } from './dto/edit'
import { PostCreateDto } from './dto/create.dto'
import { Success } from '@/exception/Success'
import { ValidatorPipe } from '@/pipe/validator.pipe'

@Controller('/post')
@Pipe(new ValidatorPipe())
@Exception()
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  list(
    @Query('pageNum', new ParseIntPipe()) pageNum: number = 1,
    @Query('pageSize', new ParseIntPipe()) pageSize: number = 10
  ) {
    return this.postService.list(pageSize, pageNum)
  }

  @Post()
  async create(@Body() postCreateDto: PostCreateDto) {
    await this.postService.create(postCreateDto)
    throw new Success({
      message: '创建成功'
    })
  }

  @Put(':id')
  async edit(
    @Param('id', new ValidatorIntPipe()) id: number,
    @Body() postEditDto: PostEditDto
  ) {
    await this.postService.edit(id, postEditDto)
    throw new Success({
      message: '修改成功'
    })
  }

  @Delete(':id')
  async delete(@Param('id', new ValidatorIntPipe()) id: number) {
    await this.postService.delete(id)
    throw new Success({
      message: '删除成功'
    })
  }
}
