const { merge } = require("webpack-merge");
const common = require("./webpack.config.common.js");

module.exports = (env) => {
  console.log(env);
  return merge(common(env), {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      static: {
        directory: "../dist",
      },
      host: "localhost",
      port: 3000,
      open: true,
      open: true,
      historyApiFallback: true,
    },
  });
};
