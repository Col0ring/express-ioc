import { Injectable } from '@/core'

@Injectable()
export class HelloService {
  getHello() {
    return 'hello world'
  }
  getAuthHello() {
    return 'hello world, auth!'
  }
}
