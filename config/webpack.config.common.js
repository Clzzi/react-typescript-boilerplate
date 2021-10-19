const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "../src/index.tsx",
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].[chunkhash].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: ["node_modules"],
    alias: {
      "@": path.resolve(__dirname, "../src/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
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
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
      template: "../public/index.html",
      favicon: "../public/favicon.ico",
    }),
  ],
};
