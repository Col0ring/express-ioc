import { Injectable } from '@/core'
import { ExampleService } from './example.service'
@Injectable()
export class App2Service {
  constructor(private readonly exampleService: ExampleService) {}
  getHello() {
    return this.exampleService.getExample()
  }
}
