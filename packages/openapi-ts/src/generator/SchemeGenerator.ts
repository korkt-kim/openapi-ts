import { map } from 'lodash-es'
import path, { dirname } from 'path'
import ejs from 'ejs'
import { OpenApiOptionProps, SourceFile } from '../types'
import { fileURLToPath } from 'url'

import { QueryExtractor } from '../QueryExtractor'
import { PropertyExtractor } from '../PropertyExtractor'

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
  constructor(
    private option: OpenApiOptionProps,
    private queryExtractor: QueryExtractor,
    private propertyExtractor: PropertyExtractor
  ) {}

  private generateQueryParamSchemeModels() {
    return this.queryExtractor.queryParams
  }

  private generatePropertiesSchemeModels() {
    return this.propertyExtractor.propertyParams
  }

  async getCode(): Promise<SourceFile> {
    const { option } = this
    const { moduleName } = option

    const allModels = this.generatePropertiesSchemeModels()

    if (option.extractQueryParams) {
      allModels.push(...this.generateQueryParamSchemeModels())
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
