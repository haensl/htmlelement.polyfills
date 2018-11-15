const fs = require('fs');
const rollup = require('rollup');

rollup.rollup({
  input: 'src/htmlelement.polyfills'
}).then((bundle) => bundle.generate({
  format: 'cjs'
})).then((bundled) =>
  new Promise((resolve, reject) => {
    fs.writeFile(
      'lib/htmlelement.polyfills.node.js',
      bundled.code,
      'utf8',
      (err) => {
        if (err) {
          return reject(err);
        }

        resolve()
      }
    );
  })
).catch((e) => {
  console.error(e);
});
