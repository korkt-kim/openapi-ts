import { readFileSync } from 'fs'
import { OpenAPIV3 } from 'openapi-types'

export const PRESERVE_FILENAME = './openapi-ts-preserve.json'

export class PreserveHandler {
  #preserveData: Record<string, string> = {}
  constructor(preserve?: boolean) {
    try {
      if (preserve) {
        this.#preserveData = JSON.parse(readFileSync(PRESERVE_FILENAME, 'utf8'))
      }
    } catch {
      // do nothing
    }
  }

  getPath(operationId: string) {
    return Object.entries(this.#preserveData)
      .find(([, value]) => value === operationId)?.[0]
      ?.split(':')[1]
  }

  getMethod(operationId: string) {
    return Object.entries(this.#preserveData)
      .find(([, value]) => value === operationId)?.[0]
      ?.split(':')[0] as OpenAPIV3.HttpMethods
  }

  get preserveData() {
    return this.#preserveData
  }
}
