import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { existsSync, unlinkSync, readFileSync, writeFileSync } from 'fs'
import { OperationIdMapHandler, FILENAME } from '../operationIdMap'

// Mock file system operations
vi.mock('fs')

describe('OperationIdMapHandler', () => {
  let operationIdMapHandler: OperationIdMapHandler
  const mockReadFileSync = vi.mocked(readFileSync)
  const mockWriteFileSync = vi.mocked(writeFileSync)

  beforeEach(() => {
    vi.clearAllMocks()
    // Reset singleton instance
    OperationIdMapHandler.resetInstance()
  })

  afterEach(() => {
    // Clean up test file if it exists
    if (existsSync(FILENAME)) {
      unlinkSync(FILENAME)
    }
  })

  describe('constructor', () => {
    it('should initialize with empty data when preserve file does not exist', () => {
      mockReadFileSync.mockImplementation(() => {
        throw new Error('File not found')
      })

      operationIdMapHandler = new OperationIdMapHandler(false)

      expect(operationIdMapHandler.data).toEqual({})
    })

    it('should load existing preserve data from file', () => {
      const mockData = {
        'GET:/users': 'getUsersOperation',
        'POST:/users': 'createUserOperation',
      }
      mockReadFileSync.mockReturnValue(JSON.stringify(mockData))

      operationIdMapHandler = new OperationIdMapHandler(true)

      expect(operationIdMapHandler.data).toEqual(mockData)
      expect(mockReadFileSync).toHaveBeenCalledWith(FILENAME, 'utf8')
    })

    it('should handle invalid JSON in preserve file', () => {
      mockReadFileSync.mockReturnValue('invalid json')

      operationIdMapHandler = new OperationIdMapHandler(true)

      expect(operationIdMapHandler.data).toEqual({})
    })
  })

  describe('getKey', () => {
    beforeEach(() => {
      mockReadFileSync.mockImplementation(() => {
        throw new Error('File not found')
      })
      operationIdMapHandler = new OperationIdMapHandler(false)
    })

    it('should generate correct key from path and method', () => {
      const key = operationIdMapHandler.getKey('/users/{id}', 'GET')
      expect(key).toBe('GET:/users/{id}')
    })

    it('should handle empty path', () => {
      const key = operationIdMapHandler.getKey('', 'POST')
      expect(key).toBe('POST:')
    })

    it('should handle special characters in path', () => {
      const key = operationIdMapHandler.getKey('/users/{id}/orders?sort=desc', 'PUT')
      expect(key).toBe('PUT:/users/{id}/orders?sort=desc')
    })
  })

  describe('getOperationId', () => {
    beforeEach(() => {
      const mockData = {
        'GET:/users': 'getUsersOperation',
        'POST:/users': 'createUserOperation',
      }
      mockReadFileSync.mockReturnValue(JSON.stringify(mockData))
      operationIdMapHandler = new OperationIdMapHandler(true)
    })

    it('should return existing operation ID', () => {
      const operationId = operationIdMapHandler.getOperationId('/users', 'GET')
      expect(operationId).toBe('getUsersOperation')
    })

    it('should return undefined for non-existing operation', () => {
      const operationId = operationIdMapHandler.getOperationId('/users/{id}', 'DELETE')
      expect(operationId).toBeUndefined()
    })

    it('should handle case-sensitive methods', () => {
      const operationId = operationIdMapHandler.getOperationId('/users', 'get')
      expect(operationId).toBeUndefined()
    })
  })

  describe('setOperationIdMap', () => {
    beforeEach(() => {
      mockReadFileSync.mockImplementation(() => {
        throw new Error('File not found')
      })
      operationIdMapHandler = new OperationIdMapHandler(false)
    })

    it('should set operation id map correctly', () => {
      operationIdMapHandler.setOperationIdMap('/users', 'GET', 'getUsersAPI')

      expect(operationIdMapHandler.data['GET:/users']).toBe('getUsersAPI')
    })

    it('should overwrite existing data', () => {
      operationIdMapHandler.setOperationIdMap('/users', 'GET', 'originalOperation')
      operationIdMapHandler.setOperationIdMap('/users', 'GET', 'updatedOperation')

      expect(operationIdMapHandler.data['GET:/users']).toBe('updatedOperation')
    })

    it('should handle multiple operations', () => {
      operationIdMapHandler.setOperationIdMap('/users', 'GET', 'getUsersAPI')
      operationIdMapHandler.setOperationIdMap('/users', 'POST', 'createUserAPI')
      operationIdMapHandler.setOperationIdMap('/orders', 'GET', 'getOrdersAPI')

      expect(Object.keys(operationIdMapHandler.data)).toHaveLength(3)
      expect(operationIdMapHandler.data['GET:/users']).toBe('getUsersAPI')
      expect(operationIdMapHandler.data['POST:/users']).toBe('createUserAPI')
      expect(operationIdMapHandler.data['GET:/orders']).toBe('getOrdersAPI')
    })
  })

  describe('makePreserveFile', () => {
    beforeEach(() => {
      mockReadFileSync.mockImplementation(() => {
        throw new Error('File not found')
      })
      operationIdMapHandler = new OperationIdMapHandler(false)
    })

    it('should write preserve data to file', () => {
      operationIdMapHandler.setOperationIdMap('/users', 'GET', 'getUsersAPI')
      operationIdMapHandler.setOperationIdMap('/users', 'POST', 'createUserAPI')

      operationIdMapHandler.makePreserveFile()

      expect(mockWriteFileSync).toHaveBeenCalledWith(
        expect.stringMatching(/openapi-ts-preserve\.json$/),
        JSON.stringify({
          'GET:/users': 'getUsersAPI',
          'POST:/users': 'createUserAPI',
        })
      )
    })

    it('should write empty object when no data', () => {
      operationIdMapHandler.makePreserveFile()

      expect(mockWriteFileSync).toHaveBeenCalledWith(
        expect.stringMatching(/openapi-ts-preserve\.json$/),
        JSON.stringify({})
      )
    })
  })

  describe('data getter', () => {
    it('should return internal data object', () => {
      const mockData = {
        'GET:/users': 'getUsersOperation',
        'POST:/users': 'createUserOperation',
      }
      mockReadFileSync.mockReturnValue(JSON.stringify(mockData))
      operationIdMapHandler = new OperationIdMapHandler(true)

      const data = operationIdMapHandler.data

      expect(data).toEqual(mockData)
    })
  })

  describe('integration scenarios', () => {
    beforeEach(() => {
      mockReadFileSync.mockImplementation(() => {
        throw new Error('File not found')
      })
    })

    it('should handle complete preserve workflow', () => {
      operationIdMapHandler = new OperationIdMapHandler(false)

      // Add some data
      operationIdMapHandler.setOperationIdMap('/users', 'GET', 'getUsersAPI')
      operationIdMapHandler.setOperationIdMap('/users/{id}', 'GET', 'getUserByIdAPI')
      operationIdMapHandler.setOperationIdMap('/users', 'POST', 'createUserAPI')

      // Save to file
      operationIdMapHandler.makePreserveFile()

      // Verify the data was written correctly
      expect(mockWriteFileSync).toHaveBeenCalledWith(
        expect.stringMatching(/openapi-ts-preserve\.json$/),
        JSON.stringify({
          'GET:/users': 'getUsersAPI',
          'GET:/users/{id}': 'getUserByIdAPI',
          'POST:/users': 'createUserAPI',
        })
      )

      // Verify retrieval
      expect(operationIdMapHandler.getOperationId('/users', 'GET')).toBe('getUsersAPI')
      expect(operationIdMapHandler.getOperationId('/users/{id}', 'GET')).toBe('getUserByIdAPI')
      expect(operationIdMapHandler.getOperationId('/users', 'POST')).toBe('createUserAPI')
      expect(operationIdMapHandler.getOperationId('/users', 'DELETE')).toBeUndefined()
    })

    it('should handle preserve file reloading scenario', () => {
      // First instance - write data
      operationIdMapHandler = new OperationIdMapHandler(false)
      operationIdMapHandler.setOperationIdMap('/users', 'GET', 'getUsersAPI')
      operationIdMapHandler.makePreserveFile()

      // Mock reading the saved data for second instance
      mockReadFileSync.mockReturnValue(
        JSON.stringify({ 'GET:/users': 'getUsersAPI' })
      )

      // Reset singleton and create new instance
      OperationIdMapHandler.resetInstance()
      const newOperationIdMapHandler = new OperationIdMapHandler(true)
      expect(newOperationIdMapHandler.getOperationId('/users', 'GET')).toBe('getUsersAPI')
    })
  })
})