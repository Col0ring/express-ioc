// alias
import 'module-alias/register'
import { Application } from '@/core'
import { dbConfig } from '@/config/db'
import { staticMiddlewate } from './middlewares/static.middleware'
const app = new Application({
  dbConfig
})
app.setGlobalPrefix('/api')

app.useGlobalMiddleware(staticMiddlewate('public'))

app.listen(3000, () => {
  console.log('listening on http://localhost:3000')
})
