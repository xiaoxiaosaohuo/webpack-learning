const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("./src/plugins/copyPlugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

debugger;
module.exports = {
  mode: "development",
  // devtool: "source-maps",
  entry: {
    app: "./src/index.js"
  },
  // optimization: {
  //   flagIncludedChunks: true,
  //   minimize: false,
  //   runtimeChunk: {
  //     name: "manifest"
  //   },
  //   splitChunks: {
  //     chunks: "all"
  //   }
  // },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, "static"),to:"static" }])
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: "../"
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.txt$/,
        use: {
          loader: "text-loader",
          options: {
            name: "Alice"
          }
        }
      }
    ]
  },
  resolveLoader: {
    modules: ["node_modules", "./loader/"]
  },
  stats: {
    assets: true,
    builtAt: true,
    colors: true
  }
};
