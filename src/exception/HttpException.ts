interface ExceptionOptions {
  status?: number
  message?: string
  data?: any
}

export class HttpException extends Error {
  status: number
  data: any
  constructor(options: ExceptionOptions = { status: 200 }) {
    const { status, message, data } = options
    super(message)
    this.status = status || 200
    this.data = data
  }
}
