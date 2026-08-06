import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: 'es2021',
      dts: true,
      source: {
        entry: {
          index: './src/index.ts',
          hex: './src/hex.ts',
        },
      },
    },
    {
      format: 'cjs',
      syntax: 'es2021',
      source: {
        entry: {
          index: './src/index.ts',
          hex: './src/hex.ts',
        },
      },
    },
  ],
});
