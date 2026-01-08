import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./index.ts'],
  esbuildPlugins: [],
  format: 'esm',
  outDir: './dist',
  platform: 'node',
  splitting: false,
})
