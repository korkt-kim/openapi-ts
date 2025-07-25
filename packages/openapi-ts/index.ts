#!/usr/bin/env node

import yargs, { Argv } from 'yargs'
import { hideBin } from 'yargs/helpers'
import { generateApi } from './src/command'
import { OpenApiTsProps } from './src/types'

const args = (yargs(hideBin(process.argv)) as Argv<OpenApiTsProps>)
  .parserConfiguration({
    'camel-case-expansion': false,
    'greedy-arrays': false,
    'short-option-groups': false,
    'unknown-options-as-args': true,
  })
  .command('$0', 'Run the opeanapi-ts command', yargs =>
    yargs.options({
      path: {
        alias: 'p',
        description: 'path/url to swagger scheme',
        type: 'string',
        demandOption: true,
      },
      output: {
        alias: 'o',
        description: 'output path of typescript api file',
        type: 'string',
        default: './',
      },
      preserve: {
        description: 'preserve the name of the already exported api',
        type: 'boolean',
        default: false,
      },
      'extract-query-params': {
        description:
          'extract request params to data contract (Also combine path params and query params into one object) (default: false)',
        type: 'boolean',
        default: false,
      },
      'extract-request-body': {
        description:
          'extract request body type to data contract (default: false)',
        type: 'boolean',
        default: false,
      },
      'extract-response-body': {
        description:
          'extract response body type to data contract (default: false)',
        type: 'boolean',
        default: false,
      },
      'patch-type': {
        description: 'fix the type of extracted type (default: [])',
        type: 'array',
        default: [],
      },
      module: {
        description: 'generate separated as module (default: none)',
        type: 'string',
        default: 'none',
      },
    })
  )
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  .version(require('./package.json').version)
  .showHelpOnFail(true)
  .parseSync()

generateApi(args)
