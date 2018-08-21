"use strict";
var webpack = require("webpack");
var loaders = require("./webpack.loaders");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var DashboardPlugin = require("webpack-dashboard/plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

loaders.push({
  test: /\.scss$/,
  loaders: ["style", "css?importLoaders=1", "sass"],
  exclude: ["node_modules"]
});

loaders.push({
  test: /\.jsx$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  query: {
    presets: ["env", "stage-0", "react"],
    plugins: ["transform-object-rest-spread"]
  }
});

module.exports = {
  entry: [
    "react-hot-loader/patch",
    "./src/index.jsx" // your app's entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || "eval-source-map",
  output: {
    publicPath: "/",
    path: __dirname,
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "stage-0", "react"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader?importLoaders=1"],
        exclude: ["node_modules"]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "file-loader"
        }
      },
      {
        test: /\.(woff|woff2)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "file-loader?prefix=font/&limit=5000"
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "file-loader?limit=10000&mimetype=application/octet-stream"
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "file-loader?limit=10000&mimetype=image/svg+xml"
        }
      },
      {
        test: /\.gif/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "file-loader?limit=10000&mimetype=image/gif"
        }
      },
      {
        test: /\.jpg/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "file-loader?limit=10000&mimetype=image/jpg"
        }
      },
      {
        test: /\.png/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "file-loader?limit=10000&mimetype=image/png"
        }
      }
    ]
  },
  devServer: {
    contentBase: "./public",
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: "style.css",
      allChunks: true
    }),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      files: {
        css: ["style.css"],
        js: ["bundle.js"]
      }
    })
  ]
};
