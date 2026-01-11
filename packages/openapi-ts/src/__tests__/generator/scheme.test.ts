import { describe, it, expect, beforeEach, vi } from 'vitest'
import { SchemeGenerator } from '../../generator/scheme'
import { OpenApiOptionProps } from '../../types'
import { SwaggerParser } from '../../parser'

// Mock ejs
vi.mock('ejs', () => ({
  default: {
    render: vi.fn().mockReturnValue('<div>mocked template</div>'),
    renderFile: vi.fn().mockResolvedValue('<div>mocked file template</div>'),
    compile: vi.fn().mockReturnValue(() => '<div>compiled template</div>'),
  },
}))

describe('SchemeGenerator', () => {
  let generator: SchemeGenerator
  let mockOption: OpenApiOptionProps
  let mockParser: SwaggerParser

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

    mockParser = {
      getDocument: vi.fn().mockReturnValue({
        openapi: '3.0.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {
          '/users': {
            get: {
              operationId: 'getUsers',
              parameters: [
                {
                  name: 'page',
                  in: 'query',
                  required: false,
                  schema: { type: 'integer' },
                },
              ],
              responses: {},
            },
          },
        },
      }),
      getSchemes: vi.fn().mockReturnValue({
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
          },
          required: ['id'],
        },
      }),
      schemaToType: vi.fn().mockImplementation(schema => {
        if (schema.$ref === '#/components/schemas/User') return 'User'
        if (schema.type === 'string') return 'string'
        if (schema.type === 'integer') return 'number'
        return 'any'
      }),
      generateRequestParamSchemas: vi.fn().mockReturnValue([
        {
          name: 'GetUsersParams',
          originName: 'GetUsersParams',
          isTypeAlias: false,
          source: 'page?: number;[key: string]: any',
        },
      ]),
    } as any

    generator = new SchemeGenerator(mockOption, mockParser)
  })

  describe('constructor', () => {
    it('should initialize with option and parser', () => {
      expect(generator.option).toBe(mockOption)
      expect(generator.swagger).toBe(mockParser)
    })
  })

  describe('getCode', () => {
    it('should generate scheme code successfully', async () => {
      const {
        default: { renderFile },
      } = await import('ejs')
      ;(renderFile as any).mockResolvedValue(
        `
export namespace TestAPI {
  export interface User {
    id: number;
    name?: string;
  }
  export interface GetUsersParams {
    page?: number;
    [key: string]: any;
  }
}
      `.trim()
      )

      const result = await generator.getCode()

      expect(result.fileName).toBe('scheme.ts')
      expect(result.source).toContain('export namespace TestAPI')
      expect(result.source).toContain('export interface User')
      expect(result.source).toContain('export interface GetUsersParams')
    })

    it('should handle request body extraction', async () => {
      const optionWithRequestBody = {
        ...mockOption,
        extractRequestBody: true,
      }

      const parserWithRequestBody = {
        ...mockParser,
        getDocument: vi.fn().mockReturnValue({
          openapi: '3.0.0',
          info: { title: 'Test API', version: '1.0.0' },
          paths: {
            '/users': {
              post: {
                operationId: 'createUser',
                requestBody: {
                  content: {
                    'application/json': {
                      schema: { $ref: '#/components/schemas/User' },
                    },
                  },
                },
                responses: {},
              },
            },
          },
        }),
      }

      const generatorWithRequestBody = new SchemeGenerator(
        optionWithRequestBody,
        parserWithRequestBody as any
      )

      const {
        default: { renderFile },
      } = await import('ejs')
      ;(renderFile as any).mockResolvedValue('mocked template result')

      await generatorWithRequestBody.getCode()

      expect(renderFile).toHaveBeenCalled()
    })

    it('should handle response body extraction', async () => {
      const optionWithResponseBody = {
        ...mockOption,
        extractResponseBody: true,
      }

      const parserWithResponseBody = {
        ...mockParser,
        getDocument: vi.fn().mockReturnValue({
          openapi: '3.0.0',
          info: { title: 'Test API', version: '1.0.0' },
          paths: {
            '/users': {
              get: {
                operationId: 'getUsers',
                responses: {
                  '200': {
                    content: {
                      'application/json': {
                        schema: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/User' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        }),
      }

      const generatorWithResponseBody = new SchemeGenerator(
        optionWithResponseBody,
        parserWithResponseBody as any
      )

      const {
        default: { renderFile },
      } = await import('ejs')
      ;(renderFile as any).mockResolvedValue('mocked template result')

      await generatorWithResponseBody.getCode()

      expect(renderFile).toHaveBeenCalled()
    })

    it('should preserve existing types when preserve option is true', async () => {
      const optionWithPreserve = {
        ...mockOption,
        preserve: true,
      }

      const generatorWithPreserve = new SchemeGenerator(
        optionWithPreserve,
        mockParser
      )

      const {
        default: { renderFile },
      } = await import('ejs')
      ;(renderFile as any).mockResolvedValue(
        'mocked template result with preserved types'
      )

      await generatorWithPreserve.getCode()

      expect(renderFile).toHaveBeenCalled()
    })

    it('should handle missing preserve file gracefully', async () => {
      const optionWithPreserve = {
        ...mockOption,
        preserve: true,
      }

      const generatorWithPreserve = new SchemeGenerator(
        optionWithPreserve,
        mockParser
      )

      const {
        default: { renderFile },
      } = await import('ejs')
      ;(renderFile as any).mockResolvedValue('mocked template result')

      await generatorWithPreserve.getCode()

      expect(renderFile).toHaveBeenCalled()
    })
  })
})
