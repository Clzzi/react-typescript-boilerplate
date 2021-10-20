var merge = require("webpack-merge").merge;
var common = require("./webpack.config.common.js");
module.exports = function (env) {
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
//# sourceMappingURL=webpack.config.dev.js.map