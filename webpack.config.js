const path = require("path");
debugger;
module.exports = {
  mode: "development",
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};