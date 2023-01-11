const ascii = require('rollup-plugin-ascii');
const node = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');
const pkg = require('./package.json');

const copyright = `// ${pkg.homepage} v${pkg.version} Copyright ${(new Date()).getFullYear()} ${pkg.author.name}`;

module.exports = [
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
      file: 'lib/htmlelement.polyfills.umd.js',
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
      banner: copyright,
      file: 'lib/htmlelements.polyfills.esm.js',
      format: 'esm',
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
      exports: 'default',
      extend: true,
      banner: copyright,
      file: 'lib/htmlelement.polyfills.cjs.js',
      format: 'cjs',
      indent: false,
      name: pkg.name
    }
  }
];
