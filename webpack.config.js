var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    'webpack/hot/only-dev-server',
    './src/main.tsx'
  ],
  devtool: null,
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    modulesDirectories: ['src', 'node_modules']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'app.js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['babel', 'ts']
      }
    ]
  }
}
