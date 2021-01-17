import path from 'path'
import { DatabaseConfig } from '@/core'

export const dbConfig: DatabaseConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'express-ioc',
  entities: [path.resolve(__dirname, '../**/*.entity.ts')],
  synchronize: true
}
