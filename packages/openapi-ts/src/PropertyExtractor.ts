import { OpenAPIV3 } from 'openapi-types'
import { OpenApiOptionProps } from './types'

import { getSwaggerReferenceDeep, normalizeInterfaceName } from './util'
import { SwaggerParser } from './SwaggerParser'
import { PatchApplier } from './PatchApplier'
import { join, reduce } from 'lodash-es'
import { Model } from './generator/SchemeGenerator'

export class PropertyExtractor {
  #propertyParams: Model[] = []
  constructor(
    private option: OpenApiOptionProps,
    private swagger: SwaggerParser
  ) {
    const schemes = swagger?.getSchemes()

    if (!schemes) {
      return
    }

    for (const [interfaceName, scheme] of Object.entries(schemes)) {
      if (!scheme) {
        console.warn(`no schema: ${interfaceName}`)
        continue
      }

      const schemeName = normalizeInterfaceName(interfaceName)
      const refName = getSwaggerReferenceDeep(scheme)

      if (refName) {
        this.addPropertyParams({
          name: schemeName,
          originName: interfaceName,
          isTypeAlias: true,
          source: this.swagger.schemaToType(scheme),
        })

        continue
      }

      this.addPropertyParams({
        name: schemeName,
        originName: interfaceName,
        isTypeAlias: false,
        source: this.generateSource(
          schemeName,
          scheme as OpenAPIV3.SchemaObject
        ),
      })
    }
  }

  get propertyParams() {
    return this.#propertyParams
  }

  private addPropertyParams(value: Model) {
    this.#propertyParams.push(value)
  }

  private generateSource(schemeName: string, scheme: OpenAPIV3.SchemaObject) {
    const patchApplier = new PatchApplier(this.swagger)

    const patchItem = this.option.patch?.[schemeName]
    return patchItem
      ? new PatchApplier(this.swagger).getSource(
          patchApplier.convertPropertyToTypeProperty(scheme),
          patchItem
        )
      : this.getSource(this.convertPropertyToTypeProperty(scheme))
  }

  private getSource(props: string[]) {
    return join(props, ';')
  }

  private convertPropertyToTypeProperty(scheme: OpenAPIV3.SchemaObject) {
    return reduce(
      scheme.properties,
      (arr, obj, name) => {
        const safeName = /[^\w]/.test(name) ? `'${name}'` : name

        const propName = `${safeName}${
          scheme?.required?.includes(name) ? '' : '?'
        }`

        const propValue = this.swagger?.schemaToType(obj)

        return [...arr, `${propName}:${propValue}`]
      },
      [] as string[]
    )
  }
}
