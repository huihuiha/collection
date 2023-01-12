const json = require('@rollup/plugin-json');

module.exports = {
  input: 'index.js',
  output: {
    file: 'dist.js',
    format: 'umd',
    name: 'Index',
  },
  plugins: [json()],
};
