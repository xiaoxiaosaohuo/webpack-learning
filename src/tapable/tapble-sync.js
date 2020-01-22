/*
 * @Author: your name
 * @Date: 2020-01-21 15:43:06
 * @LastEditTime : 2020-01-22 11:41:03
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack-learning/src/tapable/tapble-test.js
 */
const { SyncHook, AsyncSeriesHook } = require("tapable");
let queue = new SyncHook(["name"]);
queue.tap({ name: "aaa", before: "" }, function(name, name2) {
  // tap 的第一个参数是用来标识订阅的函数的
  console.log(name, name2, 1);
  return "1";
});
queue.tap({ name: "bbb", before: "aaa", context: true }, function(name) {
  console.log(name, 2);
});
queue.tap({ name: "ccc", stage: -1 }, function(name) {
  console.log(name, 3);
});

// 发布
queue.call("webpack", "webpack-cli");
