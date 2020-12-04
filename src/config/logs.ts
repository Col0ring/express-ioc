import path from 'path'
import { LogOptions } from '@/middlewares/log.middleware'

const __DEV__ = process.env.NODE_ENV === 'production' ? false : true

export const accessLogConfig: LogOptions = __DEV__
  ? {
      type: 'print'
    }
  : {
      type: 'file',
      dir: path.join(__dirname, '../logs'),
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
