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

export type TargetParamFunction = (
  target: any,
  methodKey: string,
  index: number
) => void

export interface ArgumentMetadata {
  readonly metatype?: any
  readonly data?: string
}
export interface PipeTransform<T = any, R = any> {
  transform(value: T, metadata: ArgumentMetadata): R
}

export interface PipeItem {
  pipe: PipeTransform
  providers: any[]
  index: number
}

export type RequestValueType = [index: number, name?: string]

export interface MiddlewareCallback {
  (req: Request, res: Response, next: NextFunction): void
}

export type Constructor<T = any> = new (...args: any[]) => T

export interface ApplicationRouterOptions extends RouterOptions {
  prefix?: string
}

export interface ApplicationControllerOptions {
  include?: RegExp
  exclude?: RegExp
}

export type DatabaseConfig = ConnectionOptions | ConnectionOptions[]

export type EntityClassOrSchema = Function | EntitySchema

export interface ApplicationOptions extends ApplicationRouterOptions {
  dbConfig?: DatabaseConfig
  controllerConfig?: ApplicationControllerOptions
}
