import { describe, it, expect, beforeEach, vi } from 'vitest'
import { FetchGenerator } from '../../generator/fetch'
import { OpenApiOptionProps } from '../../types'
import { SwaggerParser } from '../../parser'
import { OperationIdMapHandler } from '../../operationIdMap'

// Mock ejs
vi.mock('ejs', () => ({
  default: {
    renderFile: vi.fn(),
  },
}))

// Mock OperationIdMapHandler
vi.mock('../../operationIdMap', () => ({
  OperationIdMapHandler: vi.fn().mockImplementation(() => ({
    data: {},
    getOperationId: vi.fn(),
    setOperationIdMap: vi.fn(),
    makePreserveFile: vi.fn(),
    makeOperationId: vi.fn().mockReturnValue('testOperationId'),
  })),
}))

describe('FetchGenerator', () => {
  let generator: FetchGenerator
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
        servers: [{ url: 'https://api.example.com' }],
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
                {
                  name: 'id',
                  in: 'path',
                  required: true,
                  schema: { type: 'string' },
                },
              ],
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
            post: {
              operationId: 'createUser',
              requestBody: {
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/User' },
                  },
                },
              },
              responses: {
                '201': {
                  content: {
                    'application/json': {
                      schema: { $ref: '#/components/schemas/User' },
                    },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: {
            User: {
              type: 'object',
            },
          },
        },
      }),
      getRequestBody: vi.fn().mockReturnValue([
        {
          contentType: 'application/json',
          body: {
            name: 'body',
            required: true,
            type: 'User',
          },
        },
      ]),
      schemaToType: vi.fn().mockImplementation(schema => {
        if (schema.$ref === '#/components/schemas/User') return 'User'
        if (
          schema.type === 'array' &&
          schema.items?.$ref === '#/components/schemas/User'
        )
          return 'User[]'
        if (schema.type === 'string') return 'string'
        if (schema.type === 'integer') return 'number'
        return 'any'
      }),
      extractSchemaFromObj: vi.fn().mockImplementation(obj => {
        if (obj.schema) return obj.schema
        return null
      }),
      getParameterSchema: vi.fn().mockReturnValue({ type: 'string' }),
    } as any

    generator = new FetchGenerator(mockOption, mockParser)
  })

  describe('constructor', () => {
    it('should initialize with option and parser', () => {
      expect(generator.option).toBe(mockOption)
      expect(generator.swagger).toBe(mockParser)
    })
  })

  describe('getCode', () => {
    it('should generate fetch code successfully', async () => {
      const mockGeneratedCode = `
export const getUsersApi = async (params?: { page?: number; [key: string]: any }) => {
  const response = await fetch('/users', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
};

export const createUserApi = async (body: User) => {
  const response = await fetch('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return response.json();
};
      `.trim()

      const {
        default: { renderFile },
      } = await import('ejs')
      ;(renderFile as any).mockResolvedValue(mockGeneratedCode)

      const result = await generator.getCode()

      expect(result.fileName).toBe('fetch.ts')
      expect(result.source).toBe(mockGeneratedCode)
      expect(renderFile).toHaveBeenCalled()
    })

    it('should handle operations without request body', async () => {
      mockParser.getRequestBody = vi.fn().mockReturnValue(null)

      const {
        default: { renderFile },
      } = await import('ejs')
      ;(renderFile as any).mockResolvedValue('mocked code')

      await generator.getCode()

      expect(renderFile).toHaveBeenCalled()
    })

    it('should handle operations without responses', async () => {
      const parserWithoutResponses = {
        ...mockParser,
        getDocument: vi.fn().mockReturnValue({
          openapi: '3.0.0',
          info: { title: 'Test API', version: '1.0.0' },
          servers: [{ url: 'https://api.example.com' }],
          paths: {
            '/users': {
              delete: {
                operationId: 'deleteUser',
                parameters: [
                  {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                  },
                ],
                responses: {
                  '204': {
                    description: 'No content',
                  },
                },
              },
            },
          },
        }),
      }

      const generatorWithoutResponses = new FetchGenerator(
        mockOption,
        parserWithoutResponses as any
      )

      const {
        default: { renderFile },
      } = await import('ejs')
      ;(renderFile as any).mockResolvedValue('mocked code')

      await generatorWithoutResponses.getCode()

      expect(renderFile).toHaveBeenCalled()
    })

    it('should handle multipart/form-data requests', async () => {
      mockParser.getRequestBody = vi.fn().mockReturnValue([
        {
          contentType: 'multipart/form-data',
          body: {
            name: 'form',
            required: true,
            type: 'FormData',
          },
        },
      ])

      const {
        default: { renderFile },
      } = await import('ejs')
      ;(renderFile as any).mockResolvedValue('mocked code with form data')

      await generator.getCode()

      expect(renderFile).toHaveBeenCalled()
    })
  })

  describe('private methods', () => {
    it('should generate correct response type', () => {
      const operation = {
        operationId: 'getUsers',
        parameters: [
          {
            name: 'page',
            in: 'query',
            required: false,
            schema: { type: 'integer' },
          },
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/User' },
          },
        },
      }
      const responseType = (generator as any).getResponseType(operation)

      expect(responseType).toBe('User[]')
    })

    it('should handle operations without success response', () => {
      const operation = {
        responses: {
          '404': {
            description: 'Not found',
          },
        },
      }

      const responseType = (generator as any).getResponseType(operation)

      expect(responseType).toBe('void')
    })
  })

  describe('preserve functionality', () => {
    it('should use preserve feature when enabled', () => {
      const mockOperationIdMapHandler = {
        data: {
          'GET:/users': 'preservedGetUsers',
        },
        getOperationId: vi.fn().mockReturnValue('preservedGetUsers'),
        setOperationIdMap: vi.fn(),
        makePreserveFile: vi.fn(),
        makeOperationId: vi.fn().mockReturnValue('preservedGetUsers'),
      }
      vi.mocked(OperationIdMapHandler).mockImplementation(() => mockOperationIdMapHandler as any)

      const preserveOption = {
        ...mockOption,
        preserve: true,
      }

      new FetchGenerator(preserveOption, mockParser)

      expect(mockOperationIdMapHandler.getOperationId).toHaveBeenCalled()
      expect(mockOperationIdMapHandler.setOperationIdMap).toHaveBeenCalled()
      expect(mockOperationIdMapHandler.makePreserveFile).toHaveBeenCalled()
    })

    it('should not use preserve feature when disabled', () => {
      const mockOperationIdMapHandler = {
        data: {},
        getOperationId: vi.fn(),
        setOperationIdMap: vi.fn(),
        makePreserveFile: vi.fn(),
        makeOperationId: vi.fn().mockReturnValue('testOperationId'),
      }
      vi.mocked(OperationIdMapHandler).mockImplementation(() => mockOperationIdMapHandler as any)

      const nonPreserveOption = {
        ...mockOption,
        preserve: false,
      }

      new FetchGenerator(nonPreserveOption, mockParser)

      // OperationIdMapHandler is still used for operation ID management, but makePreserveFile should not be called
      expect(mockOperationIdMapHandler.getOperationId).toHaveBeenCalled()
      expect(mockOperationIdMapHandler.setOperationIdMap).toHaveBeenCalled()
      expect(mockOperationIdMapHandler.makePreserveFile).not.toHaveBeenCalled()
    })

    it('should handle existing preserved operation IDs', () => {
      const mockOperationIdMapHandler = {
        data: {
          'GET:/users': 'customGetUsersAPI',
          'POST:/users': 'customCreateUserAPI',
        },
        getOperationId: vi.fn()
          .mockReturnValueOnce('customGetUsersAPI')
          .mockReturnValueOnce('customCreateUserAPI'),
        setOperationIdMap: vi.fn(),
        makePreserveFile: vi.fn(),
        makeOperationId: vi.fn().mockReturnValue('customGetUsersAPI'),
      }
      vi.mocked(OperationIdMapHandler).mockImplementation(() => mockOperationIdMapHandler as any)

      const preserveOption = {
        ...mockOption,
        preserve: true,
      }

      new FetchGenerator(preserveOption, mockParser)

      expect(mockOperationIdMapHandler.getOperationId).toHaveBeenCalledWith('/users', 'get')
      expect(mockOperationIdMapHandler.getOperationId).toHaveBeenCalledWith('/users', 'post')

      // Should set the preserved operation IDs
      expect(mockOperationIdMapHandler.setOperationIdMap).toHaveBeenCalledWith('/users', 'get', 'customGetUsersAPI')
      expect(mockOperationIdMapHandler.setOperationIdMap).toHaveBeenCalledWith('/users', 'post', 'customCreateUserAPI')

      expect(mockOperationIdMapHandler.makePreserveFile).toHaveBeenCalled()
    })

    it('should generate new operation IDs when no preserved ID exists', () => {
      const mockOperationIdMapHandler = {
        data: {},
        getOperationId: vi.fn().mockReturnValue(undefined), // No preserved ID
        setOperationIdMap: vi.fn(),
        makePreserveFile: vi.fn(),
        makeOperationId: vi.fn().mockReturnValue('newOperationId'),
      }
      vi.mocked(OperationIdMapHandler).mockImplementation(() => mockOperationIdMapHandler as any)

      const preserveOption = {
        ...mockOption,
        preserve: true,
      }

      new FetchGenerator(preserveOption, mockParser)

      expect(mockOperationIdMapHandler.getOperationId).toHaveBeenCalledWith('/users', 'get')
      expect(mockOperationIdMapHandler.getOperationId).toHaveBeenCalledWith('/users', 'post')

      // Should set new operation IDs since none were preserved
      expect(mockOperationIdMapHandler.setOperationIdMap).toHaveBeenCalled()
      expect(mockOperationIdMapHandler.makePreserveFile).toHaveBeenCalled()
    })

    it('should handle preserve with complex paths', () => {
      const mockOperationIdMapHandler = {
        data: {
          'GET:/users/{id}/orders': 'getUserOrdersAPI',
        },
        getOperationId: vi.fn().mockReturnValue('getUserOrdersAPI'),
        setOperationIdMap: vi.fn(),
        makePreserveFile: vi.fn(),
        makeOperationId: vi.fn().mockReturnValue('getUserOrdersAPI'),
      }
      vi.mocked(OperationIdMapHandler).mockImplementation(() => mockOperationIdMapHandler as any)

      // Mock parser with complex path
      const complexPathParser = {
        ...mockParser,
        getDocument: vi.fn().mockReturnValue({
          openapi: '3.0.0',
          info: { title: 'Test API', version: '1.0.0' },
          servers: [{ url: 'https://api.example.com' }],
          paths: {
            '/users/{id}/orders': {
              get: {
                operationId: 'getUserOrders',
                parameters: [
                  {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                  },
                ],
                responses: {
                  '200': {
                    content: {
                      'application/json': {
                        schema: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/Order' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          components: {
            schemas: {
              Order: {
                type: 'object',
              },
            },
          },
        }),
      }

      const preserveOption = {
        ...mockOption,
        preserve: true,
      }

      new FetchGenerator(preserveOption, complexPathParser as any)

      expect(mockOperationIdMapHandler.getOperationId).toHaveBeenCalledWith('/users/{id}/orders', 'get')
      expect(mockOperationIdMapHandler.setOperationIdMap).toHaveBeenCalledWith('/users/{id}/orders', 'get', 'getUserOrdersAPI')
    })
  })
})
