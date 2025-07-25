export interface OpenApiTsProps {
  // extract request params to data contract (Also combine path params and query params into one object) (default: false)
  extractQueryParams: boolean
  // extract request body type to data contract (default: false)
  extractRequestBody: boolean
  // extract response body type to data contract (default: false)
  extractResponseBody: boolean
  // generate separated as module (default: none)
  module: string
  // output path of typescript api file (default: "./")
  output: string
  // fix the type of extracted type (default: [])
  patchType: string[]
  //path/url to swagger scheme
  path: string[]
  // preserve the name of the already exported api (default: false)
  preserve: string
}
