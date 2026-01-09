import { copy } from 'esbuild-plugin-copy'
import { defineConfig } from 'tsup'
import ejsPlugin from '@digitalmaas/esbuild-plugin-ejs'

export default defineConfig({
  entry: ['index.ts'],
  esbuildPlugins: [
    ejsPlugin(),
    copy({
      assets: {
        from: ['./src/templates/**/*'],
        to: ['./dist/templates'],
      },
      resolveFrom: 'cwd',
    }),
  ],
  format: 'esm',
  outDir: './dist',
  platform: 'node',
  splitting: false,
})
