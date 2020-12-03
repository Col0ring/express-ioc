import { getConnection } from 'typeorm'
import { INJECT_KEY } from '../constants'
import { EntityClassOrSchema } from '../../type'

// Inject Repository
export function InjectRepository(
  entity: EntityClassOrSchema,
  connection?: string
) {
  return function (target: any, key: string, index: number) {
    const metadataValue = Reflect.getMetadata(INJECT_KEY, target) || {}
    // 本质依旧还是 inject
    metadataValue[INJECT_KEY + index] = getConnection(connection).getRepository(
      entity
    )
    Reflect.defineMetadata(INJECT_KEY, metadataValue, target)
  }
}
