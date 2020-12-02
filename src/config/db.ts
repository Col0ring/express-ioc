import { ConnectionOptions } from 'typeorm'
import path from 'path'

const dbConfig: ConnectionOptions | ConnectionOptions[] = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'express-ioc',
  entities: [path.resolve(__dirname, '../db/entity/**/*.ts')],
  synchronize: true
}

export default dbConfig as ConnectionOptions
