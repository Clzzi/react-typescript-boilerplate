const { merge } = require("webpack-merge");
const common = require("./webpack.config.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: "../dist",
    },
    host: "localhost",
    port: 8080,
    open: true,
    client: {
      overlay: true,
      progress: true,
    },
    compress: true,
    open: true,
    historyApiFallback: true,
  },
});
