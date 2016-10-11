var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var nodeModules = fs.readdirSync("node_modules");

module.exports = {
  entry: {
    app: './app/index.js',
    client: './test/client.js'
  },
  output: {
    path: path.join(__dirname, 'bin', 'app'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  },
  extensions: ['', '.js', '.json'],
  externals: [
    function (context, request, callback) {
      var pathStart = request.split('/')[0];
      if (nodeModules.indexOf(pathStart) >= 0 && request != 'webpack/hot/signal.js') {
        return callback(null, "commonjs " + request);
      }
      callback();
    }
  ],
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();', {raw: true, entryOnly: false}),
    new webpack.HotModuleReplacementPlugin({quiet: true})
  ],
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  devtool: 'sourcemap'
}


