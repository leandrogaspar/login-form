const path = require('path')

module.exports = {
  entry: {
    polyfills: './node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
    index: './src/index.js'
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
      }
    ]
  }
}