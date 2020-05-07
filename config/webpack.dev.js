const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

let devConfig = merge(common, {
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        port: 3000,
        // open: true,
        host: "0.0.0.0",
    },
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
    plugins: [new VueLoaderPlugin()],
});

module.exports = devConfig;
