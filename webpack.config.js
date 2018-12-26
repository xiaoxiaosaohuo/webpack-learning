const path = require("path");
debugger;
module.exports = {
  mode: "development",
  devtool:"eval",
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module:{
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};
