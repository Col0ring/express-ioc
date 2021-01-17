import {
  PipeItem,
  PipeTransform,
  RequestValueType,
  TargetParamFunction
} from '../../type'
import {
  REQUEST_BODY_KEY,
  REQUEST_HEADER_KEY,
  REQUEST_PARAM_KEY,
  REQUEST_UPLOADED_FILE_KEY,
  REQUEST_QUERY_KEY
} from '../constants'
import { Pipe } from '../common/Pipe'

function getRequestPropsDecorator<T extends string>(propKey: string) {
  function requestPropsDecorator(
    name?: T,
    ...pipes: PipeTransform[]
  ): TargetParamFunction
  function requestPropsDecorator(...pipes: PipeTransform[]): TargetParamFunction
  function requestPropsDecorator(
    name?: T | PipeTransform,
    ...pipes: PipeTransform[]
  ): TargetParamFunction {
    return function (target: any, methodKey: string, index: number) {
      if (methodKey) {
        const metadataValue: RequestValueType[] =
          Reflect.getMetadata(propKey, target, methodKey) || []
        if (typeof name === 'string') {
          Pipe(...pipes)(target, methodKey, index)
          metadataValue.push([index, name])
        } else {
          if (name) {
            Pipe(name, ...pipes)(target, methodKey, index)
          }
          metadataValue.push([index, undefined])
        }
        Reflect.defineMetadata(propKey, metadataValue, target, methodKey)
      }
    }
  }
  return requestPropsDecorator
}

export const Body = getRequestPropsDecorator(REQUEST_BODY_KEY)
export const Query = getRequestPropsDecorator(REQUEST_QUERY_KEY)
export const Param = getRequestPropsDecorator(REQUEST_PARAM_KEY)
export const Header = getRequestPropsDecorator(REQUEST_HEADER_KEY)
export const UploadedFile = getRequestPropsDecorator<'file' | 'files'>(
  REQUEST_UPLOADED_FILE_KEY
)
