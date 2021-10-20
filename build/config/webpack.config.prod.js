var merge = require('webpack-merge').merge;
var common = require('./webpack.config.common');
module.exports = function (env) {
    return merge(common(env), {
        mode: 'production',
    });
};
//# sourceMappingURL=webpack.config.prod.js.map