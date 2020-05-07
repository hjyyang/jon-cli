const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let config = {
	mode: process.env.NODE_ENV === "development" ? "development" : "production",
	entry: path.resolve(__dirname, "../src/main.js"),
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "bundle[hash].js",
	},
	plugins: [
		new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            inject: "body"
		}),
	],
};

module.exports = config;
