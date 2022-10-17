const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.[chunkhash].js",
    path: path.resolve(__dirname, "public"),
  },
  mode: "development",
  devServer: {
    port: 3000,
  },
  plugins: [
    new HTMLPlugin({
      template: "./src/index.html",
    }),
  ],
};
