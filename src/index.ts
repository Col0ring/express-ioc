// alias
import 'module-alias/register'
import { Application } from '@/core'
import { dbConfig } from '@/config/db'
import { accessLogConfig } from '@/config/logs'
import { staticMiddlewate } from './middleware/static.middleware'
import { logMiddleware } from './middleware/log.middleware'
const app = new Application({
  dbConfig
})

app.setGlobalPrefix('/api')
app.enableBodyParser()

app.useGlobalMiddleware(staticMiddlewate('public'))
app.useGlobalMiddleware(logMiddleware(accessLogConfig))

app.listen(3000, () => {
  console.log('listening on http://localhost:3000')
})
