const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let config = {
    entry: path.resolve(__dirname, "../main.js"),
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "bundle[hash].js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "../index.html"),
            inject: "body",
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
    ],
    module: {
        //文件处理loader
        rules: [
            {
                test: /(\.vue)$/, //正则表达式匹配规则
                exclude: /node_modules/, //排除项目依赖包目录
                use: [
                    //使用vue-loader加载器
                    "vue-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        node: "current",
                                        chrome: "52",
                                        ie: "9",
                                    },
                                },
                            ],
                        ],
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            esModule: false,
                            name:
                                process.env.NODE_ENV == "development"
                                    ? "[path][name].[ext]"
                                    : "image/[name].[ext]",
                        },
                    },
                ],
            },
        ],
    },
};

module.exports = config;
