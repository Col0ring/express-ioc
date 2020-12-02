import express, { RouterOptions, Router } from 'express'
import {
  createConnection,
  ConnectionOptions,
  Connection,
  createConnections
} from 'typeorm'
import path from 'path'
import fs from 'fs'
import { createRouter, setGlobalPrefix } from './decorators'
import { MiddlewareCallback } from './type'

export interface ApplicationOptions extends RouterOptions {
  prefix?: string
  dbConfig?: ConnectionOptions | ConnectionOptions[]
}

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

  private initRouter(options?: RouterOptions & { prefix?: string }) {
    const router = createRouter(options)
    this.useGlobalMiddleware(router)
    return router
  }
  private initControllers() {
    function initControllers(
      parentPath: string = path.resolve(__dirname, '../controllers')
    ) {
      if (fs.existsSync(parentPath)) {
        const files = fs.readdirSync(parentPath)
        files.forEach((file) => {
          const currentPath = path.resolve(parentPath, file)
          const stat = fs.statSync(currentPath)
          if (stat.isDirectory()) {
            initControllers(currentPath)
          } else {
            import(currentPath)
          }
        })
      }
    }
    initControllers()
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

  // function reload
  private async initDatabase(
    dbConfig: ConnectionOptions | ConnectionOptions[]
  ) {
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

  useGlobalMiddleware(middleware: MiddlewareCallback) {
    this.app.use(middleware)
  }

  listen(port: number, callback?: () => void) {
    this.app.listen(port, callback)
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
}
