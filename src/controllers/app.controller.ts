import { Request, Response } from 'express'
import {
  Controller,
  Get,
  Middleware,
  Exception,
  Inject,
  Query,
  Param,
  Body,
  Req,
  Res,
  Post,
  UploadedFile,
  Pipe
} from '@/core'
import { Success } from '@/exceptions'
import { App2Service } from '@/services/app2.service'
import { Example2Service } from '@/services/example2.service'
import { authMiddleware } from '@/middleware/auth.middleware'
import { fileMiddleware } from '@/middleware/file.middleware'
import { LogException } from '../decorators/log.decorator'
import { uploadConfig } from '@/config/upload'
import { PhotoDto } from '@/dto/Photo.dto'
import { ValidatorPipe } from '@/pipe/validator.pipe'
import { IntegerPipe } from '@/pipe/Integer.pipe'
@Controller()
// controller exception capture
@LogException()
export class AppController {
  constructor(
    @Inject(Example2Service) private readonly Example2Service: Example2Service,
    private readonly app2Service: App2Service
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
    return this.Example2Service.getExample()
  }

  @Post('upload')
  @Middleware(
    fileMiddleware({
      method: {
        type: 'single',
        fileName: 'file'
      },
      storage: uploadConfig.storage
    })
  )
  upload(@UploadedFile('file') file: Express.Multer.File) {
    return {
      file
    }
  }
  @Post('uploads')
  @Middleware(
    fileMiddleware({
      method: {
        type: 'array',
        fileName: 'file'
      },
      storage: uploadConfig.storage
    })
  )
  uploads(@UploadedFile('files') files: Express.Multer.File[]) {
    return {
      files
    }
  }

  @Post('app')
  // method exception capture
  @Exception()
  @Pipe(new ValidatorPipe())
  getHello(
    @Query('name') name: string,
    @Body(new IntegerPipe()) photo: PhotoDto
  ) {
    return photo
  }

  // @Get('photos')
  // // method exception capture
  // @Exception()
  // getPhotos(req: Request, res: Response) {
  //   return this.appService.getPhotos()
  // }
}
