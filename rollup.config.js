import ascii from 'rollup-plugin-ascii';
import node from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import * as pkg from './package.json';

const copyright = `// ${pkg.homepage} v${pkg.version} Copyright ${(new Date()).getFullYear()} ${pkg.author.name}`;

export default [
  {
    input: 'src/htmlelement.polyfills',
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      node(),
      ascii()
    ],
    output: {
      extend: true,
      banner: copyright,
      file: 'lib/htmlelement.polyfills.js',
      format: 'umd',
      indent: false,
      name: pkg.name
    }
  },
  {
    input: 'src/htmlelement.polyfills',
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      node(),
      ascii(),
      terser({
        output: {
          preamble: copyright
        }
      })
    ],
    output: {
      extend: true,
      file: 'lib/htmlelement.polyfills.min.js',
      format: 'umd',
      indent: false,
      name: pkg.name
    }
  },
  {
    input: 'src/htmlelement.polyfills',
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      node(),
      ascii()
    ],
    output: {
      extend: true,
      banner: copyright,
      file: 'lib/htmlelements.polyfills.esm.js',
      format: 'esm',
      indent: false,
      name: pkg.name
    }
  }
];
