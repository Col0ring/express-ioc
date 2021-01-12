import express, { Router } from 'express'
import { createConnection, Connection, createConnections } from 'typeorm'
import cors, { CorsOptions } from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import { createRouter, setGlobalPrefix } from './decorators'
import {
  MiddlewareCallback,
  ApplicationOptions,
  ApplicationRouterOptions,
  DatabaseConfig
} from './type'
import { loadFiles } from './utils'

export class Application {
  private app = express()
  private router: Router
  private connections: Connection | Connection[] | null = null
  constructor(options: ApplicationOptions = {}) {
    this.initApplication(options)
  }
  async initApplication(options: ApplicationOptions = {}) {
    const { dbConfig, ...routerOptions } = options
    if (dbConfig && typeof dbConfig === 'object') {
      await this.initDatabase(dbConfig)
    }

    this.router = this.initRouter(routerOptions)
    this.initControllers()
  }

  private initRouter(options?: ApplicationRouterOptions) {
    const router = createRouter(options)
    this.useGlobalMiddleware(router)
    return router
  }
  private initControllers() {
    const parentPath = path.resolve(__dirname, '../controllers')
    loadFiles(parentPath)
  }

  private closeConnection() {
    if (!this.connections) {
      return
    }
    if (Array.isArray(this.connections)) {
      this.connections.forEach((connection) => {
        connection.close()
      })
    } else {
      this.connections.close()
    }
  }

  private async initDatabase(dbConfig: DatabaseConfig) {
    this.closeConnection()
    if (Array.isArray(dbConfig)) {
      this.connections = await createConnections(dbConfig)
    } else {
      this.connections = await createConnection(dbConfig)
    }
    console.log('database connect successfully')
    return this.connections
  }

  setGlobalPrefix(prefix: string) {
    setGlobalPrefix(prefix)
  }

  useGlobalMiddleware(...handlers: MiddlewareCallback[]): Express.Application
  useGlobalMiddleware(
    path: string,
    ...handlers: MiddlewareCallback[]
  ): Express.Application
  useGlobalMiddleware(
    path: string | MiddlewareCallback,
    ...handlers: MiddlewareCallback[]
  ) {
    return this.app.use(path as MiddlewareCallback, ...handlers)
  }

  listen(port: number, callback?: () => void) {
    return this.app.listen(port, callback)
  }
  getExpressApp() {
    return this.app
  }
  getExpressRouter() {
    return this.router
  }
  getDatabaseConnections() {
    return this.connections
  }

  enableCors(options?: CorsOptions) {
    this.useGlobalMiddleware(cors(options))
  }

  enableBodyParser() {
    this.useGlobalMiddleware(bodyParser.json())
    this.useGlobalMiddleware(bodyParser.urlencoded({ extended: false }))
  }
}
