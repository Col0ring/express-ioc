import path from 'path'
import { addAliases } from 'module-alias'
import { __DEV__ } from './env'

// add alias
addAliases({
  '@': path.resolve(process.cwd(), __DEV__ ? './src' : './dist')
})
