import { NextFunction } from 'express'
import multer from 'multer'
import { MiddlewareCallback } from '@/core'
import { BadRequest } from '@/exceptions'
interface SingleType {
  type: 'single'
  fileName: string
}

interface ArrayType {
  type: 'array'
  fileName: string
  maxCount?: number
}

interface FieldsType {
  type: 'fields'
  fields: ReadonlyArray<multer.Field>
}

interface OtherType {
  type: 'any' | 'none'
}

type FileMiddlewareType = SingleType | ArrayType | FieldsType | OtherType

export interface FileMiddlewareOptions extends multer.Options {
  method: FileMiddlewareType
  errorHandler?: (err: any, next: NextFunction) => void
}

export const fileMiddleware = (
  options: FileMiddlewareOptions
): MiddlewareCallback => (req, res, next) => {
  const method = options.method
  const upload = multer({
    ...options
  })
  let handler: MiddlewareCallback
  if (method.type === 'fields') {
    handler = upload[method.type](method.fields)
  } else if (method.type === 'array') {
    handler = upload[method.type](method.fileName, method.maxCount)
  } else if (method.type === 'single') {
    handler = upload[method.type](method.fileName)
  } else {
    handler = upload[method.type]()
  }
  return handler(req, res, (err: any) => {
    if (options.errorHandler) {
      return options.errorHandler(err, next)
    }
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      next(
        new BadRequest({
          message: err.message
        })
      )
    } else if (err) {
      // An unknown error occurred when uploading.
      next(
        new BadRequest({
          message: err.message
        })
      )
    } else {
      next()
    }
  })
}
