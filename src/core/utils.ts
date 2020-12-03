// 获取异步的错误或数据
export function getPromiseResult(value: any) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value
        .then((res) => {
          resolve(getPromiseResult(res))
        })
        .catch(reject)
    } else {
      resolve(value)
    }
  })
}
