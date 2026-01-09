pnpm openapi-ts \
  -p https://petstore.swagger.io/v2/swagger.json -o ./src/api/v2 -m console --patchType console:./scripts/console-patch.yaml \ \
  -p https://petstore3.swagger.io/api/v3/openapi.json -o ./src/api/v3 -m admin \
  --extract-query-params true --preserve true\