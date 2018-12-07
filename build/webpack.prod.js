/**
 * 生产阶段需要的
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

    CleanWebpackPlugin = require('clean-webpack-plugin'),
    merge = require('webpack-merge');
let common = require('./webpack.common.js');
    console.log('------------------------------------');



let prodConfig = {
    mode: 'production',    // 开发阶段
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
        // publicPath: 'https://style.org.hc360.com/js/personal/dist'
    },
    module: {
        noParse: /jQuery|lodash/,
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    // {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            // 开启样式寻找，在控制台种选择样式的时候迅速定位到文件位置
                            sourceMap: true
                        }
                    },
                    {
                        // 添加浏览器前缀
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            // 如果要使用下边 plugins的方法 推荐指定唯一值～～
                            ident: 'postcss',
                            plugins: () => [require('autoprefixer')({
                                // 传递参数 设置浏览器版本，--可以不传
                                browsers: ['> 0.15% in CN']
                            })]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 设置最终输出文件名
            filename: 'css/[name].[hash].css',
            // 设置动态引入的样式设置文件名
            chunkFilename: '[id].name'
        })
    ],
    // webpack4 新出的配置方法 压缩配置
    optimization: {
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(),   // 压缩css
            new UglifyjsWebpackPlugin({ // 压缩js
                // 如果js没有发生变化不进行压缩
                cache: true,
                // 使用多进程并行运行来提高构建速度。默认并发运行次数:os.cpus().length- 1
                parallel: true,
                sourceMap: true
            })
        ]
    }
};


module.exports = merge(common, prodConfig);
