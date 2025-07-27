import { writeFileSync } from 'fs'
import { mkdirp } from 'mkdirp'
import path from 'path'

import { CommandOptionProps } from './types'
import { parseOption } from './util'
import { Generator } from './generator'

export const generateApi = (args: CommandOptionProps) => {
  const options = parseOption(args)

  options.forEach(async option => {
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
  })

  //generate scheme

  //generate fetcher

  //make folder

  //   files.forEach(file => {
  //
  //
  //
  //   })
}
