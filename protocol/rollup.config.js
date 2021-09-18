import { resolve } from 'path';
import ts from 'rollup-plugin-typescript2';

import { name } from './package.json';

function createConfig(entryFile, output) {
  output.sourcemap = true;
  output.externalLiveBindings = false
  output.globals = {}
  output.sourcemap = true

  const shouldEmitDeclarations = false

  const tsPlugin = ts({
    check: true,
    tsconfig: resolve(__dirname, 'tsconfig.json'),
    cacheRoot: resolve(__dirname, 'node_modules/.ts_cache'),
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: output.sourcemap,
        declaration: shouldEmitDeclarations,
        declarationMap: shouldEmitDeclarations
      },
      exclude: ['**/test']
    }
  });

  const nodePlugins = [
    require('@rollup/plugin-commonjs')(),
    require('@rollup/plugin-node-resolve').nodeResolve()
  ];

  const external = [];

  return {
    input: resolve(entryFile),
    external,
    plugins: [
      tsPlugin,
      ...nodePlugins,
    ],
    output,
    treeshake: {
      moduleSideEffects: false
    }
  }
}

export default [
  createConfig('./src/index.ts', { file: 'dist/xebug.js', format: 'iife', name }),
]