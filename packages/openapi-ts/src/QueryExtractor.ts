import { OpenAPIV3 } from 'openapi-types'
import { OperationIdHandler } from './OperationIdHandler'
import { OpenApiOptionProps } from './types'

import { getSwaggerReferenceDeep, normalizeInterfaceName } from './util'
import { SwaggerParser } from './SwaggerParser'
import { PatchApplier } from './PatchApplier'
import { entries, get, isNil, join, omit } from 'lodash-es'
import { HTTP_METHODS } from './consts'
import { Model } from './generator/SchemeGenerator'

type QueryParamsMap = Record<string, Model>

export class QueryExtractor {
  #queryParams: Model[] = []
  constructor(
    private option: OpenApiOptionProps,
    private operationIdHandler: OperationIdHandler,
    private swagger: SwaggerParser
  ) {
    for (const [path, _pathObj] of entries(this.swagger.getDocument().paths)) {
      const pathObj = omit(_pathObj, [
        'parameters',
        '$ref',
        'summary',
        'description',
        'servers',
      ])

      HTTP_METHODS.forEach(method => {
        const operation = pathObj[method]
        if (!operation) {
          return
        }

        const schemeName = normalizeInterfaceName(
          `${this.operationIdHandler.getOperationIdByPathAndMethod(path, method)}Params`
        )
        const opertaionWithQuery = Object.entries(
          omit(_pathObj, [
            'parameters',
            '$ref',
            'summary',
            'description',
            'servers',
          ])
        )
          .map(
            ([method, operation]: [
              method: string,
              operation: OpenAPIV3.OperationObject,
            ]) => ({
              ...operation,
              path,
              method,
              parameters: operation.parameters?.map(param => {
                const refName = getSwaggerReferenceDeep(param)
                if (refName) {
                  const type = refName.split('/')[-1] as string
                  const referencedType = get(
                    this.swagger?.getDocument().components?.parameters,
                    type
                  )

                  if (referencedType) {
                    return referencedType
                  } else {
                    throw new Error(`Type ${type} Not Referencable`)
                  }
                } else {
                  return param
                }
              }),
            })
          )
          .filter((operation: OpenAPIV3.OperationObject) =>
            operation.parameters?.some(param => {
              return 'in' in param && param.in === 'query'
            })
          ) as (Omit<OpenAPIV3.OperationObject, 'parameters'> & {
          path: string
          method: OpenAPIV3.HttpMethods
          parameters: OpenAPIV3.ParameterObject[]
        })[]

        opertaionWithQuery.forEach(operation => {
          const source = this.generateSource(schemeName, operation)

          if (isNil(source)) {
            return
          }

          this.addQueryParams({
            name: schemeName,
            isTypeAlias: false,
            originName: schemeName,
            source,
          })
        })
      })
    }
  }

  get queryParams() {
    return this.#queryParams
  }

  private addQueryParams(value: QueryParamsMap[keyof QueryParamsMap]) {
    this.#queryParams.push(value)
  }

  private generateSource(
    schemeName: string,
    operation: Omit<OpenAPIV3.OperationObject, 'parameters'> & {
      path: string
      method: OpenAPIV3.HttpMethods
      parameters: OpenAPIV3.ParameterObject[]
    }
  ) {
    const queryParams = operation.parameters?.filter(param => {
      return param.in === 'query'
    }) satisfies OpenAPIV3.ParameterObject[]

    if (queryParams.length === 0) {
      return
    }

    const patchItem = this.option.patch?.[schemeName]
    const patchApplier = new PatchApplier(this.swagger)
    return patchItem
      ? patchApplier.getSource(
          patchApplier.convertParameterToTypeProperty(queryParams),
          patchItem
        )
      : this.getSource(this.convertParameterToTypeProperty(queryParams))
  }

  private getSource(props: string[]) {
    return join(props, ';')
  }

  private convertParameterToTypeProperty(
    queryParams: OpenAPIV3.ParameterObject[]
  ) {
    return queryParams.map(param => {
      const safeName = /[^\w]/.test(param.name) ? `'${param.name}'` : param.name
      return `${safeName}${param.required ? '' : '?'}: ${this.swagger.schemaToType(param.schema ?? {})}`
    })
  }
}
