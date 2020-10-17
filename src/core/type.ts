import { Request, Response, NextFunction } from 'express'
export type Method =
  | 'all'
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head'
export interface MiddlewareCallback {
  (req: Request, res: Response, next: NextFunction): void
}

export type Constructor<T = any> = new (...args: any[]) => T
