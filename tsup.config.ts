import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { defineConfig } from 'tsup';

const COMPONENTS_DIR = 'src/components';

const componentEntries = readdirSync(COMPONENTS_DIR)
  .filter((name) => {
    const full = join(COMPONENTS_DIR, name);
    return statSync(full).isDirectory();
  })
  .reduce<Record<string, string>>((acc, name) => {
    acc[`components/${name}/index`] = `${COMPONENTS_DIR}/${name}/index.ts`;
    return acc;
  }, {});

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'theme/index': 'src/theme/index.ts',
    ...componentEntries,
  },
  format: ['esm'],
  target: 'es2022',
  outDir: 'dist',
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: true,
  treeshake: true,
  minify: false,
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    '@mui/material',
    '@mui/system',
    '@mui/utils',
    '@emotion/react',
    '@emotion/styled',
  ],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
});
