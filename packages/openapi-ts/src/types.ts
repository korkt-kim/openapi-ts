export interface CommandOptionProps {
  // extract request params to data contract (Also combine path params and query params into one object) (default: false)
  extractQueryParams?: boolean;
  // extract request body type to data contract (default: false)
  extractRequestBody?: boolean;
  // extract response body type to data contract (default: false)
  extractResponseBody?: boolean;
  // generate separated as module
  moduleName: string[] | string;
  // output path of typescript api file (default: "./")
  output: string[] | string;
  // fix the type of extracted type
  patchType?: string[] | string;
  //path/url to swagger scheme
  path: string[] | string;
  // preserve the name of the already exported api (default: false)
  preserve?: string;
}

export interface OpenApiOptionProps {
  // extract request params to data contract (Also combine path params and query params into one object) (default: false)
  extractQueryParams?: boolean;
  // extract request body type to data contract (default: false)
  extractRequestBody?: boolean;
  // extract response body type to data contract (default: false)
  extractResponseBody?: boolean;
  // generate separated as module
  moduleName: string;
  // output path of typescript api file (default: "./")
  output: string;
  // fix the type of extracted type
  patch?: JSONPatches;
  //path/url to swagger scheme
  path: string;
  // preserve the name of the already exported api (default: false)
  preserve?: string;
}

export type SourceFile = { fileName: string; source: string };

export interface JSONPatches {
  [swaggerName: string]: string | Array<any>;
}

export type PreserveFile = Record<string, Record<string, string>>;

export interface Param {
  name: string;
  required: boolean;
  type: string;
}
