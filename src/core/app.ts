import express, { RouterOptions, Router } from 'express'
import path from 'path'
import fs from 'fs'
import { createRouter } from './decorators'
import { MiddlewareCallback } from './type'

export class Application {
  private app = express()
  private router: Router
  constructor(options?: RouterOptions & { prefix?: string }) {
    this.router = this.initRouter(options)
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
}
