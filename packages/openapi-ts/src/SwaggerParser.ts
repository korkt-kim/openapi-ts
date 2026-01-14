import { entries, isEmpty, isNil, isPlainObject } from 'lodash-es'
import { OpenAPIV3 } from 'openapi-types'
import { Param } from './types'
import { getNameFromReference, normalizeInterfaceName } from './util'

export type RequestBody = {
  contentType: (typeof SwaggerParser.reqContentTypes)[number]
  body: Param
}

export class SwaggerParser {
  static reqContentTypes = [
    'application/json',
    'application/json-patch+json',
    'application/x-www-form-urlencoded',
    'multipart/form-data',
  ] as const

  constructor(private swagger: OpenAPIV3.Document | null) {}

  extractSchemaFromObj(
    obj: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject
  ) {
    let schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | null = null

    function _extractSchemaFromObj(
      _obj: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject
    ) {
      if (schema) {
        return
      }

      for (const [k, v] of entries(_obj)) {
        if (k === 'schema') {
          schema = v
          return
        } else if (isPlainObject(v)) {
          _extractSchemaFromObj(v)
        }
      }
    }

    _extractSchemaFromObj(obj)

    return schema
  }

  getDocument() {
    if (!this.swagger) {
      throw new Error('Swagger is not loaded')
    }

    return this.swagger
  }

  schemaToType(
    schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
    moduleName?: string
  ): string {
    if (!schema) {
      return 'any'
    }
    // 일반 변수 대입: 좁은 범위의 값을 넓은범위에 대입할 수 있다.
    // 함수 대입: 넓은 범위의 값을 좁은 범위에 대입할 수 있다.

    if ('$ref' in schema) {
      const name = getNameFromReference(schema.$ref)

      if (!name) {
        return 'any'
      }

      return `${
        moduleName ? `${moduleName}.` : ''
      }${normalizeInterfaceName(name)}`
    }

    const { type } = schema

    if (!type) {
      return 'any'
    }

    // file
    if (schema.format === 'binary') {
      return 'File'
    }

    if (
      typeof type === 'string' &&
      ['string', 'number', 'integer'].includes(type)
    ) {
      if (schema.enum) {
        return schema.enum.map(v => `'${v}'`).join(' | ')
      }

      return type === 'string' ? 'string' : 'number'
    }

    if (type === 'object') {
      const { required, properties } = schema

      if (!properties) {
        return 'Record<string, any>'
      }

      const codes: string[] = []

      for (const [k, s] of Object.entries(properties ?? {})) {
        codes.push(
          `${k}${required?.includes(k) ? '' : '?'}: ${this.schemaToType(s, moduleName)}`
        )
      }

      return `{${codes.join(';')}}`
    }

    if (type === 'array') {
      const { items } = schema

      if (isNil(items)) {
        return `Array<any>`
      }

      return `Array<${this.schemaToType(items, moduleName)}>`
    }

    if (type === 'boolean') {
      return 'boolean'
    }

    if (Array.isArray(type) && type.includes('null')) {
      return type.join(' | ')
    }

    return 'any'
  }

  getParameterSchema(parameter: OpenAPIV3.ParameterObject) {
    return parameter.schema
  }

  getRequestBody(operation: OpenAPIV3.OperationObject, moduleName?: string) {
    const requestBody = operation?.requestBody
    if (!requestBody || !('content' in requestBody)) {
      return null
    }

    const content = requestBody.content
    const bodies: RequestBody[] = []

    for (const contentType of SwaggerParser.reqContentTypes) {
      const contentObj = content[contentType]

      if (!contentObj) {
        continue
      }

      switch (contentType) {
        case 'application/json':
        case 'application/json-patch+json':
        case 'application/x-www-form-urlencoded':
          {
            const schema = this.extractSchemaFromObj(contentObj)

            if (!schema) {
              continue
            }

            bodies.push({
              contentType,
              body: {
                name: 'body',
                required: false,
                type: this.schemaToType(schema, moduleName),
              },
            })
          }

          break

        case 'multipart/form-data': {
          bodies.push({
            contentType,
            body: { name: 'form', required: true, type: 'FormData' },
          })
        }
      }
    }

    if (isEmpty(bodies)) {
      return null
    }

    return bodies
  }

  getSchemes(): OpenAPIV3.ComponentsObject['schemas'] {
    return this.swagger?.components?.schemas
  }
}
