import { OpenApiOptionProps } from '../types'

import { SchemeGenerator } from './SchemeGenerator'
import { SwaggerParser } from '../SwaggerParser'
import { FetchGenerator } from './FetchGenerator'

import { OperationIdHandler } from '../OperationIdHandler'
import path from 'path'
import { writeFileSync } from 'fs'
import { PRESERVE_FILENAME } from '../PreserveHandler'
import { QueryExtractor } from '../QueryExtractor'
import { PropertyExtractor } from '../PropertyExtractor'

export class Generator {
  #queryExtractor: QueryExtractor
  #propertyExtractor: PropertyExtractor

  constructor(
    private option: OpenApiOptionProps,
    private swagger: SwaggerParser,
    private operationIdHandler: OperationIdHandler
  ) {
    this.#queryExtractor = new QueryExtractor(
      this.option,
      this.operationIdHandler,
      this.swagger
    )

    this.#propertyExtractor = new PropertyExtractor(this.option, this.swagger)
  }

  generatePreserve() {
    try {
      writeFileSync(
        path.resolve('./', PRESERVE_FILENAME),
        JSON.stringify(this.operationIdHandler.operationIdMap)
      )
    } catch {
      throw new Error('Failed to write preserve file')
    }
  }

  async generateFetch() {
    if (!this.option) {
      throw new Error('No option')
    }

    if (!this.swagger) {
      throw new Error('No swagger')
    }

    const fetchGenerator = new FetchGenerator(
      this.option,
      this.swagger,
      this.operationIdHandler
    )
    const fetchFile = await fetchGenerator.getCode()

    writeFileSync(
      path.resolve(this.option.output, fetchFile.fileName),
      fetchFile.source
    )
  }

  async generateScheme() {
    if (!this.option) {
      throw new Error('No option')
    }

    if (!this.swagger) {
      throw new Error('No swagger')
    }

    const schemeGenerator = new SchemeGenerator(
      this.option,
      this.#queryExtractor,
      this.#propertyExtractor
    )
    const schemeFile = await schemeGenerator.getCode()

    writeFileSync(
      path.resolve(this.option.output, schemeFile.fileName),
      schemeFile.source
    )
  }
}
