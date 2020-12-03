import { Request, Response, NextFunction, RouterOptions } from 'express'
import { ConnectionOptions, EntitySchema } from 'typeorm'
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

export interface ApplicationRouterOptions extends RouterOptions {
  prefix?: string
}

export type DatabaseConfig = ConnectionOptions | ConnectionOptions[]

export type EntityClassOrSchema = Function | EntitySchema

export interface ApplicationOptions extends ApplicationRouterOptions {
  dbConfig?: DatabaseConfig
}
