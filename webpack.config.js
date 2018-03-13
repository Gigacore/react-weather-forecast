const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: ["./src/index.js", "./src/styles/main.scss"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./public/dist")
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: "babel-loader"
      }
    ]
  },
  devServer: {
    contentBase: "./public/",
    watchContentBase: true
  },
  plugins: [
    new ExtractTextPlugin("bundle.css"),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
