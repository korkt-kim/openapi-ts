import {
  camelCase as _camelCase,
  compact,
  isArray,
  map,
  some,
  trim,
  upperFirst,
} from 'lodash-es'
import { CommandOptionProps, JSONPatches, OpenApiOptionProps } from './types'
import { OpenAPIV3 } from 'openapi-types'
import { RequestBody } from './parser'
import { readFileSync } from 'fs'
import { parse } from 'yaml'

export function fetchWithTimeout<T = any>(
  paths: RequestInfo,
  init?: RequestInit & { timeout: number }
): Promise<T> {
  return Promise.race<any>([
    fetch(paths, init),
    new Promise((_resolve, reject) =>
      setTimeout(() => reject(new Error('timeout')), init?.timeout || 5000)
    ),
  ])
}

export function camelCase(str: string): string {
  str = _camelCase(str)

  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

const hasSinglePath = (
  args: CommandOptionProps
): args is Omit<
  CommandOptionProps,
  'path' | 'output' | 'moduleName' | 'patchType'
> & {
  path: string
  output: string
  moduleName: string
  patchType?: string
} => {
  return !isArray(args.path)
}

const hasMultiPath = (
  args: CommandOptionProps
): args is Omit<
  CommandOptionProps,
  'path' | 'output' | 'moduleName' | 'patchType'
> & {
  path: string[]
  output: string[]
  moduleName: string[]
  patchType?: string[]
} => {
  return isArray(args.path)
}

export function parseOption(args: CommandOptionProps): OpenApiOptionProps[] {
  if (hasSinglePath(args)) {
    return [
      {
        path: args.path,
        output: args.output,
        moduleName: args.moduleName,
        patch: args.patchType
          ? getJSONPatches([args.patchType], args.moduleName)
          : undefined,
        extractQueryParams: args.extractQueryParams ?? false,
        extractRequestBody: args.extractRequestBody ?? false,
        extractResponseBody: args.extractResponseBody ?? false,
        preserve: args.preserve ?? false,
      },
    ]
  }

  if (hasMultiPath(args)) {
    if (
      args.path.length !== args.output.length ||
      args.path.length !== args.moduleName.length
    ) {
      throw new Error('All array options must have the same length')
    }

    return args.path.map((path, index) => {
      return {
        path,
        output: args.output[index] as string,
        moduleName: args.moduleName[index] as string,
        patch: isArray(args.patchType)
          ? getJSONPatches(args.patchType, args.moduleName[index] as string)
          : undefined,
        extractQueryParams: args.extractQueryParams,
        extractRequestBody: args.extractRequestBody,
        extractResponseBody: args.extractResponseBody,
        preserve: args.preserve,
      }
    })
  }

  throw new Error('Invalid option')
}

export function normalizeInterfaceName(name: string): string {
  return upperFirst(name.replace(/[^a-zA-Z0-9]/g, '_'))
}

export function getSwaggerReferenceDeep(obj: any): string | undefined {
  if ('type' in obj && obj.type === 'array') {
    return getSwaggerReferenceDeep(obj.items)
  }

  return '$ref' in obj ? obj.$ref : undefined
}

const RESERVED_WORDS = [
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'null',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'let',
  'yield',
  'await',
]

export function isReservedWord(str: string) {
  return RESERVED_WORDS.includes(trim(str))
}

const operationIdSet = new Set<string>()

export function makeOperationId(
  path: string,
  method: OpenAPIV3.HttpMethods
): string {
  path = path.replace(/\{\w+\}\/?/g, '')
  let candidateId = _camelCase(
    `${method} ${path.replace(/[^a-zA-Z0-9]+/g, ' ')}`
  )

  let prefixNumber = 2

  while (operationIdSet.has(candidateId)) {
    candidateId = `${candidateId}${prefixNumber++}`
  }

  operationIdSet.add(candidateId)

  return candidateId
}

export function sortParameters<T = any>(parameters: T[]): T[] {
  return [...parameters].sort((a: any, b: any) => {
    const aRequired = a.required ? 1 : 0
    const bRequired = b.required ? 1 : 0

    if (aRequired > bRequired) {
      return 1
    } else if (aRequired < bRequired) {
      return -1
    } else {
      return a.name.localeCompare(b.name)
    }
  })
}

export function getNameFromReference(refStr: string): string {
  return refStr.replace(
    /^#\/(?:definitions|components\/schemas|parameters)\//,
    ''
  )
}

export function swaggerNameToConfigSymbol(swaggerName: string): string {
  if (swaggerName === 'default') {
    return 'defaultRequestConfig'
  }

  const output = camelCase(`${swaggerName} defaultRequestConfig`)

  return output.charAt(0).toLowerCase() + output.slice(1)
}

export const METHODS_WITH_BODY = ['post', 'put', 'patch']

export interface Param {
  name: string
  required?: boolean
  type: string
}

export interface Method {
  operationId: string
  desc: string
  path: string
  method: string
  pathParams: Param[]
  queryParams: Param[]
  requestBody: RequestBody[] | null
  responseType: string
}

export function extractArgsFromMethod(
  method: Method,
  options: {
    moduleName: string
    additionalArgs?: string[]
    extractRequestParams?: boolean
  }
): string {
  if (options?.extractRequestParams) {
    // Generate schema type name using the operationId
    const schemaTypeName = normalizeInterfaceName(`${method.operationId}Params`)

    const hasPathParams = method.pathParams.length > 0
    const hasQueryParams = method.queryParams.length > 0

    const allQueryParamsOptional =
      hasQueryParams && method.queryParams.every(param => !param.required)
    const isQueryParamsOptional = hasQueryParams && allQueryParamsOptional

    let bodyCode = ''
    if (method.requestBody) {
      bodyCode = `body: ${map(method.requestBody, ({ body }) => body.type).join(' | ')}`
    } else if (METHODS_WITH_BODY.includes(method.method)) {
      bodyCode = 'body?: any'
    }

    let pathCode = ''
    if (hasPathParams) {
      pathCode = method.pathParams
        .map(pathParam => `${pathParam.name}: ${pathParam.type}`)
        .join(', ')
    }

    // Generate combined parameter code with schema type reference
    let queryParamsCode = ''

    if (hasQueryParams) {
      queryParamsCode = `queryParams${isQueryParamsOptional ? '?' : ''}: ${options.moduleName}.${schemaTypeName}`
    } else {
      queryParamsCode = `queryParams?: any`
    }

    return compact([
      bodyCode,
      pathCode,
      queryParamsCode,
      ...(options?.additionalArgs ?? []),
    ]).join(',')
  }

  const pathParamCode = method.pathParams
    .map(p => `${p.name}${p.required ? '' : '?'}: ${p.type}`)
    .join(',')

  let bodyCode = ''

  if (method.requestBody) {
    bodyCode = `body: ${method.requestBody
      .map(({ body }) => body.type)
      .join(' | ')}`
  } else if (METHODS_WITH_BODY.includes(method.method)) {
    bodyCode = 'body?: any'
  }

  let queryParamCode = ''

  if (method.queryParams.length) {
    const codes = method.queryParams.map(
      q => `${q.name}${q.required ? '' : '?'}: ${q.type}`
    )

    if (codes.length) {
      queryParamCode = `queryParams${
        some(method.queryParams, ['required', true]) ? '' : '?'
      }: {${codes.join(';')} ${codes.length ? ';' : ''} [key: string]: any}`
    }
  } else {
    queryParamCode = 'queryParams?: { [key: string]: any }'
  }

  return compact([
    pathParamCode,
    bodyCode,
    queryParamCode,
    ...(options?.additionalArgs ?? []),
  ]).join(',')
}

function getJSONPatches(patchType: string[], moduleName: string): JSONPatches {
  const output = patchType
    .map(str => {
      const [name, path] = str.split(':')
      if (!name || !path) {
        throw new Error('Invalid patch')
      }
      const content = readFileSync(path, 'utf8')
      const data = /\.ya?ml$/g.test(path) ? parse(content) : JSON.parse(content)

      return { name, data } as { name: string; data: JSONPatches }
    })
    .find(item => item.name === moduleName)

  return output?.data ?? {}
}
