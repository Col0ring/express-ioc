import { VALIDATOR_KEY } from '../constants'
import { ValidatorParamType } from '../../type'
export function Validator() {
  return function (target: any, methodKey: string, index: number | object) {
    // 获取所有注入的服务
    const providers: any[] =
      Reflect.getMetadata('design:paramtypes', target, methodKey) || []
    if (typeof index === 'object') {
      Reflect.defineMetadata(
        VALIDATOR_KEY,
        providers.map<ValidatorParamType>((provider, index) => {
          return [index, provider]
        }),
        target,
        methodKey
      )
    } else {
      const validatorParams: ValidatorParamType[] =
        Reflect.getMetadata(VALIDATOR_KEY, target, methodKey) || []
      const paramIndex = validatorParams.findIndex(([idx]) => index === idx)
      if (paramIndex !== -1) {
        const newValidatorParams = [...validatorParams]
        newValidatorParams[paramIndex] = [index, providers[index]]
        Reflect.defineMetadata(
          VALIDATOR_KEY,
          [...validatorParams, [index, providers[index]]],
          target,
          methodKey
        )
      } else {
        Reflect.defineMetadata(
          VALIDATOR_KEY,
          [...validatorParams, [index, providers[index]]],
          target,
          methodKey
        )
      }
    }
  }
}
