import { describe, it, expect, beforeEach } from 'vitest'
import { SwaggerParser } from '../SwaggerParser'
import { OpenAPIV3 } from 'openapi-types'

describe('SwaggerParser', () => {
  let swaggerParser: SwaggerParser
  let mockSwagger: OpenAPIV3.Document

  beforeEach(() => {
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
              isActive: { type: 'boolean' },
              tags: {
                type: 'array',
                items: { type: 'string' }
              }
            },
            required: ['id', 'name']
          },
          Pet: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              status: {
                type: 'string',
                enum: ['available', 'pending', 'sold']
              }
            }
          }
        }
      }
    }
    swaggerParser = new SwaggerParser(mockSwagger)
  })

  describe('constructor', () => {
    it('should initialize with swagger document', () => {
      expect(swaggerParser).toBeDefined()
    })

    it('should initialize with null swagger document', () => {
      const parser = new SwaggerParser(null)
      expect(parser).toBeDefined()
    })
  })

  describe('getDocument', () => {
    it('should return swagger document when loaded', () => {
      const result = swaggerParser.getDocument()
      expect(result).toBe(mockSwagger)
    })

    it('should throw error when swagger is not loaded', () => {
      const parser = new SwaggerParser(null)
      expect(() => parser.getDocument()).toThrow('Swagger is not loaded')
    })
  })

  describe('schemaToType', () => {
    it('should return "any" for null/undefined schema', () => {
      expect(swaggerParser.schemaToType(null as any)).toBe('any')
      expect(swaggerParser.schemaToType(undefined as any)).toBe('any')
    })

    it('should handle reference objects', () => {
      const schema: OpenAPIV3.ReferenceObject = {
        $ref: '#/components/schemas/User'
      }
      expect(swaggerParser.schemaToType(schema)).toBe('User')
    })

    it('should handle reference objects with module name', () => {
      const schema: OpenAPIV3.ReferenceObject = {
        $ref: '#/components/schemas/User'
      }
      expect(swaggerParser.schemaToType(schema, 'TestModule')).toBe('TestModule.User')
    })

    it('should handle invalid reference', () => {
      const schema: OpenAPIV3.ReferenceObject = {
        $ref: 'invalid-ref'
      }
      expect(swaggerParser.schemaToType(schema)).toBe('Invalid_ref')
    })

    it('should handle string types', () => {
      const schema: OpenAPIV3.SchemaObject = { type: 'string' }
      expect(swaggerParser.schemaToType(schema)).toBe('string')
    })

    it('should handle number types', () => {
      const numberSchema: OpenAPIV3.SchemaObject = { type: 'number' }
      const integerSchema: OpenAPIV3.SchemaObject = { type: 'integer' }
      expect(swaggerParser.schemaToType(numberSchema)).toBe('number')
      expect(swaggerParser.schemaToType(integerSchema)).toBe('number')
    })

    it('should handle boolean types', () => {
      const schema: OpenAPIV3.SchemaObject = { type: 'boolean' }
      expect(swaggerParser.schemaToType(schema)).toBe('boolean')
    })

    it('should handle enum types', () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'string',
        enum: ['available', 'pending', 'sold']
      }
      expect(swaggerParser.schemaToType(schema)).toBe("'available' | 'pending' | 'sold'")
    })

    it('should handle binary format as File', () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'string',
        format: 'binary'
      }
      expect(swaggerParser.schemaToType(schema)).toBe('File')
    })

    it('should handle array types', () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'array',
        items: { type: 'string' }
      }
      expect(swaggerParser.schemaToType(schema)).toBe('Array<string>')
    })

    it('should handle array without items', () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'array',
        items: undefined as any
      }
      expect(swaggerParser.schemaToType(schema)).toBe('Array<any>')
    })

    it('should handle object types', () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          email: { type: 'string' }
        },
        required: ['id', 'name']
      }
      const result = swaggerParser.schemaToType(schema)
      expect(result).toBe('{id: number;name: string;email?: string}')
    })

    it('should handle object without properties', () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: 'object'
      }
      expect(swaggerParser.schemaToType(schema)).toBe('Record<string, any>')
    })

    it('should handle union types with null', () => {
      const schema: OpenAPIV3.SchemaObject = {
        type: ['string', 'null']
      } as any
      expect(swaggerParser.schemaToType(schema)).toBe('string | null')
    })

    it('should handle schema without type', () => {
      const schema: OpenAPIV3.SchemaObject = {}
      expect(swaggerParser.schemaToType(schema)).toBe('any')
    })
  })

  describe('extractSchemaFromObj', () => {
    it('should extract schema from object', () => {
      const obj = {
        content: {
          'application/json': {
            schema: { type: 'string' }
          }
        }
      }
      const result = swaggerParser.extractSchemaFromObj(obj as any)
      expect(result).toEqual({ type: 'string' })
    })

    it('should return null when no schema found', () => {
      const obj = {
        content: {
          'application/json': {
            example: 'test'
          }
        }
      }
      const result = swaggerParser.extractSchemaFromObj(obj as any)
      expect(result).toBeNull()
    })

    it('should extract schema from nested object', () => {
      const obj = {
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: { type: 'object' }
              }
            }
          }
        }
      }
      const result = swaggerParser.extractSchemaFromObj(obj as any)
      expect(result).toEqual({ type: 'object' })
    })
  })

  describe('getParameterSchema', () => {
    it('should return parameter schema', () => {
      const parameter: OpenAPIV3.ParameterObject = {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'integer' }
      }
      const result = swaggerParser.getParameterSchema(parameter)
      expect(result).toEqual({ type: 'integer' })
    })
  })

  describe('getRequestBody', () => {
    it('should return null when no request body', () => {
      const operation: OpenAPIV3.OperationObject = {
        responses: {}
      }
      const result = swaggerParser.getRequestBody(operation)
      expect(result).toBeNull()
    })

    it('should return null when request body is reference', () => {
      const operation: OpenAPIV3.OperationObject = {
        responses: {},
        requestBody: {
          $ref: '#/components/requestBodies/UserBody'
        }
      }
      const result = swaggerParser.getRequestBody(operation)
      expect(result).toBeNull()
    })

    it('should handle JSON request body', () => {
      const operation: OpenAPIV3.OperationObject = {
        responses: {},
        requestBody: {
          content: {
            'application/json': {
              schema: { type: 'object' }
            }
          }
        }
      }
      const result = swaggerParser.getRequestBody(operation)
      expect(result).toHaveLength(1)
      expect(result![0]).toEqual({
        contentType: 'application/json',
        body: {
          name: 'body',
          required: false,
          type: 'Record<string, any>'
        }
      })
    })

    it('should handle form data request body', () => {
      const operation: OpenAPIV3.OperationObject = {
        responses: {},
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: { type: 'object' }
            }
          }
        }
      }
      const result = swaggerParser.getRequestBody(operation)
      expect(result).toHaveLength(1)
      expect(result![0]).toEqual({
        contentType: 'multipart/form-data',
        body: {
          name: 'form',
          required: true,
          type: 'FormData'
        }
      })
    })

    it('should handle multiple content types', () => {
      const operation: OpenAPIV3.OperationObject = {
        responses: {},
        requestBody: {
          content: {
            'application/json': {
              schema: { type: 'object' }
            },
            'application/x-www-form-urlencoded': {
              schema: { type: 'object' }
            }
          }
        }
      }
      const result = swaggerParser.getRequestBody(operation)
      expect(result).toHaveLength(2)
    })

    it('should return null when no supported content types', () => {
      const operation: OpenAPIV3.OperationObject = {
        responses: {},
        requestBody: {
          content: {
            'text/plain': {
              schema: { type: 'string' }
            }
          }
        }
      }
      const result = swaggerParser.getRequestBody(operation)
      expect(result).toBeNull()
    })
  })

  describe('getSchemes', () => {
    it('should return schemas from components', () => {
      const result = swaggerParser.getSchemes()
      expect(result).toBe(mockSwagger.components!.schemas)
    })

    it('should return undefined when no components', () => {
      const parser = new SwaggerParser({ ...mockSwagger, components: undefined })
      const result = parser.getSchemes()
      expect(result).toBeUndefined()
    })
  })
})