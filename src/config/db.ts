import path from 'path'
import { DatabaseConfig } from '@/core'
import { __DEV__ } from './env'

export const dbConfig: DatabaseConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'express-ioc',
  entities: [
    path.resolve(__dirname, __DEV__ ? '../**/*.entity.ts' : '../**/*.entity.js')
  ],
  synchronize: true
}
