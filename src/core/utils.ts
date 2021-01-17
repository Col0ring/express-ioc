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

// load  all files of the target directory
export function loadFiles(
  parentPath: string,
  options: {
    include?: RegExp
    exclude?: RegExp
  } = {}
) {
  const { include, exclude } = options
  if (fs.existsSync(parentPath)) {
    const files = fs.readdirSync(parentPath)
    files.forEach((file) => {
      const currentPath = path.resolve(parentPath, file)
      const stat = fs.statSync(currentPath)
      if (stat.isDirectory()) {
        loadFiles(currentPath, options)
      } else {
        if (exclude instanceof RegExp) {
          if (exclude.test(currentPath)) {
            return
          }
        }
        if (include instanceof RegExp) {
          if (include.test(currentPath)) {
            import(currentPath)
          }
        } else {
          import(currentPath)
        }
      }
    })
  }
}
