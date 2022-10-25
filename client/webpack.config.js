const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.[chunkhash].js",
    path: path.resolve(__dirname, "public"),
  },
  mode: "development",
  devServer: {
    headers: {
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      // "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization, tmst, token, sign",
      // "Access-Control-Allow-Headers": "tmst, token, sign",
    },
    port: 3000,
    // proxy: {
    //   "**": {
    //     target: "http://localhost:8080",
    //   },
    // },
    client: {
      logging: "info",
    },
  },
  plugins: [
    new HTMLPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
