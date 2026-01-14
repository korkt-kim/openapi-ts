import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PreserveHandler, PRESERVE_FILENAME } from '../PreserveHandler'

// Mock fs
vi.mock('fs', () => ({
  readFileSync: vi.fn(),
}))

describe('PreserveHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('constructor with preserve disabled', () => {
    it('should initialize with empty preserveData when preserve is false', () => {
      const handler = new PreserveHandler(false)
      expect(handler.preserveData).toEqual({})
    })

    it('should initialize with empty preserveData when preserve is undefined', () => {
      const handler = new PreserveHandler()
      expect(handler.preserveData).toEqual({})
    })
  })

  describe('constructor with preserve enabled', () => {
    it('should load preserve data when file exists', async () => {
      const mockPreserveData = {
        'get:/users/{id}': 'getUserById',
        'post:/users/{id}': 'updateUser'
      }

      const { readFileSync } = await import('fs')
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockPreserveData) as any)

      const handler = new PreserveHandler(true)
      expect(handler.preserveData).toEqual(mockPreserveData)
      expect(readFileSync).toHaveBeenCalledWith(PRESERVE_FILENAME, 'utf8')
    })

    it('should initialize with empty data when file read fails', async () => {
      const { readFileSync } = await import('fs')
      vi.mocked(readFileSync).mockImplementation(() => {
        throw new Error('File not found')
      })

      const handler = new PreserveHandler(true)
      expect(handler.preserveData).toEqual({})
    })

    it('should handle JSON parsing error gracefully', async () => {
      const { readFileSync } = await import('fs')
      vi.mocked(readFileSync).mockReturnValue('invalid json' as any)

      const handler = new PreserveHandler(true)
      expect(handler.preserveData).toEqual({})
    })
  })

  describe('getPath', () => {
    it('should return path for existing operation ID', async () => {
      const mockPreserveData = {
        'get:/users/{id}': 'getUserById',
        'post:/users': 'createUser'
      }

      const { readFileSync } = await import('fs')
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockPreserveData) as any)

      const handler = new PreserveHandler(true)
      const result = handler.getPath('getUserById')
      expect(result).toBe('/users/{id}')
    })

    it('should return undefined when operation ID does not exist', async () => {
      const mockPreserveData = {
        'get:/users/{id}': 'getUserById'
      }

      const { readFileSync } = await import('fs')
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockPreserveData) as any)

      const handler = new PreserveHandler(true)
      const result = handler.getPath('nonExistent')
      expect(result).toBeUndefined()
    })
  })

  describe('getMethod', () => {
    it('should return HTTP method for existing operation ID', async () => {
      const mockPreserveData = {
        'get:/users/{id}': 'getUserById',
        'post:/users': 'createUser'
      }

      const { readFileSync } = await import('fs')
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockPreserveData) as any)

      const handler = new PreserveHandler(true)
      const result = handler.getMethod('getUserById')
      expect(result).toBe('get')
    })

    it('should return undefined when operation ID does not exist', async () => {
      const mockPreserveData = {
        'get:/users/{id}': 'getUserById'
      }

      const { readFileSync } = await import('fs')
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockPreserveData) as any)

      const handler = new PreserveHandler(true)
      const result = handler.getMethod('nonExistent')
      expect(result).toBeUndefined()
    })
  })

  describe('preserveData getter', () => {
    it('should return the internal preserve data', async () => {
      const mockPreserveData = {
        'get:/users/{id}': 'getUserById',
        'post:/users': 'createUser'
      }

      const { readFileSync } = await import('fs')
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockPreserveData) as any)

      const handler = new PreserveHandler(true)
      expect(handler.preserveData).toEqual(mockPreserveData)
    })
  })
})