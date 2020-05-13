const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

let proConfig = merge(common, {
    mode: "production",
    devtool: "source-map",
    plugins: [new MiniCssExtractPlugin({
        filename: 'style/[name].css',
    }), new BundleAnalyzerPlugin()],
    module: {
        //文件处理loader
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: path.resolve(
                                    __dirname,
                                    "./postcss.config.js"
                                ),
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
        ],
    },
});
module.exports = proConfig;
