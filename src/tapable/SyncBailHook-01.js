/*
 * @Author: your name
 * @Date: 2020-01-22 18:40:12
 * @LastEditTime : 2020-01-22 18:48:11
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack-learning/src/tapable/SyncBailHook-01.js
 */
const { SyncBailHook } = require("tapable");
const hook = new SyncBailHook(['SyncBailHook']); // 创建钩子对象

hook.tap({
    name: 'first',
}, (params) => {
    console.log('first')
})

hook.tap({
    name: 'second',
}, (params) => {
    console.log('second');
    return 'second return';
})

hook.tap({
 name: 'third',
}, (params) => {
 console.log('third')
})

hook.call('tapable', 'siven')


// (function anonymous(SyncBailHook) {
//     "use strict";
//     var _context;
//     var _x = this._x;
//     var _fn0 = _x[0];
//     var _result0 = _fn0(SyncBailHook);
//     if(_result0 !== undefined) {
//         return _result0;
//     } else {
//         var _fn1 = _x[1];
//         var _result1 = _fn1(SyncBailHook);
//         if(_result1 !== undefined) {
//         return _result1;
//     } else {
//         var _fn2 = _x[2];
//         var _result2 = _fn2(SyncBailHook);
//         if(_result2 !== undefined) {
//             return _result2;
//         } else {
//             }
//         }
//     }
    
// })