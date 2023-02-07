import color from './default/color.json'
import elevation from './default/elevation.json'
import fontWeight from './default/font-weight.json'
import opacity from './default/opacity.json'
import scale from './default/scale.json'
import css from './css.json'
import { FileSystem } from '../file-system'

import type { Config } from '../config'

const defaults = [
  ...color,
  ...elevation,
  ...fontWeight,
  ...opacity,
  ...scale,
]

export const getTokens = (dir: string | undefined, config: Config) => {
  return dir ? getUserTokens(dir) : defaults
} 

const getUserTokens = (dir) => {
  const tokens = []
  FileSystem.walkDir(dir, (filepath, _stats) => {
    tokens.push(...require(`${process.cwd()}/${filepath}`))
  })

  return tokens
}