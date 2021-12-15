const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')

const banner = pkg.name + ' v' + pkg.version + ' ' + pkg.homepage

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    filename: 'xebug.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'xebug',
    libraryTarget: 'var',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [new webpack.BannerPlugin(banner)],
}