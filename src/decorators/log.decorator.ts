import { Exception } from '@/core'
import { logMiddleware } from '@/middlewares/log.middleware'
import { errorLogConfig } from '@/config/logs'

export const LogException = Exception((err, req, res) => {
  logMiddleware(errorLogConfig)(req, res, () => {})
})
