import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

export const FILENAME = './openapi-ts-preserve.json'

export class PreserveHandler {
  private data
  constructor() {
    try {
      const content = readFileSync(FILENAME, 'utf8')
      const data = JSON.parse(content)
      this.data = data
    } catch {
      this.data = {}
      return
    }
  }

  getKey(path: string, method: string) {
    return `${method}:${path}`
  }

  getOperationId(path: string, method: string) {
    return this.data[this.getKey(path, method)]
  }

  setPreserveData(path: string, method: string, operationId: string) {
    this.data[this.getKey(path, method)] = operationId
  }

  makePreserveFile() {
    return writeFileSync(
      path.resolve('./', FILENAME),
      JSON.stringify(this.data)
    )
  }
}
