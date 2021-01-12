import { RequestValueType } from '../../type'
import {
  REQUEST_BODY_KEY,
  REQUEST_HEADER_KEY,
  REQUEST_PARAM_KEY,
  REQUEST_UPLOADED_FILE_KEY,
  REQUEST_QUERY_KEY
} from '../constants'

function getRequestPropsDecorator(propKey: string) {
  return function (name?: string) {
    return function (target: any, methodKey: string, index: number) {
      if (methodKey) {
        const metadataValue: RequestValueType[] =
          Reflect.getMetadata(propKey, target) || []
        metadataValue.push([index, name])
        Reflect.defineMetadata(propKey, metadataValue, target, methodKey)
      }
    }
  }
}

export const Body = getRequestPropsDecorator(REQUEST_BODY_KEY)
export const Query = getRequestPropsDecorator(REQUEST_QUERY_KEY)
export const Param = getRequestPropsDecorator(REQUEST_PARAM_KEY)
export const Header = getRequestPropsDecorator(REQUEST_HEADER_KEY)
export const UploadedFile = getRequestPropsDecorator(REQUEST_UPLOADED_FILE_KEY)
