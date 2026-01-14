pnpm openapi-ts \
  -p https://dev-featureinsight-api.auto-hmg.io/v3/api-docs -o ./src/api/v3 -m console -patch-type console:./src/patch/v3/patch.json \
  --extract-query-params --preserve 