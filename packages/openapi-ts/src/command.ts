import { mkdirp } from 'mkdirp'
import path from 'path'

import { CommandOptionProps } from './types'
import { fetchSwagger, parseOption } from './util'
import { Generator } from './generator/Generator'
import { SwaggerParser } from './SwaggerParser'
import { PreserveHandler } from './PreserveHandler'
import { OperationIdHandler } from './OperationIdHandler'

export const generateApi = (args: CommandOptionProps) => {
  const promiseRet: boolean[] = []
  return new Promise((resolve, reject) => {
    const options = parseOption(args)
    options.forEach(async (option, index) => {
      try {
        mkdirp(path.resolve(option.output))

        const swagger = await fetchSwagger(option.path)
        const swaggerParser = new SwaggerParser(swagger)
        const preserveHandler = new PreserveHandler(option.preserve)
        const operationIdHandler = new OperationIdHandler(
          swaggerParser,
          preserveHandler.preserveData
        )

        const generator = new Generator(
          option,
          swaggerParser,
          operationIdHandler
        )

        mkdirp(path.resolve(option.output))

        await Promise.all([
          generator.generateScheme(),
          generator.generateFetch(),
          generator.generatePreserve(),
        ])

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
