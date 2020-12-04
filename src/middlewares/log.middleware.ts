import morgan, { Options } from 'morgan'
import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { MiddlewareCallback } from '@/core'

interface PrintLogOptions {
  type?: 'print'
  options?: Options<Request, Response>
}

interface FileLogOptions {
  type?: 'file'
  dir?: string
  fileName?: string
  options?: Options<Request, Response>
}

export type LogOptions = PrintLogOptions | FileLogOptions

export function logMiddleware(options: LogOptions = {}): MiddlewareCallback {
  if (options.type === 'file') {
    const dir = options.dir || path.join(__dirname, '../logs')
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    const filePath = path.join(dir, options.fileName || 'logs.log')

    const writeStream = fs.createWriteStream(filePath, {
      flags: 'a', // additional
      encoding: 'utf-8'
    })
    return morgan(
      'combined',
      Object.assign(
        {},
        {
          stream: writeStream
        },
        options.options
      )
    )
  } else {
    return morgan('dev', Object.assign({}, options.options))
  }
}
