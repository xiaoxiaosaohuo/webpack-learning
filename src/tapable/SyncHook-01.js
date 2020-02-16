/*
 * @Author: your name
 * @Date: 2020-01-22 18:12:49
 * @LastEditTime : 2020-01-22 18:37:40
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack-learning/src/tapable/SyncHook-01.js
 */
const { SyncHook } = require("tapable");
const hook = new SyncHook(["SyncHook"]); // 创建钩子对象

hook.tap(
  {
    name: "first"
  },
  params => {
    console.log("first");
  }
);

hook.tap(
  {
    name: "second",
    before: "first"
  },
  params => {
    console.log("second");
  }
);

hook.tap(
  {
    name: "third",
    stage: -1
  },
  params => {
    console.log("third");
  }
);

hook.call("tapable", "siven")(
  // function createCompileDelegate(name, type) {
  // 	return function lazyCompileHook(...args) {
  // 		this[name] = this._createCall(type);
  // 		return this[name](...args);
  // 	};
  // }

  function anonymous(SyncHook) {
    "use strict";
    var _context;
    var _x = this._x;
    var _fn0 = _x[0];
    _fn0(SyncHook);
    var _fn1 = _x[1];
    _fn1(SyncHook);
    var _fn2 = _x[2];
    _fn2(SyncHook);
  }
);
