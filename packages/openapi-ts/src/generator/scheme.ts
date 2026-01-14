import jsonpatch from 'jsonpatch'
import { get, join, keys, map, omit, reduce } from 'lodash-es'
import path, { dirname } from 'path'
import ejs from 'ejs'
import { OpenApiOptionProps, SourceFile } from '../types'
import { getSwaggerReferenceDeep, normalizeInterfaceName } from '../util'
import { SwaggerParser } from '../parser'
import { fileURLToPath } from 'url'
import { OpenAPIV3 } from 'openapi-types'
import { OperationIdMapHandler } from '../operationIdMap'

export interface Model {
  name: string
  originName: string
  source: string
  isTypeAlias: boolean
}

export interface Detail extends Model {
  detail: Record<string, { name: string; required: boolean; type: string }>
}

export class SchemeGenerator {
  private models: Model[] = []

  constructor(
    private option: OpenApiOptionProps,
    private swagger: SwaggerParser
  ) {
    this.option = option
    this.swagger = swagger

    const schemas = swagger?.getSchemes()

    if (!schemas) {
      return
    }

    const patch = this.option.patch

    for (const interfaceName of keys(schemas)) {
      const schema = schemas[interfaceName]

      if (!schema) {
        console.warn(`no schema: ${interfaceName}`)
        continue
      }

      const normalizedName = normalizeInterfaceName(interfaceName)
      const refName = getSwaggerReferenceDeep(schema)
      if (refName) {
        this.models.push({
          name: normalizedName,
          originName: interfaceName,
          isTypeAlias: true,
          source: this.swagger.schemaToType(schema),
        })

        continue
      }

      const patchItem = patch?.[normalizedName]

      const props = reduce(
        (schema as OpenAPIV3.SchemaObject).properties,
        (arr, obj, name) => {
          const safeName = /[^\w]/.test(name) ? `'${name}'` : name

          const propName = `${safeName}${
            (schema as OpenAPIV3.SchemaObject)?.required?.includes(name)
              ? ''
              : '?'
          }`

          const propValue = this.swagger?.schemaToType(obj)

          if (patchItem && propValue) {
            return [...arr, `"${propName}":"${propValue}"`]
          }

          return [...arr, `${propName}:${propValue}`]
        },
        [] as string[]
      )

      let source = ''

      if (patchItem) {
        let doc = JSON.parse(`{${join(props, ',')}}`)
        try {
          doc = jsonpatch.apply_patch(doc, patchItem)
        } catch (err) {
          console.error(err)
          throw err
        }

        source = reduce(
          doc,
          (src, value, name) =>
            `${src && `${src};`}${name}:${decodeURIComponent(value)}`,
          ''
        )
      } else {
        source = join(props, ';')
      }

      this.models.push({
        name: normalizedName,
        originName: interfaceName,
        isTypeAlias: false,
        source,
      })
    }
  }

  async getCode(): Promise<SourceFile> {
    const { models, option } = this
    const { moduleName } = option

    let allModels = [...models]

    if (option.extractQueryParams) {
      const operationsWithQuery = Object.entries(
        this.swagger?.getDocument().paths ?? {}
      ).flatMap(([path, operationWithMethod]) => {
        return Object.entries(
          omit(operationWithMethod, [
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
            ]) => {
              console.log(path, method, operation)
              return {
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
              }
            }
          )
          .filter((operation: OpenAPIV3.OperationObject) =>
            operation.parameters?.some(param => {
              return 'in' in param && param.in === 'query'
            })
          )
      }) as (Omit<OpenAPIV3.OperationObject, 'parameters'> & {
        path: string
        method: OpenAPIV3.HttpMethods
        parameters: OpenAPIV3.ParameterObject[]
      })[]

      const paramSchemas =
        this.swagger?.generateRequestParamSchemas(
          operationsWithQuery,
          new OperationIdMapHandler(option.preserve),
          option.patch
        ) ?? []

      allModels = [...allModels, ...paramSchemas]
    }

    const schemes = map(
      allModels,
      ({ name, originName, isTypeAlias, source }) => {
        const comment =
          name !== originName
            ? `/**
  * 원래 이름: ${originName}
  */
`
            : ''

        return {
          name,
          comment,
          isTypeAlias,
          source,
        }
      }
    )

    try {
      const __dirname = dirname(fileURLToPath(import.meta.url))
      const templatePath = path.join(__dirname, './templates', 'scheme.ejs')

      const source = await ejs.renderFile(templatePath, {
        moduleName,
        schemes,
      })

      return { fileName: 'scheme.ts', source }
    } catch (error) {
      console.error('템플릿 렌더링 중 오류 발생:', error)
      throw error
    }
  }
}
