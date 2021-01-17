import { HttpException } from './HttpException'

interface BadRequestOptions {
  message?: string
  data?: any
}

export class BadRequest extends HttpException {
  constructor(options: BadRequestOptions = { message: 'Bad Requset' }) {
    const { message, data } = options
    super({ status: 400, message, data })
  }
}
