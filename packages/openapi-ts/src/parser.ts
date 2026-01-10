import {
  entries,
  isEmpty,
  isNil,
  isPlainObject,
  join,
  reduce,
} from 'lodash-es';
import { OpenAPIV3 } from 'openapi-types';
import jsonpatch from 'jsonpatch';
import { JSONPatches, Param } from './types';
import { getNameFromReference, normalizeInterfaceName } from './util';
import { Model } from './generator/scheme';

export type RequestBody = {
  contentType: (typeof SwaggerParser.reqContentTypes)[number];
  body: Param;
};

export class SwaggerParser {
  swagger: OpenAPIV3.Document | null = null;
  static reqContentTypes = [
    'application/json',
    'application/json-patch+json',
    'application/x-www-form-urlencoded',
    'multipart/form-data',
  ] as const;

  constructor(swagger: OpenAPIV3.Document) {
    this.swagger = swagger;
  }

  extractSchemaFromObj(
    obj: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
  ): OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | null {
    let schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | null =
      null;

    function _extractSchemaFromObj(
      _obj: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
    ) {
      if (schema) {
        return;
      }

      for (const [k, v] of entries(_obj)) {
        if (k === 'schema') {
          schema = v;
          return;
        } else if (isPlainObject(v)) {
          _extractSchemaFromObj(v);
        }
      }
    }

    _extractSchemaFromObj(obj);

    return schema;
  }

  getDocument(): OpenAPIV3.Document {
    if (!this.swagger) {
      throw new Error('Swagger is not loaded');
    }

    return this.swagger;
  }

  schemaToType(
    schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
    moduleName?: string,
  ): string {
    if (!schema) {
      return 'any';
    }
    // 일반 변수 대입: 좁은 범위의 값을 넓은범위에 대입할 수 있다.
    // 함수 대입: 넓은 범위의 값을 좁은 범위에 대입할 수 있다.

    if ('$ref' in schema) {
      const name = getNameFromReference(schema.$ref);

      if (!name) {
        return 'any';
      }

      return `${
        moduleName ? `${moduleName}.` : ''
      }${normalizeInterfaceName(name)}`;
    }

    const { type } = schema;

    if (!type) {
      return 'any';
    }

    // file
    if (schema.format === 'binary') {
      return 'File';
    }

    if (
      typeof type === 'string' &&
      ['string', 'number', 'integer'].includes(type)
    ) {
      if (schema.enum) {
        return schema.enum.map((v) => `'${v}'`).join(' | ');
      }

      return type === 'string' ? 'string' : 'number';
    }

    if (type === 'object') {
      const { required, properties } = schema;

      if (!properties) {
        return 'Record<string, any>';
      }

      const codes: string[] = [];

      for (const [k, s] of Object.entries(properties ?? {})) {
        codes.push(
          `${k}${required?.includes(k) ? '' : '?'}: ${this.schemaToType(s, moduleName)}`,
        );
      }

      return `{${codes.join(';')}}`;
    }

    if (type === 'array') {
      const { items } = schema;

      if (isNil(items)) {
        return `Array<any>`;
      }

      return `Array<${this.schemaToType(items, moduleName)}>`;
    }

    if (type === 'boolean') {
      return 'boolean';
    }

    if (Array.isArray(type) && type.includes('null')) {
      return type.join(' | ');
    }

    return 'any';
  }

  getParameterSchema(parameter: OpenAPIV3.ParameterObject) {
    return parameter.schema;
  }

  getRequestBody(operation: OpenAPIV3.OperationObject, moduleName?: string) {
    const requestBody = operation?.requestBody;
    if (!requestBody || !('content' in requestBody)) {
      return null;
    }

    const content = requestBody.content;
    const bodies: RequestBody[] = [];

    for (const contentType of SwaggerParser.reqContentTypes) {
      const contentObj = content[contentType];

      if (!contentObj) {
        continue;
      }

      switch (contentType) {
        case 'application/json':
        case 'application/json-patch+json':
        case 'application/x-www-form-urlencoded':
          {
            const schema = this.extractSchemaFromObj(contentObj);

            if (!schema) {
              continue;
            }

            bodies.push({
              contentType,
              body: {
                name: 'body',
                required: false,
                type: this.schemaToType(schema, moduleName),
              },
            });
          }

          break;

        case 'multipart/form-data': {
          bodies.push({
            contentType,
            body: { name: 'form', required: true, type: 'FormData' },
          });
        }
      }
    }

    if (isEmpty(bodies)) {
      return null;
    }

    return bodies;
  }

  getSchemes(): OpenAPIV3.ComponentsObject['schemas'] {
    return this.swagger?.components?.schemas;
  }

  generateRequestParamSchemas(
    operations: (Omit<OpenAPIV3.OperationObject, 'parameters'> & {
      parameters: OpenAPIV3.ParameterObject[];
    })[],
    patch?: JSONPatches,
  ): Model[] {
    const paramSchemas: Model[] = [];
    let source = '';

    for (const operation of operations) {
      // Skip methods that have no parameters
      const queryParams = operation.parameters?.filter((param) => {
        return param.in === 'query';
      }) satisfies OpenAPIV3.ParameterObject[];

      if (queryParams.length === 0) {
        continue;
      }

      if (!operation.operationId) {
        throw new Error(`operationId should be set for all operaions`);
      }

      const schemaName = normalizeInterfaceName(
        `${operation.operationId}Params`,
      );
      const patchItem = patch?.[schemaName];

      const props = (queryParams as OpenAPIV3.ParameterObject[]).map(
        (param) => {
          const safeName = /[^\w]/.test(param.name)
            ? `'${param.name}'`
            : param.name;
          if (patchItem) {
            return `"${safeName}${param.required ? '' : '?'}": "${encodeURIComponent(this.schemaToType(param.schema ?? {}))}"`;
          }
          return `${safeName}${param.required ? '' : '?'}: ${this.schemaToType(param.schema ?? {})}`;
        },
      );

      if (patchItem) {
        console.log(patchItem);
        let doc = JSON.parse(`{${join(props, ',')}}`);

        try {
          doc = jsonpatch.apply_patch(doc, patchItem);
        } catch (err) {
          console.error(err);
          throw err;
        }
        source = reduce(
          doc,
          (src, value, name) =>
            `${src && `${src};`}${name}:${decodeURIComponent(value)}`,
          '',
        );
      } else {
        source = `${props.join(';')}${props.length ? ';' : ''}`;
      }

      source = `${source}[key: string]: any`;

      paramSchemas.push({
        name: schemaName,
        originName: schemaName,
        isTypeAlias: false,
        source,
      });
    }

    return paramSchemas;
  }
}
