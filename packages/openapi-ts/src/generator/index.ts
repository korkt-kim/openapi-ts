import { OpenApiOptionProps } from '../types';
import { fetchWithTimeout } from '../util';
import { OpenAPIV2, OpenAPIV3 } from 'openapi-types';

import { SchemeGenerator } from './scheme';
import { SwaggerParser } from '../parser';
import { FetchGenerator } from './fetch';
import converter from 'swagger2openapi';

export class Generator {
  option: OpenApiOptionProps;
  swagger: SwaggerParser | undefined;

  constructor(option: OpenApiOptionProps) {
    this.option = option;
  }

  async fetchSwagger() {
    const webResponse = await fetchWithTimeout(this.option.path);
    const swagger = (await webResponse.json()) as
      | OpenAPIV3.Document
      | OpenAPIV2.Document;

    if (!swagger) {
      throw new Error('No Swagger');
    }

    return new Promise((resolve) => {
      if ('swagger' in swagger) {
        converter.convertObj(swagger, {}, (_, options) => {
          this.swagger = new SwaggerParser(options.openapi);
          resolve(this.swagger);
        });
      } else {
        this.swagger = new SwaggerParser(swagger);
        resolve(this.swagger);
      }
    });
  }

  generateFetch() {
    if (!this.option) {
      throw new Error('No option');
    }

    if (!this.swagger) {
      throw new Error('No swagger');
    }

    const fetchGenerator = new FetchGenerator(this.option, this.swagger);
    return fetchGenerator.getCode();
  }

  generateScheme() {
    if (!this.option) {
      throw new Error('No option');
    }

    if (!this.swagger) {
      throw new Error('No swagger');
    }

    const schemeGenerator = new SchemeGenerator(this.option, this.swagger);
    return schemeGenerator.getCode();
  }
}
