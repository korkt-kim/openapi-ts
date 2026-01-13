import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  parseOption,
  normalizeInterfaceName,
  getNameFromReference,
  fetchWithTimeout,
  camelCase,
  makeOperationId,
  sortParameters,
  swaggerNameToConfigSymbol,
  extractArgsFromMethod,
  getSwaggerReferenceDeep,
} from '../util'
import { CommandOptionProps } from '../types'
import { OpenAPIV3 } from 'openapi-types'

describe('util', () => {
  describe('parseOption', () => {
    it('should parse single string values to arrays', () => {
      const input: CommandOptionProps = {
        moduleName: 'test',
        output: './src',
        path: 'http://example.com/swagger.json',
      }

      const result = parseOption(input)

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        moduleName: 'test',
        output: './src',
        path: 'http://example.com/swagger.json',
        extractQueryParams: false,
        extractRequestBody: false,
        extractResponseBody: false,
        preserve: false,
      })
    })

    it('should handle array inputs correctly', () => {
      const input: CommandOptionProps = {
        moduleName: ['api1', 'api2'],
        output: ['./src/api1', './src/api2'],
        path: [
          'http://example.com/swagger1.json',
          'http://example.com/swagger2.json',
        ],
      }

      const result = parseOption(input)

      expect(result).toHaveLength(2)
      expect(result[0]?.moduleName).toBe('api1')
      expect(result[1]?.moduleName).toBe('api2')
    })

    it('should handle patch type strings', () => {
      const input: CommandOptionProps = {
        moduleName: 'test',
        output: './src',
        path: 'http://example.com/swagger.json',
        patchType: './patch.json',
      }

      expect(() => parseOption(input)).toThrow('Invalid patch')
    })

    it('should throw error when arrays have different lengths', () => {
      const input: CommandOptionProps = {
        moduleName: ['api1', 'api2'],
        output: ['./src/api1'],
        path: ['http://example.com/swagger1.json'],
      }

      expect(() => parseOption(input)).toThrow(
        'All array options must have the same length'
      )
    })
    const input: CommandOptionProps = {
      moduleName: ['api1', 'api2'],
      output: ['./src/api1'],
      path: ['http://example.com/swagger1.json'],
    }

    expect(() => parseOption(input)).toThrow(
      'All array options must have the same length'
    )
  })
})

describe('normalizeInterfaceName', () => {
  it('should capitalize first letter', () => {
    expect(normalizeInterfaceName('user')).toBe('User')
  })

  it('should handle camelCase properly', () => {
    expect(normalizeInterfaceName('userData')).toBe('UserData')
  })

  it('should handle snake_case', () => {
    expect(normalizeInterfaceName('user_data')).toBe('User_data')
  })

  it('should handle kebab-case', () => {
    expect(normalizeInterfaceName('user-data')).toBe('User_data')
  })

  it('should handle mixed cases', () => {
    expect(normalizeInterfaceName('user_data-info')).toBe('User_data_info')
  })

  it('should handle numbers', () => {
    expect(normalizeInterfaceName('user123Data')).toBe('User123Data')
  })
})

describe('getNameFromReference', () => {
  it('should extract name from reference', () => {
    expect(getNameFromReference('#/components/schemas/User')).toBe('User')
  })

  it('should extract name from nested reference', () => {
    expect(getNameFromReference('#/definitions/User')).toBe('User')
  })

  it('should handle references without hash', () => {
    expect(getNameFromReference('components/schemas/User')).toBe(
      'components/schemas/User'
    )
  })
})

describe('fetchWithTimeout', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  it('should fetch successfully', async () => {
    const mockResponse = new Response('{"test": "data"}', {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

    ;(global.fetch as any).mockResolvedValueOnce(mockResponse)

    const result = await fetchWithTimeout('http://example.com/api')

    expect(global.fetch).toHaveBeenCalledWith(
      'http://example.com/api',
      undefined
    )
    expect(result).toBe(mockResponse)
  })

  it('should timeout after specified duration', async () => {
    ;(global.fetch as any).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 2000))
    )

    await expect(
      fetchWithTimeout('http://example.com/api', { timeout: 1000 })
    ).rejects.toThrow('timeout')
  })

  it(
    'should use default timeout',
    async () => {
      ;(global.fetch as any).mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 10000))
      )

      await expect(fetchWithTimeout('http://example.com/api')).rejects.toThrow(
        'timeout'
      )
    },
    { timeout: 10000 }
  )
})

describe('camelCase', () => {
  it('should convert to PascalCase', () => {
    expect(camelCase('user_data')).toBe('UserData')
    expect(camelCase('user-data')).toBe('UserData')
    expect(camelCase('userData')).toBe('UserData')
    expect(camelCase('user data')).toBe('UserData')
  })
})

