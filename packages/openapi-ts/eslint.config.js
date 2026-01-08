import eslint from '@eslint/js';
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginSortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import pluginSortKeysFix from 'eslint-plugin-sort-keys-fix';
import pluginTypeScriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
    ],
    plugins: {
      'simple-import-sort': pluginSimpleImportSort,
      'sort-destructure-keys': pluginSortDestructureKeys,
      'sort-keys-fix': pluginSortKeysFix,
      'typescript-sort-keys': pluginTypeScriptSortKeys,
    },
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
])
