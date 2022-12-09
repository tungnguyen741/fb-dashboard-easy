const path = require('path');
const { name, version, title } = require('./package.json');
const webpack = require('webpack');
const middleware = require("webpack-dev-middleware");
const base64 = require('base-64');
const utf8 = require('utf8');
const svgToMiniDataURI = require('mini-svg-data-uri');
const express = require("express");
const chalk = require('chalk');


// PLUGINS
const HtmlWebpackPlugin = require("html-webpack-plugin"); // create html and inject output into script
const CopyWebpackPlugin = require("copy-webpack-plugin"); // copy all file public from dist
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin') // check import first letter uppercase
const CircularDependencyPlugin = require('circular-dependency-plugin') // check import first letter uppercase
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // delete output when new build
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// OPTIMIZATION
const TerserPlugin = require("terser-webpack-plugin"); // minimize js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //minimize CSS
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// DEVELOPMENT
const DEV_SERVER_HTTPS = 'https';
const DEV_SERVER_HOST = 'localhost.zalopay.vn';
const DEV_SERVER_PORT = 443;
const MEDIA_FOLDER_DEV = '[path][name].[ext]';
// BUILDING
const BUILD_FOLDER = 'dist';
const CSS_FOLDER = "static/css/[name].[contenthash].css";
const CSS_CHUNK_FOLDER = "static/css/[id].[contenthash].chunk.css";
const JS_FOLDER = "static/js/[name].[chunkhash].js";
const JS_CHUNK_FOLDER = "static/js/[name].[chunkhash].chunk.js";
const MEDIA_FOLDER = "static/media/[name].[hash:8].[ext]";
const CSS_MODULE_NAME = `${base64.encode(utf8.encode(`${name}${version}`)).slice(-7)}-[folder]__[local]_[hash:base64:8]`;

const LOCAL_SERVER = `${DEV_SERVER_HTTPS}://${DEV_SERVER_HOST}:${DEV_SERVER_PORT}`
const PROJECT_INFO = `${name}@${chalk.white.bold(version)}`

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production';
    initLogger(devMode);

    const devServerConfig = [devMode && {
        devServer: {
            static: path.resolve(__dirname, './public'),
            open: {
                app: {
                    name: 'Google Chrome',
                },
            },
            magicHtml: true,
            compress: true,
            server: DEV_SERVER_HTTPS,
            host: DEV_SERVER_HOST,
            port: DEV_SERVER_PORT,
        },
        devtool: 'inline-source-map'
    }].filter(Boolean)[0];

    const mainConfig = {
        entry: {
            main: path.resolve(__dirname, 'src/index.tsx'),
        },
        infrastructureLogging: {
            level: 'none',
            appendOnly: true,
        },
        stats: {
            errorDetails: true,
            assets: false,
            entrypoints: false,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    ['@babel/preset-env', { targets: "defaults" }],
                                    "@babel/preset-typescript",
                                    ["@babel/preset-react", { "runtime": "automatic" }]
                                ],

                            }
                        }
                    ],
                },
                {
                    test: /\.(sa|sc|c)ss$/i,
                    use: [
                        {
                            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                        },  // to inject the result into the DOM as a style block
                        {
                            loader: "css-loader",
                            options: {
                                // importLoaders: 1,
                                // minimize: true,
                                url: true,
                                esModule: false,
                                modules: {
                                    localIdentName: CSS_MODULE_NAME,
                                }
                            }
                        },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
                        { loader: "postcss-loader" },  // to convert SASS to CSS
                        { loader: "sass-loader" },  // to convert SASS to CSS
                        // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
                    ]
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack', 'url-loader'],
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 2048,
                                name: devMode ? MEDIA_FOLDER_DEV : MEDIA_FOLDER,
                            },
                        },
                    ],
                },

            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
            alias: {
                "@": path.join(__dirname, 'src'),
            }
        },
        output: {
            filename: JS_FOLDER,
            chunkFilename: JS_CHUNK_FOLDER,
            path: path.resolve(__dirname, BUILD_FOLDER),
        }




    };

    const htmlWebpackPlugin = new HtmlWebpackPlugin({
        title,
        template: path.resolve(__dirname, './public/index.html'),
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    });
    const pluginsConfig = {
        plugins: devMode ? [
            htmlWebpackPlugin,
            new webpack.HotModuleReplacementPlugin(),
            new ReactRefreshWebpackPlugin(),
        ] : [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "public",
                        to: ".",
                        filter: (name) => {
                            return !name.endsWith("index.html");
                        },
                    },
                ],
            }),
            new CaseSensitivePathsPlugin(),
            new CircularDependencyPlugin(),
            new CleanWebpackPlugin(),
            new TerserPlugin(),
            new UglifyJsPlugin(),
            htmlWebpackPlugin,
            new MiniCssExtractPlugin({
                filename: devMode ? "[name].css" : CSS_FOLDER,
                chunkFilename: devMode ? "[id].css" : CSS_CHUNK_FOLDER,
            }),
            // TODO:
            // new ExtractTextPlugin({
            //     filename: "static/css/[name].[contenthash].css"
            // }),
        ]

    };

    const optimizationConfig = {
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
            minimizer: [
                new ImageMinimizerPlugin({
                    minimizer: {
                        implementation: ImageMinimizerPlugin.imageminMinify,
                        options: {
                            // Lossless optimization with custom option
                            // Feel free to experiment with options for better result for you
                            plugins: [
                                ["gifsicle", { interlaced: true }],
                                ["jpegtran", { progressive: true }],
                                ["optipng", { optimizationLevel: 7 }],
                                // Svgo configuration here https://github.com/svg/svgo#configuration
                                [
                                    "svgo",
                                    {
                                        plugins: [
                                            {
                                                name: "preset-default",
                                                params: {
                                                    overrides: {
                                                        removeViewBox: false,
                                                        addAttributesToSVGElement: {
                                                            params: {
                                                                attributes: [
                                                                    { xmlns: "http://www.w3.org/2000/svg" },
                                                                ],
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                ],
                            ],
                        },
                    },
                }),
            ]
        },
    };



    return Object.assign(mainConfig, devServerConfig, pluginsConfig, optimizationConfig);
};

const initLogger = (devMode) => {


    if (devMode) {
        console.log(chalk.green(`Compiled successfully!💻`));
        console.log(`You can now view ${PROJECT_INFO} in the browser.`);
        console.log(chalk.hex('#00E7FF').bold(`${LOCAL_SERVER}\n`));
        return;
    }

    console.log(chalk.hex('#00E7FF')(`Creating an optimized production build... 🚀\n
    ${title}
    ${PROJECT_INFO}
    `));

}