import { Injectable, InjectRepository } from '@/core'
import { Repository } from 'typeorm'
import { PostEntity } from './entity/post.entity'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) {}

  list(pageSize: number, pageNum: number) {
    return this.postRepository.findAndCount({
      take: pageNum,
      skip: pageSize * pageNum
    })
  }
}
