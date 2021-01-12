import { RequestValueType } from '@/core/type'
import { REQUEST_UPLOADED_FILE_KEY } from '../constants'

export function UploadedFile(name: 'file' | 'files' = 'file') {
  return function (target: any, methodKey: string, index: number) {
    if (methodKey) {
      const metadataValue: RequestValueType[] =
        Reflect.getMetadata(REQUEST_UPLOADED_FILE_KEY, target) || []
      metadataValue.push([index, name])
      Reflect.defineMetadata(
        REQUEST_UPLOADED_FILE_KEY,
        metadataValue,
        target,
        methodKey
      )
    }
  }
}
