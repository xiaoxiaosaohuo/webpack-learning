const modules = {"/Users/siven.jin/jinxin/webpack-learning/src/mywebpack/src/index.js": function(exports, require) { /*
 * @Author: your name
 * @Date: 2020-02-15 16:29:05
 * @LastEditTime: 2020-02-15 16:29:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack-learning/src/mywebpack/src/index.js
 */const _imported = require("/Users/siven.jin/jinxin/webpack-learning/src/mywebpack/src/a.js");
console.log(_imported["default"]); },"/Users/siven.jin/jinxin/webpack-learning/src/mywebpack/src/a.js": function(exports, require) { /*
 * @Author: your name
 * @Date: 2020-02-15 16:29:10
 * @LastEditTime: 2020-02-15 16:29:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack-learning/src/mywebpack/src/a.js
 */exports.a = 1;
const b = 2;
exports.test = function test() {
  console.log("test");
};
exports.default = b; },};
const entry = "/Users/siven.jin/jinxin/webpack-learning/src/mywebpack/src/index.js";
function webpackStart({ modules, entry }) {
  const moduleCache = {};
  const require = moduleName => {
    // if in cache, return the cached version
    if (moduleCache[moduleName]) {
      return moduleCache[moduleName];
    }
    const exports = {};
    // this will prevent infinite "require" loop
    // from circular dependencies
    moduleCache[moduleName] = exports;

    // "require"-ing the module,
    // exported stuff will assigned to "exports"
    modules[moduleName](exports, require);
    return moduleCache[moduleName];
  };

  // start the program
  require(entry);
}
webpackStart({ modules, entry });
