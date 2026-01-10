import {
  camelCase,
  compact,
  entries,
  filter,
  findIndex,
  map,
  omit,
  pullAt,
  slice,
  uniqBy,
  uniqueId,
} from 'lodash-es'
import { OpenAPIV3 } from 'openapi-types'
import { OpenApiOptionProps, Param, SourceFile } from '../types'
import {
  extractArgsFromMethod,
  getNameFromReference,
  isReservedWord,
  isSwaggerReference,
  makeOperationId,
  Method,
  METHODS_WITH_BODY,
  sortParameters,
  swaggerNameToConfigSymbol,
} from '../util'
import { SwaggerParser } from '../parser'
import ejs from 'ejs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { PreserveHandler } from '../preserve'

const HTTP_METHODS: OpenAPIV3.HttpMethods[] = [
  OpenAPIV3.HttpMethods.GET,
  OpenAPIV3.HttpMethods.POST,
  OpenAPIV3.HttpMethods.PUT,
  OpenAPIV3.HttpMethods.DELETE,
  OpenAPIV3.HttpMethods.PATCH,
]

const axiosAwareContentTypes = ['application/json', 'multipart/form-data']

export class FetchGenerator {
  methodsByFiles: Method[] = []

  constructor(
    public option: OpenApiOptionProps,
    public swagger: SwaggerParser
  ) {
    const preserveHandler = new PreserveHandler()
    const { moduleName } = this.option

    const methodsByFiles: Method[] = []

    for (const [path, _pathObj] of entries(this.swagger.getDocument().paths)) {
      const pathObj = omit(_pathObj, [
        'parameters',
        '$ref',
        'summary',
        'description',
        'servers',
      ])

      for (const method of HTTP_METHODS) {
        const operation = pathObj[method]

        if (!operation) {
          continue
        }

        let operationId = operation.operationId ?? makeOperationId(path, method)

        if (isReservedWord(operationId)) {
          operationId = camelCase(`${operationId} ${uniqueId('rf')}`)
        }

        if (option.preserve) {
          operationId =
            preserveHandler.getOperationId(path, method) ?? operationId
          preserveHandler.setPreserveData(path, method, operationId)
          preserveHandler.makePreserveFile()
        }

        const pathParams = this.sortByPathParamSeq(
          path,
          uniqBy(
            [
              ...this.filterParameters(
                operation,
                p => 'in' in p && p.in === 'path'
              ),

              // path 에는 명시되어 있는데. 스키마엔 없는 path parameter 예외처리
              ...this.extractParamsFromPath(path),
            ],
            'name'
          )
        )

        const queryParams = this.filterParameters(
          operation,
          p => 'in' in p && p.in === 'query'
        )
        const requestBody = this.swagger.getRequestBody(operation, moduleName)
        const responseType = this.getResponseType(operation)

        const methodObj: Method = {
          operationId,
          desc: operation.description ?? '',
          path,
          method,
          pathParams,
          queryParams,
          requestBody,
          responseType,
        }

        methodsByFiles.push(methodObj)
      }
    }

    this.methodsByFiles = methodsByFiles
  }

  async getCode(): Promise<SourceFile> {
    const { moduleName } = this.option

    try {
      const __dirname = dirname(fileURLToPath(import.meta.url))
      const templatePath = path.join(__dirname, './templates', 'fetch.ejs')

      const source = await ejs.renderFile(templatePath, {
        defaultRequestConfigSymbol: swaggerNameToConfigSymbol(moduleName),
        moduleName: this.option.moduleName,
        methods: this.methodsByFiles.map(method => {
          const args = extractArgsFromMethod(method, {
            moduleName: this.option.moduleName,
            additionalArgs: ['requestConfig?: AxiosRequestConfig'],
            extractRequestParams: this.option.extractQueryParams,
          })

          const hasRequestBody =
            method.requestBody || METHODS_WITH_BODY.includes(method.method)

          const argsOnlyName = compact([
            ...map(method.pathParams, 'name'),
            hasRequestBody ? 'body' : null,
            'queryParams',
            'requestConfig',
          ])

          const [body, ...others] = method.requestBody ?? []

          if (others.length) {
            console.warn(`Multiple Content-Type: "${method.operationId}"`)
            console.warn(`  Ignored: ${map(others, 'contentType')}`)
          }

          let contentType: string | null = null

          if (
            body?.contentType &&
            !axiosAwareContentTypes.includes(body.contentType)
          ) {
            contentType = body.contentType
          }

          return {
            isGet: method.method === 'get',
            method: method.method,
            desc: method.desc,
            name: method.operationId,
            args,
            argsOnlyName,
            responseType: method.responseType,
            path: method.path.replace(/{/g, '${'),
            hasRequestBody,
            contentType,
          }
        }),
      })

      return { fileName: 'fetch.ts', source }
    } catch (error) {
      console.error('템플릿 렌더링 중 오류 발생:', error)
      throw error
    }
  }

  private filterParameters(
    operation: OpenAPIV3.OperationObject,
    predicate: (
      parameter: OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject
    ) => boolean
  ): Param[] {
    const parameters = operation.parameters?.reduce<
      OpenAPIV3.ParameterObject[]
    >((acc, obj) => {
      if (isSwaggerReference(obj)) {
        return [
          ...acc,
          this.swagger.getDocument().components?.parameters?.[
            getNameFromReference(obj.$ref)
          ] as OpenAPIV3.ParameterObject,
        ]
      }

      return [...acc, obj]
    }, [])

    return sortParameters(filter(parameters, predicate)).map(p => ({
      name: /[^\w]/.test(p.name) ? `'${p.name}'` : p.name,
      required: !!p.required,
      type: this.swagger.schemaToType(
        this.swagger.getParameterSchema(p)!,
        this.option.moduleName
      ),
    }))
  }

  getResponseType(operation: OpenAPIV3.OperationObject): string {
    // 응답이 application/json 이라는 가정이며 타입이 다르면 구현 필요
    const schema = this.swagger.extractSchemaFromObj(operation.responses)

    if (!schema) {
      return 'void'
    }

    return this.swagger.schemaToType(schema, this.option.moduleName)
  }

  private extractParamsFromPath(path: string): Param[] {
    return map([...path.matchAll(/{([^}]+)}/g)], ([, name]) => ({
      name: name ?? 'unknown',
      required: true,
      type: 'string',
    }))
  }

  private sortByPathParamSeq(path: string, list: Param[]): Param[] {
    const sliced = slice(list)
    const result: Param[] = []

    for (const [, name] of [...path.matchAll(/{([^}]+)}/g)]) {
      const idx = findIndex(sliced, ['name', name])

      if (idx < 0) {
        continue
      }

      result.push(...pullAt(sliced, idx))
    }

    return [...result, ...sliced]
  }
}
