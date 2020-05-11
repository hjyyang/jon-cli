const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

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
        ],
    },
};

module.exports = config;
