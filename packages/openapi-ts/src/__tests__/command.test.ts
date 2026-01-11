import { describe, it, expect, beforeEach, vi } from 'vitest'
import { generateApi } from '../command'
import { CommandOptionProps } from '../types'

// Mock dependencies
vi.mock('fs', () => ({
  writeFileSync: vi.fn(),
}))

vi.mock('mkdirp', () => ({
  mkdirp: vi.fn(),
}))

vi.mock('path', () => ({
  default: {
    resolve: vi.fn().mockImplementation((...paths) => paths.join('/')),
  },
}))

vi.mock('../util', () => ({
  parseOption: vi.fn(),
}))

vi.mock('../generator', () => ({
  Generator: vi.fn().mockImplementation(() => ({
    fetchSwagger: vi.fn().mockResolvedValue(undefined),
    generateScheme: vi.fn().mockResolvedValue({
      fileName: 'scheme.ts',
      source: 'export interface User {}',
    }),
    generateFetch: vi.fn().mockResolvedValue({
      fileName: 'fetch.ts',
      source: 'export const api = {};',
    }),
  })),
}))

describe('command', () => {
  describe('generateApi', () => {
    let mockArgs: CommandOptionProps

    beforeEach(() => {
      mockArgs = {
        moduleName: 'TestAPI',
        output: './src/api',
        path: 'http://example.com/swagger.json',
      }

      vi.clearAllMocks()
    })

    it('should generate API files successfully', async () => {
      const mockParsedOptions = [
        {
          moduleName: 'TestAPI',
          output: './src/api',
          path: 'http://example.com/swagger.json',
          extractQueryParams: false,
          extractRequestBody: false,
          extractResponseBody: false,
          preserve: false,
        },
      ]

      const { parseOption } = await import('../util')
      ;(parseOption as any).mockReturnValue(mockParsedOptions)

      const { mkdirp } = await import('mkdirp')
      const { writeFileSync } = await import('fs')
      const { Generator } = await import('../generator')

      await generateApi(mockArgs)

      expect(parseOption).toHaveBeenCalledWith(mockArgs)
      expect(mkdirp).toHaveBeenCalledWith('./src/api')
      expect(Generator).toHaveBeenCalledWith(mockParsedOptions[0])

      const generatorInstance = (Generator as any).mock.results[0].value
      expect(generatorInstance.fetchSwagger).toHaveBeenCalled()
      expect(generatorInstance.generateScheme).toHaveBeenCalled()
      expect(generatorInstance.generateFetch).toHaveBeenCalled()

      expect(writeFileSync).toHaveBeenCalledWith(
        './src/api/scheme.ts',
        'export interface User {}'
      )
      expect(writeFileSync).toHaveBeenCalledWith(
        './src/api/fetch.ts',
        'export const api = {};'
      )
    })

    it('should handle multiple options', async () => {
      const mockParsedOptions = [
        {
          moduleName: 'API1',
          output: './src/api1',
          path: 'http://example.com/swagger1.json',
          extractQueryParams: false,
          extractRequestBody: false,
          extractResponseBody: false,
          preserve: false,
        },
        {
          moduleName: 'API2',
          output: './src/api2',
          path: 'http://example.com/swagger2.json',
          extractQueryParams: false,
          extractRequestBody: false,
          extractResponseBody: false,
          preserve: false,
        },
      ]

      const { parseOption } = await import('../util')
      ;(parseOption as any).mockReturnValue(mockParsedOptions)

      const { mkdirp } = await import('mkdirp')
      const { writeFileSync } = await import('fs')
      const { Generator } = await import('../generator')

      await generateApi(mockArgs)

      expect(Generator).toHaveBeenCalledTimes(2)
      expect(mkdirp).toHaveBeenCalledWith('./src/api1')
      expect(mkdirp).toHaveBeenCalledWith('./src/api2')
      expect(writeFileSync).toHaveBeenCalledTimes(4) // 2 files per option
    })

    it('should create output directories', async () => {
      const mockParsedOptions = [
        {
          moduleName: 'TestAPI',
          output: './src/nested/api',
          path: 'http://example.com/swagger.json',
          extractQueryParams: false,
          extractRequestBody: false,
          extractResponseBody: false,
          preserve: false,
        },
      ]

      const { parseOption } = await import('../util')
      ;(parseOption as any).mockReturnValue(mockParsedOptions)

      const { mkdirp } = await import('mkdirp')

      await generateApi(mockArgs)

      expect(mkdirp).toHaveBeenCalledWith('./src/nested/api')
      expect(mkdirp).toHaveBeenCalledTimes(2) // Called twice in the function
    })

    it('should handle generator errors gracefully', async () => {
      const mockParsedOptions = [
        {
          moduleName: 'TestAPI',
          output: './src/api',
          path: 'http://example.com/swagger.json',
          extractQueryParams: false,
          extractRequestBody: false,
          extractResponseBody: false,
          preserve: false,
        },
      ]

      const { parseOption } = await import('../util')
      ;(parseOption as any).mockReturnValue(mockParsedOptions)

      const { Generator } = await import('../generator')
      const mockGenerator = {
        fetchSwagger: vi.fn().mockRejectedValue(new Error('Network error')),
        generateScheme: vi.fn(),
        generateFetch: vi.fn(),
      }
      ;(Generator as any).mockImplementation(() => mockGenerator)

      await expect(generateApi(mockArgs)).rejects.toThrow('Network error')
    })
  })
})
