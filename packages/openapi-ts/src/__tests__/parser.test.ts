import { describe, it, expect, beforeEach, vi } from 'vitest'
import { SwaggerParser } from '../parser'
import { OpenAPIV3 } from 'openapi-types'
import { OperationIdMapHandler } from '../operationIdMap'

describe('SwaggerParser', () => {
  let parser: SwaggerParser
  let mockSwagger: OpenAPIV3.Document

  beforeEach(() => {
    // Reset singleton instance before each test
    OperationIdMapHandler.resetInstance()

    mockSwagger = {
      openapi: '3.0.0',
      info: {
        title: 'Test API',
        version: '1.0.0',
      },
      paths: {},
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' },
              email: { type: 'string' },
            },
            required: ['id', 'name'],
          },
          UserList: {
            type: 'array',
            items: { $ref: '#/components/schemas/User' },
          },
        },
      },
    }

    parser = new SwaggerParser(mockSwagger)
  })

  describe('getDocument', () => {
    it('should return swagger document', () => {
      expect(parser.getDocument()).toBe(mockSwagger)
    })

    it('should throw error when swagger is not loaded', () => {
      const emptyParser = new SwaggerParser(null as any)
      expect(() => emptyParser.getDocument()).toThrow('Swagger is not loaded')
    })
  })

  describe('schemaToType', () => {
    it('should convert string type', () => {
      const schema: OpenAPIV3.SchemaObject = { type: 'string' }
      expect(parser.schemaToType(schema)).toBe('string')
    })

    it('should convert number type', () => {
      const schema: OpenAPIV3.SchemaObject = { type: 'number' }
      expect(parser.schemaToType(schema)).toBe('number')
    })

    it('should convert integer type', () => {
      const schema: OpenAPIV3.SchemaObject = { type: 'integer' }
      expect(parser.schemaToType(schema)).toBe('number')
    })

    it('should convert boolean type', () => {
      const schema: OpenAPIV3.SchemaObject = { type: 'boolean' }
      expect(parser.schemaToType(schema)).toBe('boolean')
    })

    it('should convert enum to union type', () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'string',
        enum: ['active', 'inactive', 'pending'],
      }
      expect(parser.schemaToType(schema)).toBe(
        "'active' | 'inactive' | 'pending'"
      )
    })

    it('should convert array type', () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'array',
        items: { type: 'string' },
      }
      expect(parser.schemaToType(schema)).toBe('Array<string>')
    })

    it('should convert object type', () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          email: { type: 'string' },
        },
        required: ['id', 'name'],
      }
      const result = parser.schemaToType(schema)
      expect(result).toBe('{id: number;name: string;email?: string}')
    })

    it('should convert reference type', () => {
      const schema: OpenAPIV3.ReferenceObject = {
        $ref: '#/components/schemas/User',
      }
      expect(parser.schemaToType(schema)).toBe('User')
    })

    it('should convert reference type with module name', () => {
      const schema: OpenAPIV3.ReferenceObject = {
        $ref: '#/components/schemas/User',
      }
      expect(parser.schemaToType(schema, 'API')).toBe('API.User')
    })

    it('should handle binary format as File', () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'string',
        format: 'binary',
      }
      expect(parser.schemaToType(schema)).toBe('File')
    })

    it('should return any for unknown type', () => {
      const schema: OpenAPIV3.SchemaObject = {}
      expect(parser.schemaToType(schema)).toBe('any')
    })

    it('should handle object without properties', () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'object',
      }
      expect(parser.schemaToType(schema)).toBe('Record<string, any>')
    })

    it('should handle array without items', () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'array',
        items: {
          additionalProperties: true,
        },
      }
      expect(parser.schemaToType(schema)).toBe('Array<any>')
    })
  })

  describe('extractSchemaFromObj', () => {
    it('should extract schema from nested object', () => {
      const obj = {
        content: {
          'application/json': {
            schema: { type: 'string' },
          },
        },
      }
      const result = parser.extractSchemaFromObj(obj as any)
      expect(result).toEqual({ type: 'string' })
    })

    it('should return null when no schema found', () => {
      const obj = {
        content: {
          'application/json': {
            example: 'test',
          },
        },
      }
      const result = parser.extractSchemaFromObj(obj as any)
      expect(result).toBeNull()
    })
  })

  describe('getRequestBody', () => {
    it('should extract JSON request body', () => {
      const operation: OpenAPIV3.OperationObject = {
        responses: {},
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { name: { type: 'string' } },
              },
            },
          },
        },
      }

      const result = parser.getRequestBody(operation)
      expect(result).toHaveLength(1)
      expect(result![0]?.contentType).toBe('application/json')
      expect(result![0]?.body.name).toBe('body')
      expect(result![0]?.body.type).toBe('{name?: string}')
    })

    it('should extract form data request body', () => {
      const operation: OpenAPIV3.OperationObject = {
        responses: {},
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: { type: 'object' },
            },
          },
        },
      }

      const result = parser.getRequestBody(operation)
      expect(result).toHaveLength(1)
      expect(result![0]?.contentType).toBe('multipart/form-data')
      expect(result![0]?.body.name).toBe('form')
      expect(result![0]?.body.type).toBe('FormData')
    })

    it('should return null when no request body', () => {
      const operation: OpenAPIV3.OperationObject = {
        responses: {},
      }

      const result = parser.getRequestBody(operation)
      expect(result).toBeNull()
    })

    it('should return null when request body is reference', () => {
      const operation: OpenAPIV3.OperationObject = {
        responses: {},
        requestBody: {
          $ref: '#/components/requestBodies/UserBody',
        },
      }

      const result = parser.getRequestBody(operation)
      expect(result).toBeNull()
    })
  })

  describe('getSchemes', () => {
    it('should return schemas from components', () => {
      const result = parser.getSchemes()
      expect(result).toBe(mockSwagger.components?.schemas)
    })

    it('should return undefined when no components', () => {
      const swaggerWithoutComponents = { ...mockSwagger }
      delete swaggerWithoutComponents.components
      const parserWithoutComponents = new SwaggerParser(
        swaggerWithoutComponents
      )
      expect(parserWithoutComponents.getSchemes()).toBeUndefined()
    })
  })

  describe('generateRequestParamSchemas', () => {
    it('should generate request param schemas', () => {
      const operations = [
        {
          operationId: 'getUsers',
          path: '/users',
          method: OpenAPIV3.HttpMethods.GET,
          responses: {},
          parameters: [
            {
              name: 'page',
              in: 'query' as const,
              required: false,
              schema: { type: 'integer' as const },
            },
            {
              name: 'limit',
              in: 'query' as const,
              required: true,
              schema: { type: 'integer' as const },
            },
          ],
        },
      ]

      const operationIdMapHandler = new OperationIdMapHandler(false)
      operationIdMapHandler.setOperationIdMap('/users', 'GET', 'getUsers')
      // Ensure the getOperationId returns the correct value
      vi.spyOn(operationIdMapHandler, 'getOperationId').mockReturnValue('getUsers')

      const result = parser.generateRequestParamSchemas(
        operations,
        operationIdMapHandler
      )
      expect(result).toHaveLength(1)
      expect(result[0]?.name).toBe('GetUsersParams')
      expect(result[0]?.source).toContain('page?: number')
      expect(result[0]?.source).toContain('limit: number')
      expect(result[0]?.source).toContain('[key: string]: any')
    })

    it('should skip operations without query parameters', () => {
      const operations = [
        {
          operationId: 'getUsers',
          path: '/users/{id}',
          method: OpenAPIV3.HttpMethods.GET,
          responses: {},
          parameters: [
            {
              name: 'id',
              in: 'path' as const,
              required: true,
              schema: { type: 'integer' as const },
            },
          ],
        },
      ]

      const operationIdMapHandler = new OperationIdMapHandler(false)
      const result = parser.generateRequestParamSchemas(
        operations,
        operationIdMapHandler
      )
      expect(result).toHaveLength(0)
    })

    it('should handle parameters with special characters in name', () => {
      const operations = [
        {
          operationId: 'getUsers',
          path: '/users',
          method: OpenAPIV3.HttpMethods.GET,
          responses: {},
          parameters: [
            {
              name: 'filter[name]',
              in: 'query' as const,
              required: false,
              schema: { type: 'string' as const },
            },
          ],
        },
      ]

      const operationIdMapHandler = new OperationIdMapHandler(false)
      operationIdMapHandler.setOperationIdMap('/users', 'GET', 'getUsers')
      // Ensure the getOperationId returns the correct value
      vi.spyOn(operationIdMapHandler, 'getOperationId').mockReturnValue('getUsers')

      const result = parser.generateRequestParamSchemas(
        operations,
        operationIdMapHandler
      )
      expect(result[0]?.source).toContain("'filter[name]'?: string")
    })

    it('should handle missing operationId gracefully', () => {
      const operations = [
        {
          path: '/users',
          method: OpenAPIV3.HttpMethods.GET,
          responses: {},
          parameters: [
            {
              name: 'page',
              in: 'query' as const,
              required: false,
              schema: { type: 'integer' as const },
            },
          ],
        },
      ]

      const operationIdMapHandler = new OperationIdMapHandler(false)
      // Mock getOperationId to return undefined for missing operationId
      vi.spyOn(operationIdMapHandler, 'getOperationId').mockReturnValue(undefined)

      const result = parser.generateRequestParamSchemas(
        operations as any,
        operationIdMapHandler
      )

      // Should still work but with undefined-based name
      expect(result).toHaveLength(1)
      expect(result[0]?.name).toBe('UndefinedParams')
    })
  })
})
