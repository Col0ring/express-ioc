import fs from 'fs'
import path from 'path'
// get Promise result or wrap the normal value
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

// load  all files of the tatget directory
export function loadFiles(parentPath: string) {
  if (fs.existsSync(parentPath)) {
    const files = fs.readdirSync(parentPath)
    files.forEach((file) => {
      const currentPath = path.resolve(parentPath, file)
      const stat = fs.statSync(currentPath)
      if (stat.isDirectory()) {
        loadFiles(currentPath)
      } else {
        import(currentPath)
      }
    })
  }
}
