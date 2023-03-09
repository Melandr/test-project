const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    context: path.join(__dirname, "src"),

    entry: {
        main: "./index.js",
    },

    output: {
        filename: "bundle.[chunkhash].js",
        path: path.join(__dirname, "dist"),
    },

    devtool: "eval",

    mode: "development",

    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        },
        port: 3000,
        proxy: {
            "/server-app/*": {
                target: "http://localhost:8080",
                changeOrigin: true,
                secure: false,
            },
        },
        client: {
            logging: "info",
        },
        historyApiFallback: true,
    },

    resolve: {
        alias: {
            framework: path.join(__dirname, "src/framework"),
        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "Test JS with Java",
            template: "./index.html",
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
