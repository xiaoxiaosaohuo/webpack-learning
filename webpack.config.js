const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
debugger;
module.exports = {
  mode: "development",
  devtool:"eval",
  entry: {
    app: "./src/index.js"
  },
  optimization: {
    flagIncludedChunks: true,
    minimize: false,
    runtimeChunk: {
      name: "manifest"
    }
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins:[
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
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
              publicPath: '../'
            }
          },
          "css-loader"
        ]
      }
    ]
  },
  stats: {
    assets: true,
    builtAt: true,
    colors: true
  }
};
