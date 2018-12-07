/**
 * 存放公共的配置
 */
const webpack = require('webpack'),
    path = require('path'),
    // 在webpack 3之前都是使用 extract-text-webpack-plugin，webpack4中使用mini-css-extract-plugin,
    // 当在使用mini-css-extract-plugin 的时候mode 必须是production
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    // 压缩css文件
    OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'),
    // 压缩js
    UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin'),
    // 使用html-webpack-plugin自动生成模版插件
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

    console.log('------------------------------------');



module.exports = {
    entry: {
        index: path.resolve(__dirname, '../src/index.js'),
        main: path.resolve(__dirname, '../src/main.js'),
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js'
    },
    resolve: {
        'extensions': ['.js', '.vue', '.json'],   // 默认值['.js', '.json'];
        alias: {
            // 'vue$': path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
            '@': path.resolve(__dirname, 'src/')
        }
    },
    externals: {
        // 这个意思相当于是在页面引入的全局依赖 https://style.org.hc360.com/js/build/source/core/jquery.min.js
        // 然后可以在脚本中 以import $ from 'jquery';的方式引用 把一个模块作为外部依赖不会到打包到js中
        jquery: 'jQuery',
        // lodash: '_'
    },
    module: {
        noParse: /jQuery|lodash/,
        rules: [
            // 设置js 转换es5代码的时候 需要在根目录添加 一个  .babelrc 文件 "presets": ["env"]
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,  // 加快编译速度，不包含node_modules文件夹内容
                use: [
                    {
                    // 有时候webpack如果Cannot find module '@babel/core'  babel-loader@8 requires Babel 7.x (the package '@babel/core'). 报错的话 说明不支持8.0的版本 回退到7.0的版本
                        loader: 'babel-loader',
                        options: {
                            // 默认值为 false。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(recompilation process)。如果设置了一个空值 (loader: 'babel-loader?cacheDirectory') 或者 true (loader: babel-loader?cacheDirectory=true)，loader 将使用默认的缓存目录 node_modules/.cache/babel-loader，如果在任何根目录下都没有找到 node_modules 目录，将会降级回退到操作系统默认的临时文件目录。
                            cacheDirectory: true
                        }
                    }
                    // ,
                    // {
                    //     loader: 'eslint-loader',
                    //     options: {
                    //         fix: true
                    //     }
                    // }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|jif)$/,
                include: [path.resolve(__dirname, '../src/')],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    },
                    {
                        // 压缩图片大小
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({
            title: 'webpack 配置', // 默认值为wenpack app
            filename: 'index.htm', // 默认值为index.html
            template: path.resolve(__dirname, '../src/index.html'), // 设置模版路径
            minify: {
                collapseWhitespace: true, // 清楚空格
                removeComments: true, // 是否移除注释
                removeAttributeQuotes: true // 删除属性引号吧
            }
        }),
        // 清理dist目录插件
        new CleanWebpackPlugin(['dist'])
    ],
    // webpack4 新出的配置方法 压缩配置
    optimization: {
        minimizer: []
    }
};
