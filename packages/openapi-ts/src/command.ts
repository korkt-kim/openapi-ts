import { Argv } from 'yargs'
import { OpenApiTsProps } from './types'

export const generateApi = (
  args: ReturnType<Argv<OpenApiTsProps>['parseSync']>
) => {
  console.log(args)
  console.log(args.path)
}