describe('makeOperationId', () => {
  it('should generate operation ID from path and method', () => {
    const operationId = makeOperationId(
      '/users/{id}',
      OpenAPIV3.HttpMethods.GET
    )
    expect(operationId).toBe('getUsers')
  })

  it('should handle duplicate operation IDs', () => {
    const operationId1 = makeOperationId('/users', OpenAPIV3.HttpMethods.GET)
    const operationId2 = makeOperationId('/users', OpenAPIV3.HttpMethods.GET)
    expect(operationId1).toBe('getUsers1')
    expect(operationId2).toBe('getUsers2')
  })
})

describe('sortParameters', () => {
  it('should sort parameters by optional first, then alphabetically', () => {
    const params = [
      { name: 'optional', required: false },
      { name: 'required', required: true },
      { name: 'another', required: false },
    ]

    const sorted = sortParameters(params)
    expect(sorted[0]?.name).toBe('another')
    expect(sorted[1]?.name).toBe('optional')
    expect(sorted[2]?.name).toBe('required')
  })
})

describe('swaggerNameToConfigSymbol', () => {
  it('should convert swagger name to config symbol', () => {
    expect(swaggerNameToConfigSymbol('User')).toBe('userDefaultRequestConfig')
    expect(swaggerNameToConfigSymbol('default')).toBe('defaultRequestConfig')
  })
})

describe('extractArgsFromMethod', () => {
  it('should extract args without request params extraction', () => {
    const method = {
      operationId: 'getUsers',
      desc: 'Get users',
      path: '/users/{id}',
      method: 'get',
      pathParams: [{ name: 'id', required: true, type: 'string' }],
      queryParams: [{ name: 'page', required: false, type: 'number' }],
      requestBody: null,
      responseType: 'User[]',
    }

    const result = extractArgsFromMethod(method, {
      moduleName: 'API',
      extractRequestParams: false,
    })

    expect(result).toContain('id: string')
    expect(result).toContain('page?: number')
  })

  it('should extract args with request params extraction', () => {
    const method = {
      operationId: 'getUsers',
      desc: 'Get users',
      path: '/users/{id}',
      method: 'get',
      pathParams: [{ name: 'id', required: true, type: 'string' }],
      queryParams: [{ name: 'page', required: false, type: 'number' }],
      requestBody: null,
      responseType: 'User[]',
    }

    const result = extractArgsFromMethod(method, {
      moduleName: 'API',
      extractRequestParams: true,
    })

    expect(result).toContain('id: string')
    expect(result).toContain('queryParams?: API.GetUsersParams')
  })
})
describe('getSwaggerReferenceDeep', () => {
  it('should return $ref from simple object', () => {
    const obj = {
      $ref: '#/components/schemas/User',
    }
    expect(getSwaggerReferenceDeep(obj)).toBe('#/components/schemas/User')
  })

  it('should return $ref from nested array object', () => {
    const obj = {
      type: 'array',
      items: {
        $ref: '#/components/schemas/User',
      },
    }
    expect(getSwaggerReferenceDeep(obj)).toBe('#/components/schemas/User')
  })

  it('should handle deeply nested array objects', () => {
    const obj = {
      type: 'array',
      items: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User',
        },
      },
    }
    expect(getSwaggerReferenceDeep(obj)).toBe('#/components/schemas/User')
  })

  it('should return undefined for object without $ref', () => {
    const obj = {
      type: 'string',
    }
    expect(getSwaggerReferenceDeep(obj)).toBeUndefined()
  })

  it('should return undefined for array without $ref in items', () => {
    const obj = {
      type: 'array',
      items: {
        type: 'string',
      },
    }
    expect(getSwaggerReferenceDeep(obj)).toBeUndefined()
  })

  it('should handle empty object', () => {
    const obj = {}
    expect(getSwaggerReferenceDeep(obj)).toBeUndefined()
  })

  it('should handle null or undefined input', () => {
    // Note: The actual function may not handle null/undefined gracefully
    // This test documents the current behavior
    expect(() => getSwaggerReferenceDeep(null)).toThrow()
    expect(() => getSwaggerReferenceDeep(undefined)).toThrow()
  })

  it('should handle object with type array but no items', () => {
    const obj = {
      type: 'array',
    }
    // When no items property exists, the function will recursively call itself with undefined
    expect(() => getSwaggerReferenceDeep(obj)).toThrow()
  })

  it('should handle array type first, then check $ref', () => {
    const obj = {
      $ref: '#/components/schemas/DirectRef',
      type: 'array',
      items: {
        $ref: '#/components/schemas/NestedRef',
      },
    }
    // The function checks 'type' first, so it will recurse into 'items'
    expect(getSwaggerReferenceDeep(obj)).toBe('#/components/schemas/NestedRef')
  })

  it('should handle complex nested structure with multiple array levels', () => {
    const obj = {
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/DeepRef',
          },
        },
      },
    }
    expect(getSwaggerReferenceDeep(obj)).toBe('#/components/schemas/DeepRef')
  })
})

beforeEach(() => {
  global.fetch = vi.fn()
})
