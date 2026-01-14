import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FetchGenerator } from '../../generator/FetchGenerator'
import { SwaggerParser } from '../../SwaggerParser'
import { OperationIdHandler } from '../../OperationIdHandler'
import { OpenAPIV3 } from 'openapi-types'
import { OpenApiOptionProps } from '../../types'

// Mock ejs
vi.mock('ejs', () => ({
  renderFile: vi.fn(),
}))

// Mock path and url modules
vi.mock('path', () => ({
  join: vi.fn((...args) => args.join('/')),
  dirname: vi.fn(() => '/mock/dir'),
}))

vi.mock('url', () => ({
  fileURLToPath: vi.fn(() => '/mock/path'),
}))

describe('FetchGenerator', () => {
  let mockSwaggerParser: SwaggerParser
  let mockOperationIdHandler: OperationIdHandler
  let mockOption: OpenApiOptionProps
  let mockDocument: OpenAPIV3.Document

  beforeEach(() => {
    vi.clearAllMocks()

    mockDocument = {
      openapi: '3.0.0',
      info: {
        title: 'Test API',
        version: '1.0.0',
      },
      paths: {
        '/users/{id}': {
          get: {
            operationId: 'getUser',
            description: 'Get user by ID',
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'string' },
              },
              {
                name: 'include',
                in: 'query',
                required: false,
                schema: { type: 'string' },
              },
            ],
            responses: {
              '200': {
                description: 'User found',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
            },
          },
          post: {
            operationId: 'updateUser',
            description: 'Update user',
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'string' },
              },
            ],
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'User updated',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
            },
          },
        },
        '/users': {
          get: {
            operationId: 'getUsers',
            description: 'Get all users',
            parameters: [
              {
                name: 'limit',
                in: 'query',
                required: false,
                schema: { type: 'integer' },
              },
            ],
            responses: {
              '200': {
                description: 'Users found',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/User',
                      },
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
          User: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
            },
            required: ['id', 'name'],
          },
        },
      },
    }

    mockOption = {
      moduleName: 'TestApi',
      output: './output',
      path: 'test-swagger.json',
      extractQueryParams: false,
    }

    mockSwaggerParser = {
      getDocument: vi.fn(() => mockDocument),
      schemaToType: vi.fn((schema, moduleName) => {
        if (typeof schema === 'object' && '$ref' in schema) {
          const name = schema.$ref.split('/').pop()
          return moduleName ? `${moduleName}.${name}` : name || 'any'
        }
        if (typeof schema === 'object' && schema.type === 'array') {
          return 'Array<TestApi.User>'
        }
        return 'any'
      }),
      getParameterSchema: vi.fn(param => param.schema),
      getRequestBody: vi.fn(operation => {
        // Only return request body for operations that should have one (like POST)
        if (operation.requestBody) {
          return [
            {
              contentType: 'application/json' as const,
              body: {
                name: 'body',
                required: false,
                type: 'TestApi.User',
              },
            },
          ]
        }
        return null
      }),
      extractSchemaFromObj: vi.fn(() => ({
        $ref: '#/components/schemas/User',
      })),
    } as any

    mockOperationIdHandler = {
      getOperationIdByPathAndMethod: vi.fn((path, method) => {
        if (path === '/users/{id}' && method === 'get') return 'getUser'
        if (path === '/users/{id}' && method === 'post') return 'updateUser'
        if (path === '/users' && method === 'get') return 'getUsers'
        return undefined
      }),
    } as any
  })

  describe('constructor', () => {
    it('should initialize with correct methods', () => {
      const generator = new FetchGenerator(
        mockOption,
        mockSwaggerParser,
        mockOperationIdHandler
      )

      expect(generator.methodsByFiles).toHaveLength(3)
      expect(generator.methodsByFiles[0]).toMatchObject({
        operationId: 'getUser',
        path: '/users/{id}',
        method: 'get',
        desc: 'Get user by ID',
      })
    })

    it('should filter out operations without operationId', () => {
      mockOperationIdHandler.getOperationIdByPathAndMethod = vi.fn(
        () => undefined
      )

      const generator = new FetchGenerator(
        mockOption,
        mockSwaggerParser,
        mockOperationIdHandler
      )

      expect(generator.methodsByFiles).toHaveLength(0)
    })

    it('should sort path parameters correctly', () => {
      const generator = new FetchGenerator(
        mockOption,
        mockSwaggerParser,
        mockOperationIdHandler
      )

      const getUserMethod = generator.methodsByFiles.find(
        m => m.operationId === 'getUser'
      )
      expect(getUserMethod).toBeDefined()
      expect(getUserMethod!.pathParams).toHaveLength(1)
      expect(getUserMethod!.pathParams[0]!.name).toBe('id')
    })

    it('should extract query parameters', () => {
      const generator = new FetchGenerator(
        mockOption,
        mockSwaggerParser,
        mockOperationIdHandler
      )

      const getUserMethod = generator.methodsByFiles.find(
        m => m.operationId === 'getUser'
      )
      expect(getUserMethod).toBeDefined()
      expect(getUserMethod!.queryParams).toHaveLength(1)
      expect(getUserMethod!.queryParams[0]!.name).toBe('include')
    })

    it('should handle request body', () => {
      const generator = new FetchGenerator(
        mockOption,
        mockSwaggerParser,
        mockOperationIdHandler
      )

      const updateUserMethod = generator.methodsByFiles.find(
        m => m.operationId === 'updateUser'
      )
      expect(updateUserMethod).toBeDefined()
      expect(updateUserMethod!.requestBody).toHaveLength(1)
      expect(updateUserMethod!.requestBody?.[0]!.contentType).toBe(
        'application/json'
      )
    })
  })

  describe('getCode', () => {
    it('should generate fetch code successfully', async () => {
      const mockEjs = await import('ejs')
      const mockRenderFile = vi.mocked(mockEjs.renderFile)
      mockRenderFile.mockResolvedValue('// Generated fetch code')

      const generator = new FetchGenerator(
        mockOption,
        mockSwaggerParser,
        mockOperationIdHandler
      )
      const result = await generator.getCode()

      expect(result).toEqual({
        fileName: 'fetch.ts',
        source: '// Generated fetch code',
      })
      expect(mockRenderFile).toHaveBeenCalledWith(
        expect.stringContaining('fetch.ejs'),
        expect.objectContaining({
          moduleName: 'TestApi',
          methods: expect.any(Array),
        })
      )
    })

    it('should handle template rendering error', async () => {
      const mockEjs = await import('ejs')
      const mockRenderFile = vi.mocked(mockEjs.renderFile)
      const error = new Error('Template error')
      mockRenderFile.mockRejectedValue(error)

      const generator = new FetchGenerator(
        mockOption,
        mockSwaggerParser,
        mockOperationIdHandler
      )

      await expect(generator.getCode()).rejects.toThrow('Template error')
    })

    it('should process methods correctly for template', async () => {
      const mockEjs = await import('ejs')
      const mockRenderFile = vi.mocked(mockEjs.renderFile)
      mockRenderFile.mockResolvedValue('// Generated code')

      const generator = new FetchGenerator(
        mockOption,
        mockSwaggerParser,
        mockOperationIdHandler
      )
      await generator.getCode()

      const templateData = mockRenderFile.mock.calls[0]?.[1]
      expect(templateData).toBeDefined()
      expect(templateData!.methods).toHaveLength(3)

      const getUserMethod = templateData!.methods.find(
        (m: any) => m.name === 'getUser'
      )
      expect(getUserMethod).toMatchObject({
        isGet: true,
        method: 'get',
        name: 'getUser',
        desc: 'Get user by ID',
        path: '/users/${id}',
        hasRequestBody: false,
      })

      const updateUserMethod = templateData!.methods.find(
        (m: any) => m.name === 'updateUser'
      )
      expect(updateUserMethod).toMatchObject({
        isGet: false,
        method: 'post',
        name: 'updateUser',
      })
      // hasRequestBody should be truthy (either boolean true or the request body array)
      expect(updateUserMethod.hasRequestBody).toBeTruthy()
    })
  })

  describe('getResponseType', () => {
    it('should extract response type from operation', () => {
      const generator = new FetchGenerator(
        mockOption,
        mockSwaggerParser,
        mockOperationIdHandler
      )
      const pathItem = mockDocument.paths['/users/{id}']
      if (!pathItem?.get) {
        throw new Error('Test setup error: operation not found')
      }
      const operation = pathItem.get

      const responseType = generator.getResponseType(operation)
      expect(responseType).toBe('TestApi.User')
    })

    it('should return void when no response schema', () => {
      mockSwaggerParser.extractSchemaFromObj = vi.fn(() => null)

      const generator = new FetchGenerator(
        mockOption,
        mockSwaggerParser,
        mockOperationIdHandler
      )
      const pathItem = mockDocument.paths['/users/{id}']
      if (!pathItem?.get) {
        throw new Error('Test setup error: operation not found')
      }
      const operation = pathItem.get

      const responseType = generator.getResponseType(operation)
      expect(responseType).toBe('void')
    })
  })
})
