import { camelCase, entries, omit, uniqueId } from 'lodash-es'
import { isReservedWord } from './util'
import { SwaggerParser } from './SwaggerParser'
import { HTTP_METHODS } from './consts'

export class OperationIdHandler {
  constructor(
    swagger: SwaggerParser,
    private _operationIdMap: Record<string, string>
  ) {
    for (const [path, _pathObj] of entries(swagger.getDocument().paths)) {
      const pathObj = omit(_pathObj, [
        'parameters',
        '$ref',
        'summary',
        'description',
        'servers',
      ])

      HTTP_METHODS.forEach(method => {
        const operation = pathObj[method]
        if (!operation) {
          return
        }
        const key = this.getKey(path, method)
        this.setOperationIdMap(
          key,
          this.getOperationId(key) ??
            this.makeOperationId(
              key,
              operation.operationId ??
                camelCase(
                  `${method} ${path.replace(/\{\w+\}\/?/g, '').replace(/[^a-zA-Z0-9]+/g, ' ')}`
                )
            )
        )
      })
    }
  }

  private getKey(path: string, method: string) {
    return `${method}:${path}`
  }

  private setOperationIdMap(key: string, operationId: string) {
    this.operationIdMap[key] = operationId
  }

  get operationIdMap() {
    return this._operationIdMap
  }

  getOperationIdByPathAndMethod(path: string, method: string) {
    return this.operationIdMap[this.getKey(path, method)]
  }

  private getOperationId(key: string) {
    return this.operationIdMap[key]
  }

  private makeOperationId(key: string, defaultOperationId: string) {
    if (this.operationIdMap[key]) {
      return this.operationIdMap[key]
    }

    if (
      defaultOperationId &&
      !Object.values(this.operationIdMap).includes(defaultOperationId)
    ) {
      return defaultOperationId
    }

    const originalCandidateId = defaultOperationId

    let prefixNumber = 1

    let newCandidateId = originalCandidateId
    while (Object.values(this.operationIdMap).includes(newCandidateId)) {
      newCandidateId = `${originalCandidateId}${prefixNumber++}`
    }

    if (isReservedWord(newCandidateId)) {
      newCandidateId = camelCase(`${newCandidateId} ${uniqueId('rf')}`)
    }

    return newCandidateId
  }
}
