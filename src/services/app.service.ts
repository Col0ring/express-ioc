import { Injectable, InjectRepository } from '@/core'
import { ExampleSevice } from './example.service'
import { Photo } from '@/db/entity/Photo'
import { Repository } from 'typeorm'
@Injectable()
export class AppSevice {
  constructor(
    private readonly exampleSevice: ExampleSevice,
    @InjectRepository(Photo) private readonly phoneRepository: Repository<Photo>
  ) {}
  getHello() {
    return this.exampleSevice.getExample()
  }
  getPhotos() {
    // const photo = new Photo()
    // photo.name = 'Me and Bears'
    // photo.description = 'I am near polar bears'
    // photo.filename = 'photo-with-bears.jpg'
    // photo.views = 1
    // photo.isPublished = true
    // this.phoneRepository.save(photo)
    return this.phoneRepository.find()
  }
}
