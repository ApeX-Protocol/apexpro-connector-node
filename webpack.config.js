const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, 'lib', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'lib.umd'),
    filename: '[name].min.js',
    libraryTarget: 'umd',
    library: 'apexpro-connector-node',
    umdNamedDefine: true,
    globalObject: 'this',
  },
}