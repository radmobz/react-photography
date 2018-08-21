var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.jsx'
  ],
  output: {
    publicPath: '/',
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
};
