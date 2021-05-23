// alias
import 'module-alias/register'
import { Application } from '@/core'
import { dbConfig } from '@/config/db'
import { accessLogConfig } from '@/config/logs'
import { staticMiddleware } from './middleware/static.middleware'
import { logMiddleware } from './middleware/log.middleware'
const app = new Application({
  // dbConfig
})

app.enableBodyParser()
app.setGlobalPrefix('/api')
app.useGlobalMiddleware(staticMiddleware('public'))
app.useGlobalMiddleware('/uploads', staticMiddleware('uploads'))
app.useGlobalMiddleware(logMiddleware(accessLogConfig))

// TODO glob
app.initApplication({
  controllerConfig: {
    exclude: /post\.controller\.ts$/i
  }
})
app.listen(3000, () => {
  console.log('listening on http://localhost:3000')
})
