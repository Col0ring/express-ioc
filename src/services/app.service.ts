import { Injectable } from '@/core'
import { ExampleSevice } from './example.service'
@Injectable()
export class AppSevice {
  constructor(private readonly exampleSevice: ExampleSevice) {}
  getHello() {
    return this.exampleSevice.getExample()
  }
}
