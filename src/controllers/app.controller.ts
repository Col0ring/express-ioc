import { Request, Response } from 'express'
import { Controller, Get, Middleware, Exception, Inject } from '@/core'
import { Success } from '@/exceptions'
import { AppSevice } from '@/services/app.service'
import { Example2Sevice } from '@/services/example2.service'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { LogException } from '../decorators/log.decorator'

@Controller()
// controller exception capture
@LogException()
export class AppController {
  constructor(
    @Inject(Example2Sevice) private readonly Example2Sevice: Example2Sevice,
    private readonly appService: AppSevice
  ) {}

  @Get()
  @Middleware((req, res, next) => {
    console.log('middleware')
    next()
  })
  @Middleware((req, res, next) => {
    console.log('middleware2')
    next()
  }, 'post')
  async home(req: Request, res: Response) {
    throw new Success()
  }

  @Get('example')
  // method exception capture
  @Middleware(authMiddleware)
  getExample(req: Request, res: Response) {
    return this.Example2Sevice.getExample()
  }

  @Get('app')
  // method exception capture
  @Exception()
  getHello(req: Request, res: Response) {
    return this.appService.getHello()
  }

  @Get('photos')
  // method exception capture
  @Exception()
  getPhotos(req: Request, res: Response) {
    return this.appService.getPhotos()
  }
}
