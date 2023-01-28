import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

const packageJson = require('./package.json')

export default {
  input: './index.ts',
  output: [
    {
      file: 'build/lib/index.js',
      format: 'cjs',
      sourcemap: false,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: 'tsconfig.json' }),
  ],
}
