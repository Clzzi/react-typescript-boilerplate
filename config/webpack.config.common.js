const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = (env) => {
  return {
    entry: "./src/index.tsx",
    output: {
      path: path.join(__dirname, "../dist"),
      filename: "bundle.js",
      clean: true,
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        "@": path.resolve(__dirname, "../src/"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            transpileOnly: true,
          },
        },

        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|woff|woff2|ttf|ico)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                svgoConfig: {
                  plugins: [
                    {
                      removeRasterImages: false,
                      removeStyleElement: false,
                      removeUnknownsAndDefaults: false,
                      removeViewBox: false,
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new dotenv({
        path: env.prodcution ? "./env/env" : "./env/dev.env",
      }),
      new ForkTsCheckerWebpackPlugin(),
    ],
  };
};
