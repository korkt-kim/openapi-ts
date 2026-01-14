import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { OpenAPIV3 } from 'openapi-types'
import { camelCase } from 'lodash-es'

export const FILENAME = './openapi-ts-preserve.json'

export class OperationIdMapHandler {
  static #instance: OperationIdMapHandler | null = null
  #data: Record<string, string> = {}
  constructor(preserve?: boolean) {
    if (OperationIdMapHandler.#instance) {
      return OperationIdMapHandler.#instance
    }

    try {
      if (preserve) {
        const content = readFileSync(FILENAME, 'utf8')
        const data = JSON.parse(content)
        this.#data = data
      }
    } catch {
      // do nothing
    }

    OperationIdMapHandler.#instance = this
  }

  getKey(path: string, method: string) {
    return `${method}:${path}`
  }

  getOperationId(path: string, method: string) {
    return this.#data[this.getKey(path, method)]
  }

  getPath(operationId: string) {
    return Object.entries(this.#data)
      .find(([, value]) => {
        return value === operationId
      })?.[0]
      ?.split(':')[1]
  }

  getMethod(operationId: string) {
    return Object.entries(this.#data)
      .find(([, value]) => {
        return value === operationId
      })?.[0]
      ?.split(':')[0] as OpenAPIV3.HttpMethods
  }

  makeOperationId(
    path: string,
    method: OpenAPIV3.HttpMethods,
    defaultOperationId?: string
  ): string {
    if (this.#data[this.getKey(path, method)]) {
      return this.#data[this.getKey(path, method)]!
    }

    if (
      defaultOperationId &&
      !Object.values(this.#data).includes(defaultOperationId)
    ) {
      return defaultOperationId
    }

    path = path.replace(/\{\w+\}\/?/g, '')
    const originalCandidateId =
      defaultOperationId ??
      camelCase(`${method} ${path.replace(/[^a-zA-Z0-9]+/g, ' ')}`)

    let prefixNumber = 1

    let newCandidateId = originalCandidateId
    while (Object.values(this.#data).includes(newCandidateId)) {
      newCandidateId = `${originalCandidateId}${prefixNumber++}`
    }

    return newCandidateId
  }

  setOperationIdMap(path: string, method: string, operationId: string) {
    this.#data[this.getKey(path, method)] = operationId
  }

  makePreserveFile() {
    return writeFileSync(
      path.resolve('./', FILENAME),
      JSON.stringify(this.#data)
    )
  }

  get data() {
    return this.#data
  }

  // For testing purposes only
  static resetInstance() {
    OperationIdMapHandler.#instance = null
  }
}
