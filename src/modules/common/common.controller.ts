import { Body, Controller, Middleware, Post, UploadedFile } from '@/core'
import { fileMiddleware } from '@/middleware/file.middleware'
import { uploadConfig } from '@/config/upload'
@Controller('/common')
export class CommonController {
  @Post('/upload/file')
  @Middleware(
    fileMiddleware({
      method: {
        type: 'single',
        fileName: 'file'
      },
      storage: uploadConfig.storage
    })
  )
  uploadFile(@UploadedFile('file') file: Express.Multer.File) {
    return {
      file
    }
  }

  @Post('/upload/files')
  @Middleware(
    fileMiddleware({
      method: {
        type: 'array',
        fileName: 'files'
      },
      storage: uploadConfig.storage
    })
  )
  uploadFiles(@UploadedFile('files') files: Express.Multer.File[]) {
    return {
      files
    }
  }
}
