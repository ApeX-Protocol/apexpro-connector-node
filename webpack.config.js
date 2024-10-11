const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');

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
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/packages/node-dist'),
          to: path.resolve(__dirname, './lib/packages/node-dist')
        },
      ]
    })
  ]
}
