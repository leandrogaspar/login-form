const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm

// the path(s) that should be cleaned
const pathsToClean = [
  'dist'
]

module.exports = {
  entry: {
    index: './src/views/index/index.js'
  },
  mode: 'production',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { test: /\.jpg$/, use: ["file-loader"] },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean)
  ]
}