#!/usr/bin/env node
 
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const args = yargs(hideBin(process.argv))
  .parserConfiguration({
    'camel-case-expansion': false,
    'greedy-arrays': false,
    'short-option-groups': false,
    'unknown-options-as-args': true,
  })
  .command('[input]','Run the opeanapi-ts command', (yargs) => 
    // @TODO: 미정
     yargs.option('not implemented', {
      description: 'Not Implemented',
      type: 'string',
    })
  )
  .demandCommand(1)
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  .version(require('./package.json').version)
  .showHelpOnFail(true).parse()

//
// args(openapiTsCommand)

console.log(args)