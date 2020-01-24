/*
 * @Author: your name
 * @Date: 2020-01-22 18:49:44
 * @LastEditTime : 2020-01-22 18:52:44
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack-learning/src/tapable/SyncWaterfallHook-01.js
 */
const { SyncWaterfallHook } = require("tapable");
const hook = new SyncWaterfallHook(['SyncWaterfallHook']); // 创建钩子对象

hook.tap({
    name: 'first',
}, (params) => {
    console.log(params);
    return 'first';
})

hook.tap({
    name: 'second',
}, (params) => {
    console.log(params);
    return 'second';
})

hook.tap({
 name: 'third',
}, (params) => {
console.log(params);
 return 'third';
})

hook.call('tapable', 'siven')


// (function anonymous(SyncWaterfallHook) {
//     "use strict";
//     var _context;
//     var _x = this._x;
//     var _fn0 = _x[0];
//     var _result0 = _fn0(SyncWaterfallHook);
//     if (_result0 !== undefined) {
//         SyncWaterfallHook = _result0;
//     }
//     var _fn1 = _x[1];
//     var _result1 = _fn1(SyncWaterfallHook);
//     if (_result1 !== undefined) {
//         SyncWaterfallHook = _result1;
//     }
//     var _fn2 = _x[2];
//     var _result2 = _fn2(SyncWaterfallHook);
//     if (_result2 !== undefined) {
//         SyncWaterfallHook = _result2;
//     }
//     return SyncWaterfallHook;

// }
// )
