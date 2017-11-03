var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //css单独打包
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, "src"); //__dirname 中的src目录，以此类推
var APP_FILE = path.resolve(APP_PATH, "index.jsx"); //根目录文件app.jsx地址
module.exports = {
  entry: [
    "eventsource-polyfill",
    "webpack-hot-middleware/client?reload=true",
    "./src/index.jsx"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  debug: true,
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   loader: ExtractTextPlugin.extract("style", ["css", "autoprefixer"]),
      // },
      // {
      //   test: /\.scss$/,
      //   exclude: /node_modules/,
      //   loader: ExtractTextPlugin.extract("style", ["css", "autoprefixer", "sass"]),
      // },
      {test: /\.css$/,loader: 'style-loader!css-loader'},
      {
        test:/\.scss$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
      },
      // { 
      //   test: /\.css$/, 
      //   loader: ExtractTextPlugin.extract('style','css')
      // },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: "file"
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=8192&name=images/[hash:8].[name].[ext]"
      },
      {
        test: /\.(gif|woff|svg|eot|ttf)\??.*$/,
        loader: "url-loader?limit=50000&name=[path][name].[ext]"
      },
      {
        test: /\.jsx$/,
        exclude: /^node_modules$/,
        loaders: ["jsx", "babel"],
        include: [APP_PATH]
      }
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loaders: ["es3ify-loader"]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css')
  ],
  resolve: {
    extensions: ["", ".js", ".jsx", ".less", ".scss", ".css"], //后缀名自动补全
    alias: { 'react/lib/ReactMount': 'react-dom/lib/ReactMount' }
  }
};
