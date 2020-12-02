import { ConnectionOptions } from 'typeorm'
import path from 'path'

export const dbConfig: ConnectionOptions | ConnectionOptions[] = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'express-ioc',
  entities: [path.resolve(__dirname, '../db/entity/**/*.ts')],
  synchronize: true
}
