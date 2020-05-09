const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");

let devConfig = merge(common, {
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        port: 3000,
        // open: true,
        host: "0.0.0.0",
    },
    devtool: 'inline-source-map',
});

module.exports = devConfig;
