import { Controller, Exception, Get, Middleware } from '@/core'
import { authMiddleware } from '@/middleware/auth.middleware'
import { HelloService } from './hello.service'

@Controller('/hello')
@Exception()
export class HelloController {
  constructor(private readonly helloService: HelloService) {}
  @Get()
  getHello() {
    return this.helloService.getHello()
  }

  @Get('/auth')
  @Middleware(authMiddleware)
  getAuthHello() {
    return this.helloService.getAuthHello()
  }
}
