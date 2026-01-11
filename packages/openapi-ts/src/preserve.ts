import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

export const FILENAME = './openapi-ts-preserve.json'

export class PreserveHandler {
  private _data
  constructor() {
    try {
      const content = readFileSync(FILENAME, 'utf8')
      const data = JSON.parse(content)
      this._data = data
    } catch {
      this._data = {}
      return
    }
  }

  getKey(path: string, method: string) {
    return `${method}:${path}`
  }

  getOperationId(path: string, method: string) {
    return this._data[this.getKey(path, method)]
  }

  setPreserveData(path: string, method: string, operationId: string) {
    this._data[this.getKey(path, method)] = operationId
  }

  makePreserveFile() {
    return writeFileSync(
      path.resolve('./', FILENAME),
      JSON.stringify(this._data)
    )
  }

  get data() {
    return this._data
  }
}
