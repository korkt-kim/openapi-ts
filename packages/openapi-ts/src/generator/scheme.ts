import jsonpatch from 'jsonpatch'
import { join, keys, map, reduce } from 'lodash-es'
import path, { dirname } from 'path'
import ejs from 'ejs'
import { OpenApiOptionProps, SourceFile } from '../types'
import { isSwaggerReference, normalizeInterfaceName } from '../util'
import { SwaggerParser } from '../parser'
import { OpenAPIV3 } from 'openapi-types'
import { fileURLToPath } from 'url'

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
  models: Model[] = []
  option: OpenApiOptionProps
  swagger: SwaggerParser | undefined

  constructor(option: OpenApiOptionProps, swagger: SwaggerParser) {
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

      if (!isSwaggerReference(schema)) {
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

          // optional(?) 필드 표기는 필드명과 required 배열을 가진 현재(상위) 컨텍스트에서만
          // 가능하므로, schemaToType 함수는 인자로 전달 받은 자식 객체의 하위에 있는 required만을
          // 알아서 처리한다.

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
          if (err instanceof (jsonpatch as any).InvalidPatch) {
            throw new Error(`${normalizedName}: ${err}`)
          }

          if (err instanceof (jsonpatch as any).PatchApplyError) {
            throw new Error(`${normalizedName}: ${err}`)
          }
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

    const allModels = [...models]

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
