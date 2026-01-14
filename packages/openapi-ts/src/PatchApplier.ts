import { OpenAPIV3 } from 'openapi-types'
import { JSONPatches } from './types'
import jsonpatch from 'jsonpatch'
import { join, reduce } from 'lodash-es'
import { SwaggerParser } from './SwaggerParser'

export class PatchApplier {
  constructor(private swagger: SwaggerParser) {}

  getSource(props: string[], patchItem: JSONPatches[keyof JSONPatches]) {
    // const props = this.convertParameterToTypeProperty(queryParams)

    let doc = JSON.parse(`{${join(props, ',')}}`)

    try {
      doc = jsonpatch.apply_patch(doc, patchItem)
    } catch (err) {
      console.error(err)
      throw err
    }
    return reduce(
      doc,
      (src, value, name) =>
        `${src && `${src};`}${name}:${decodeURIComponent(value)}`,
      ''
    )
  }

  convertParameterToTypeProperty(queryParams: OpenAPIV3.ParameterObject[]) {
    return queryParams.map(param => {
      const safeName = /[^\w]/.test(param.name) ? `'${param.name}'` : param.name
      return `"${safeName}${param.required ? '' : '?'}": "${encodeURIComponent(this.swagger.schemaToType(param.schema ?? {}))}"`
    })
  }

  convertPropertyToTypeProperty(scheme: OpenAPIV3.SchemaObject) {
    return reduce(
      scheme.properties,
      (arr, obj, name) => {
        const safeName = /[^\w]/.test(name) ? `'${name}'` : name
        const propValue = this.swagger?.schemaToType(obj)
        const propName = `${safeName}${
          scheme?.required?.includes(name) ? '' : '?'
        }`

        return [...arr, `"${propName}":"${propValue}"`]
      },
      [] as string[]
    )
  }
}
