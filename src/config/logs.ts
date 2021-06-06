import path from 'path'
import { LogOptions } from '@/middleware/log.middleware'
import { __DEV__ } from './env'

export const accessLogConfig: LogOptions = __DEV__
  ? {
      type: 'print'
    }
  : {
      type: 'file',
      dir: path.join(__dirname, '../../logs'),
      fileName: 'access.log'
    }

export const errorLogConfig: LogOptions = {
  type: 'file',
  fileName: 'error.log',
  options: {
    skip: (req, res) => {
      return res.statusCode < 400
    }
  }
}
