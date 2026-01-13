import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { existsSync, unlinkSync, readFileSync, writeFileSync } from 'fs'
import { PreserveHandler, FILENAME } from '../preserve'

// Mock file system operations
vi.mock('fs')

describe('PreserveHandler', () => {
  let preserveHandler: PreserveHandler
  const mockReadFileSync = vi.mocked(readFileSync)
  const mockWriteFileSync = vi.mocked(writeFileSync)

  beforeEach(() => {
    vi.clearAllMocks()
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

      preserveHandler = new PreserveHandler()

      expect(preserveHandler.data).toEqual({})
    })

    it('should load existing preserve data from file', () => {
      const mockData = {
        'GET:/users': 'getUsersOperation',
        'POST:/users': 'createUserOperation',
      }
      mockReadFileSync.mockReturnValue(JSON.stringify(mockData))

      preserveHandler = new PreserveHandler()

      expect(preserveHandler.data).toEqual(mockData)
      expect(mockReadFileSync).toHaveBeenCalledWith(FILENAME, 'utf8')
    })

    it('should handle invalid JSON in preserve file', () => {
      mockReadFileSync.mockReturnValue('invalid json')

      preserveHandler = new PreserveHandler()

      expect(preserveHandler.data).toEqual({})
    })
  })

  describe('getKey', () => {
    beforeEach(() => {
      mockReadFileSync.mockImplementation(() => {
        throw new Error('File not found')
      })
      preserveHandler = new PreserveHandler()
    })

    it('should generate correct key from path and method', () => {
      const key = preserveHandler.getKey('/users/{id}', 'GET')
      expect(key).toBe('GET:/users/{id}')
    })

    it('should handle empty path', () => {
      const key = preserveHandler.getKey('', 'POST')
      expect(key).toBe('POST:')
    })

    it('should handle special characters in path', () => {
      const key = preserveHandler.getKey('/users/{id}/orders?sort=desc', 'PUT')
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
      preserveHandler = new PreserveHandler()
    })

    it('should return existing operation ID', () => {
      const operationId = preserveHandler.getOperationId('/users', 'GET')
      expect(operationId).toBe('getUsersOperation')
    })

    it('should return undefined for non-existing operation', () => {
      const operationId = preserveHandler.getOperationId('/users/{id}', 'DELETE')
      expect(operationId).toBeUndefined()
    })

    it('should handle case-sensitive methods', () => {
      const operationId = preserveHandler.getOperationId('/users', 'get')
      expect(operationId).toBeUndefined()
    })
  })

  describe('setPreserveData', () => {
    beforeEach(() => {
      mockReadFileSync.mockImplementation(() => {
        throw new Error('File not found')
      })
      preserveHandler = new PreserveHandler()
    })

    it('should set preserve data correctly', () => {
      preserveHandler.setPreserveData('/users', 'GET', 'getUsersAPI')

      expect(preserveHandler.data['GET:/users']).toBe('getUsersAPI')
    })

    it('should overwrite existing data', () => {
      preserveHandler.setPreserveData('/users', 'GET', 'originalOperation')
      preserveHandler.setPreserveData('/users', 'GET', 'updatedOperation')

      expect(preserveHandler.data['GET:/users']).toBe('updatedOperation')
    })

    it('should handle multiple operations', () => {
      preserveHandler.setPreserveData('/users', 'GET', 'getUsersAPI')
      preserveHandler.setPreserveData('/users', 'POST', 'createUserAPI')
      preserveHandler.setPreserveData('/orders', 'GET', 'getOrdersAPI')

      expect(Object.keys(preserveHandler.data)).toHaveLength(3)
      expect(preserveHandler.data['GET:/users']).toBe('getUsersAPI')
      expect(preserveHandler.data['POST:/users']).toBe('createUserAPI')
      expect(preserveHandler.data['GET:/orders']).toBe('getOrdersAPI')
    })
  })

  describe('makePreserveFile', () => {
    beforeEach(() => {
      mockReadFileSync.mockImplementation(() => {
        throw new Error('File not found')
      })
      preserveHandler = new PreserveHandler()
    })

    it('should write preserve data to file', () => {
      preserveHandler.setPreserveData('/users', 'GET', 'getUsersAPI')
      preserveHandler.setPreserveData('/users', 'POST', 'createUserAPI')

      preserveHandler.makePreserveFile()

      expect(mockWriteFileSync).toHaveBeenCalledWith(
        expect.stringMatching(/openapi-ts-preserve\.json$/),
        JSON.stringify({
          'GET:/users': 'getUsersAPI',
          'POST:/users': 'createUserAPI',
        })
      )
    })

    it('should write empty object when no data', () => {
      preserveHandler.makePreserveFile()

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
      preserveHandler = new PreserveHandler()

      const data = preserveHandler.data

      expect(data).toEqual(mockData)
      expect(data).toBe(preserveHandler['_data']) // Direct reference check
    })
  })

  describe('integration scenarios', () => {
    beforeEach(() => {
      mockReadFileSync.mockImplementation(() => {
        throw new Error('File not found')
      })
    })

    it('should handle complete preserve workflow', () => {
      preserveHandler = new PreserveHandler()

      // Add some data
      preserveHandler.setPreserveData('/users', 'GET', 'getUsersAPI')
      preserveHandler.setPreserveData('/users/{id}', 'GET', 'getUserByIdAPI')
      preserveHandler.setPreserveData('/users', 'POST', 'createUserAPI')

      // Save to file
      preserveHandler.makePreserveFile()

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
      expect(preserveHandler.getOperationId('/users', 'GET')).toBe('getUsersAPI')
      expect(preserveHandler.getOperationId('/users/{id}', 'GET')).toBe('getUserByIdAPI')
      expect(preserveHandler.getOperationId('/users', 'POST')).toBe('createUserAPI')
      expect(preserveHandler.getOperationId('/users', 'DELETE')).toBeUndefined()
    })

    it('should handle preserve file reloading scenario', () => {
      // First instance - write data
      preserveHandler = new PreserveHandler()
      preserveHandler.setPreserveData('/users', 'GET', 'getUsersAPI')
      preserveHandler.makePreserveFile()

      // Mock reading the saved data for second instance
      mockReadFileSync.mockReturnValue(
        JSON.stringify({ 'GET:/users': 'getUsersAPI' })
      )

      // Second instance - should load existing data
      const newPreserveHandler = new PreserveHandler()
      expect(newPreserveHandler.getOperationId('/users', 'GET')).toBe('getUsersAPI')
    })
  })
})