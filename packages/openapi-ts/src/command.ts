import { writeFileSync } from 'fs'
import { mkdirp } from 'mkdirp'
import path from 'path'

import { CommandOptionProps } from './types'
import { parseOption } from './util'
import { Generator } from './generator'

export const generateApi = (args: CommandOptionProps) => {
  const promiseRet: boolean[] = []
  return new Promise((resolve, reject) => {
    const options = parseOption(args)
    options.forEach(async (option, index) => {
      try {
        mkdirp(path.resolve(option.output))
        const generator = new Generator(option)
        await generator.fetchSwagger()
        const schemeFile = await generator.generateScheme()
        const fetchFile = await generator.generateFetch()

        mkdirp(path.resolve(option.output))
        writeFileSync(
          path.resolve(option.output, schemeFile.fileName),
          schemeFile.source
        )
        writeFileSync(
          path.resolve(option.output, fetchFile.fileName),
          fetchFile.source
        )

        promiseRet[index] = true
        if (promiseRet.every(item => item === true)) {
          resolve(undefined)
        }
      } catch (error) {
        reject(new Error(error))
      }
    })
  })
}
