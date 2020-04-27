const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common, {
	devServer: {
		contentBase: path.join(__dirname, "../dist"),
		compress: true,
        port: 3000,
        open: true,
        host: "0.0.0.0"
	},
});
