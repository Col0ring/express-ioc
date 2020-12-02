// alias
import 'module-alias/register'
import { Application } from '@/core'
import dbConfig from '@/config/db'
const app = new Application({
  dbConfig
})

app.setGlobalPrefix('/api')

app.listen(3000, () => {
  console.log('listening on http://localhost:3000')
})
