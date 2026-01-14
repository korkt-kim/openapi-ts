import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generateApi } from '../command'
import * as util from '../util'
import { SwaggerParser } from '../SwaggerParser'
import { Generator } from '../generator/Generator'
import { PreserveHandler } from '../PreserveHandler'
import { OperationIdHandler } from '../OperationIdHandler'

// Mock dependencies
vi.mock('mkdirp')
vi.mock('../util')
vi.mock('../SwaggerParser')
vi.mock('../generator/Generator')
vi.mock('../PreserveHandler')
vi.mock('../OperationIdHandler')

const mockUtil = vi.mocked(util)
const MockSwaggerParser = vi.mocked(SwaggerParser)
const MockGenerator = vi.mocked(Generator)
const MockPreserveHandler = vi.mocked(PreserveHandler)
const MockOperationIdHandler = vi.mocked(OperationIdHandler)

describe('command', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateApi', () => {
    it('should generate API successfully with single option', async () => {
      // Arrange
      const mockArgs = {
        path: 'test-swagger.json',
        output: './output',
        moduleName: 'TestModule',
      }

      const mockOptions = [{
        path: 'test-swagger.json',
        output: './output',
        moduleName: 'TestModule',
      }]

      const mockSwagger = {
        openapi: '3.0.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {}
      }
      const mockSwaggerParser = {
        getDocument: vi.fn().mockReturnValue(mockSwagger),
      }
      const mockPreserveHandler = {
        preserveData: {},
      }
      const mockOperationIdHandler = {
        getOperationIdByPathAndMethod: vi.fn(),
      }
      const mockGenerator = {
        generateScheme: vi.fn().mockResolvedValue(undefined),
        generateFetch: vi.fn().mockResolvedValue(undefined),
        generatePreserve: vi.fn().mockResolvedValue(undefined),
      }

      mockUtil.parseOption.mockReturnValue(mockOptions)
      mockUtil.fetchSwagger.mockResolvedValue(mockSwagger)
      MockSwaggerParser.mockReturnValue(mockSwaggerParser as any)
      MockPreserveHandler.mockReturnValue(mockPreserveHandler as any)
      MockOperationIdHandler.mockReturnValue(mockOperationIdHandler as any)
      MockGenerator.mockReturnValue(mockGenerator as any)

      // Act
      await generateApi(mockArgs)

      // Assert
      expect(mockUtil.parseOption).toHaveBeenCalledWith(mockArgs)
      expect(mockUtil.fetchSwagger).toHaveBeenCalledWith('test-swagger.json')
      expect(MockSwaggerParser).toHaveBeenCalledWith(mockSwagger)
      expect(MockPreserveHandler).toHaveBeenCalledWith(undefined)
      expect(MockOperationIdHandler).toHaveBeenCalledWith(mockSwaggerParser, {})
      expect(MockGenerator).toHaveBeenCalledWith(
        mockOptions[0],
        mockSwaggerParser,
        mockOperationIdHandler
      )
      expect(mockGenerator.generateScheme).toHaveBeenCalled()
      expect(mockGenerator.generateFetch).toHaveBeenCalled()
      expect(mockGenerator.generatePreserve).toHaveBeenCalled()
    })

    it('should handle multiple options', async () => {
      // Arrange
      const mockArgs = {
        path: ['test-swagger1.json', 'test-swagger2.json'],
        output: ['./output1', './output2'],
        moduleName: ['TestModule1', 'TestModule2'],
      }

      const mockOptions = [
        {
          path: 'test-swagger1.json',
          output: './output1',
          moduleName: 'TestModule1',
        },
        {
          path: 'test-swagger2.json',
          output: './output2',
          moduleName: 'TestModule2',
        },
      ]

      const mockSwagger = {
        openapi: '3.0.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {}
      }
      const mockGenerator = {
        generateScheme: vi.fn().mockResolvedValue(undefined),
        generateFetch: vi.fn().mockResolvedValue(undefined),
        generatePreserve: vi.fn().mockResolvedValue(undefined),
      }

      mockUtil.parseOption.mockReturnValue(mockOptions)
      mockUtil.fetchSwagger.mockResolvedValue(mockSwagger)
      MockSwaggerParser.mockReturnValue({ getDocument: vi.fn().mockReturnValue(mockSwagger) } as any)
      MockPreserveHandler.mockReturnValue({ preserveData: {} } as any)
      MockOperationIdHandler.mockReturnValue({} as any)
      MockGenerator.mockReturnValue(mockGenerator as any)

      // Act
      await generateApi(mockArgs)

      // Assert
      expect(mockUtil.parseOption).toHaveBeenCalledWith(mockArgs)
      expect(mockUtil.fetchSwagger).toHaveBeenCalledTimes(2)
      expect(MockGenerator).toHaveBeenCalledTimes(2)
    })

    it('should reject when fetchSwagger fails', async () => {
      // Arrange
      const mockArgs = {
        path: 'invalid-swagger.json',
        output: './output',
        moduleName: 'TestModule',
      }

      const mockOptions = [{
        path: 'invalid-swagger.json',
        output: './output',
        moduleName: 'TestModule',
      }]

      const error = new Error('Failed to fetch swagger')

      mockUtil.parseOption.mockReturnValue(mockOptions)
      mockUtil.fetchSwagger.mockRejectedValue(error)

      // Act & Assert
      await expect(generateApi(mockArgs)).rejects.toThrow('Failed to fetch swagger')
    })

    it('should reject when generator fails', async () => {
      // Arrange
      const mockArgs = {
        path: 'test-swagger.json',
        output: './output',
        moduleName: 'TestModule',
      }

      const mockOptions = [{
        path: 'test-swagger.json',
        output: './output',
        moduleName: 'TestModule',
      }]

      const mockSwagger = {
        openapi: '3.0.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {}
      }
      const mockGenerator = {
        generateScheme: vi.fn().mockRejectedValue(new Error('Generation failed')),
        generateFetch: vi.fn().mockResolvedValue(undefined),
        generatePreserve: vi.fn().mockResolvedValue(undefined),
      }

      mockUtil.parseOption.mockReturnValue(mockOptions)
      mockUtil.fetchSwagger.mockResolvedValue(mockSwagger)
      MockSwaggerParser.mockReturnValue({ getDocument: vi.fn().mockReturnValue(mockSwagger) } as any)
      MockPreserveHandler.mockReturnValue({ preserveData: {} } as any)
      MockOperationIdHandler.mockReturnValue({} as any)
      MockGenerator.mockReturnValue(mockGenerator as any)

      // Act & Assert
      await expect(generateApi(mockArgs)).rejects.toThrow('Generation failed')
    })
  })
})