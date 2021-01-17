import { HttpException } from './HttpException'

interface SuccessOptions {
  message?: string
  data?: any
}

export class Success extends HttpException {
  constructor(options: SuccessOptions = { message: 'Success' }) {
    const { message, data } = options
    super({ status: 200, message, data })
  }
}
