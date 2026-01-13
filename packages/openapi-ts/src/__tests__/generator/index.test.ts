import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Generator } from '../../generator'
import { OpenApiOptionProps } from '../../types'
import { OpenAPIV3, OpenAPIV2 } from 'openapi-types'

// Mock dependencies

vi.mock('../../util', async importOriginal => {
  const actual = await importOriginal()

  return {
    ...(actual as any),
    fetchWithTimeout: vi.fn(),
  }
})

vi.mock('swagger2openapi', () => ({
  default: {
    convertObj: vi.fn(),
  },
}))

vi.mock('../../parser', () => ({
  SwaggerParser: vi.fn().mockImplementation(() => ({
    getDocument: vi.fn(),
  })),
}))

vi.mock('./scheme', () => ({
  SchemeGenerator: vi.fn().mockImplementation(() => ({
    getCode: vi.fn().mockReturnValue({
      fileName: 'scheme.ts',
      source: 'export interface User {}',
    }),
  })),
}))

vi.mock('./fetch', () => ({
  FetchGenerator: vi.fn().mockImplementation(() => ({
    getCode: vi.fn().mockReturnValue({
      fileName: 'fetch.ts',
      source: 'export const api = {};',
    }),
  })),
}))

describe('Generator', () => {
  let generator: Generator
  let mockOption: OpenApiOptionProps

  beforeEach(() => {
    mockOption = {
      moduleName: 'TestAPI',
      output: './src/api',
      path: 'http://example.com/swagger.json',
      extractQueryParams: false,
      extractRequestBody: false,
      extractResponseBody: false,
      preserve: false,
    }

    generator = new Generator(mockOption)
  })

  describe('constructor', () => {
    it('should initialize with option', () => {
      expect(generator.option).toBe(mockOption)
      expect(generator.swagger).toBeUndefined()
    })
  })

  describe('fetchSwagger', () => {
    it('should fetch and parse OpenAPI v3 document', async () => {
      const mockSwagger: OpenAPIV3.Document = {
        openapi: '3.0.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {},
      }

      const mockResponse = {
        json: vi.fn().mockResolvedValue(mockSwagger),
      }

      const { fetchWithTimeout } = await import('../../util')
      ;(fetchWithTimeout as any).mockResolvedValue(mockResponse)

      const { SwaggerParser } = await import('../../parser')

      await generator.fetchSwagger()

      expect(fetchWithTimeout).toHaveBeenCalledWith(
        'http://example.com/swagger.json'
      )
      expect(SwaggerParser).toHaveBeenCalledWith(mockSwagger)
      expect(generator.swagger).toBeDefined()
    })

    it('should convert Swagger v2 to OpenAPI v3', async () => {
      const mockSwaggerV2: OpenAPIV2.Document = {
        swagger: '2.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {},
      }

      const mockConvertedSwagger: OpenAPIV3.Document = {
        openapi: '3.0.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {},
      }

      const mockResponse = {
        json: vi.fn().mockResolvedValue(mockSwaggerV2),
      }

      const { fetchWithTimeout } = await import('../../util')
      ;(fetchWithTimeout as any).mockResolvedValue(mockResponse)

      const converter = await import('swagger2openapi')
      ;(converter.default.convertObj as any).mockImplementation(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        (_swagger: unknown, _option: unknown, callback: Function) => {
          callback(null, { openapi: mockConvertedSwagger })
        }
      )

      const { SwaggerParser } = await import('../../parser')

      await generator.fetchSwagger()

      expect(converter.default.convertObj).toHaveBeenCalledWith(
        mockSwaggerV2,
        {},
        expect.any(Function)
      )
      expect(SwaggerParser).toHaveBeenCalledWith(mockConvertedSwagger)
    })

    it('should throw error when no swagger document', async () => {
      const mockResponse = {
        json: vi.fn().mockResolvedValue(null),
      }

      const { fetchWithTimeout } = await import('../../util')
      ;(fetchWithTimeout as any).mockResolvedValue(mockResponse)

      await expect(generator.fetchSwagger()).rejects.toThrow('No Swagger')
    })
  })

  describe('generateFetch', () => {
    beforeEach(() => {
      mockOption = {
        moduleName: 'TestAPI',
        output: './src/api',
        path: 'http://example.com/swagger.json',
        extractQueryParams: false,
        extractRequestBody: false,
        extractResponseBody: false,
        preserve: false,
      }

      generator = new Generator(mockOption)
    })

    it('should generate fetch code', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const getUserSpy = vi
        .spyOn(generator, 'generateFetch')
        .mockResolvedValue({
          fileName: 'fetch.ts',
          source: 'export const api = {};',
        })

      const result = await generator.generateFetch()

      expect(result).toEqual({
        fileName: 'fetch.ts',
        source: 'export const api = {};',
      })
    })

    it('should throw error when no option', () => {
      generator.option = null as any

      expect(() => generator.generateFetch()).toThrow('No option')
    })

    it('should throw error when no swagger', () => {
      generator.swagger = undefined

      expect(() => generator.generateFetch()).toThrow('No swagger')
    })
  })

  describe('generateScheme', () => {
    beforeEach(() => {
      generator.swagger = {
        getDocument: vi.fn(),
      } as any
    })

    it('should generate scheme code', async () => {
      vi.spyOn(generator, 'generateScheme').mockResolvedValue({
        fileName: 'scheme.ts',
        source: 'export interface User {}',
      })
      const result = await generator.generateScheme()

      expect(result).toEqual({
        fileName: 'scheme.ts',
        source: 'export interface User {}',
      })
    })

    it('should throw error when no option', () => {
      generator.option = null as any

      expect(() => generator.generateScheme()).toThrow('No option')
    })

    it('should throw error when no swagger', () => {
      generator.swagger = undefined

      expect(() => generator.generateScheme()).toThrow('No swagger')
    })
  })
})
