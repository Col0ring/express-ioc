import { HttpException } from './HttpException'

interface UnAuthorizedOptions {
  message?: string
  data?: any
}

export class UnAuthorized extends HttpException {
  constructor(options: UnAuthorizedOptions = { message: 'unauthorized' }) {
    const { message, data } = options
    super({ status: 401, message, data })
  }
}
