const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 问题 : 如何解决 手动引入 hash 打包后的文件  需要 plugin 插件进行解决 
// html-webpack-plugin 插件 
//当我们运行 webpack 命令的时候 会在打包后的目录下的dist 文件下 根据 模板文件下的index.html 生成 index.html 文件
//运行webpack命令时，在发布目录dist自动生成一个根据模板index.html生成一个index.html文件
// 并且自动引入打包后的.js文件

//如何使用 plugins 插件 
// 1.加载插件 const 插件类=require(“插件名”);
// 2. 第二步:  new 插件类({配置项})
module.exports = {
    entry: {
        index: "./src/index.js",
        one: "./src/one.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),


        // 浏览器强制缓存是为了加快访问的速度
        // 浏览器每次请求的资源相同 浏览器才会强制缓存 
        //webpack 提供的hash名 可以防止浏览器强制缓存
        filename: "[name].[hash].main.js"
    },
    mode: "development",
    devtool: "source-map",
    plugins: [
        //配置多个应用
        new HtmlWebpackPlugin({ //假设是前台应用入口
            title: '首页',  // title 的标题 
            filename: "index.html",  //在dist 目录下生成的   文件名
            template: "./public/index.html",  // template 模板的意思
            chunks: ["index"]    //chunks指定需要引入的入口模块的键名 index:"./src/index.js"
            // chunks 指定需要引入的入口文件的键名
        }),
        new HtmlWebpackPlugin({//假设是后台应用入口one:"./src/one.js"
            title: 'One',
            filename: "one.html",
            template: "./public/one.html",
            chunks: ["one"] //chunks指定需要引入的入口模块的键名 one:"./src/one.js"
        })

    ],
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            },
            {
                // 执行顺序 是 从右向左  从下到上
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['@babel/preset-env', '@babel/preset-react']
                    // }
                }
            },


        ]
    }

}
