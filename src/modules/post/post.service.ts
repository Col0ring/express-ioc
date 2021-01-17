import { Injectable, InjectRepository } from '@/core'
import { Repository } from 'typeorm'
import { PostEntity } from './entity/post.entity'
import { PostCreateDto } from './dto/create.dto'
import { PostEditDto } from './dto/edit'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) {}

  list(pageSize: number, pageNum: number) {
    return this.postRepository.findAndCount({
      take: pageSize,
      skip: pageSize * (pageNum - 1)
    })
  }
  create(postCreateDto: PostCreateDto) {
    const post = this.postRepository.create(postCreateDto)
    return this.postRepository.save(post)
  }
  edit(id: number, postEditDto: PostEditDto) {
    return this.postRepository.update(id, postEditDto)
  }
  delete(id: number) {
    return this.postRepository.delete(id)
  }
}
