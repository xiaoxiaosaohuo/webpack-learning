/*
 * @Author: your name
 * @Date: 2020-01-22 11:40:17
 * @LastEditTime: 2020-01-22 11:41:16
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /webpack-learning/src/tapable/tapable-async.js
 */
const { AsyncSeriesHook } = require("tapable");
const hook = new AsyncSeriesHook(['name']);

hook.tapAsync('first', (name, callback) => {
    console.log('first', name, callback);
    // 继续执行 second 事件回调
    callback();
  });
  
  hook.tapAsync('second', (name, callback) => {
    console.log('second', name, callback);
    // 执行 callAsync 传入的回调
    // 第二个参数传入没有效果，因为 Sync 类型的 Hook 不对第二个参数做处理
    callback('second error', 'second result');
  });
  
  hook.tapAsync('third', (name, callback) => {
    console.log('third', name, callback);
    callback('third');
  });
  
  // 错误优先回调
  // result 打印 undefined
  hook.callAsync('callAsync', (error, result) => {
      console.log('callAsync', error, result);
  });




//   (function anonymous(name, _callback
//     ) {
//     "use strict";
//     var _context;
//     var _x = this._x;
//     function _next1() {
//         var _fn2 = _x[2];
//         _fn2(name, _err2 => {
//             if(_err2) {
//                 _callback(_err2);
//             } else {
//                 _callback();
//             }
//         });
//     }
//     function _next0() {
//         var _fn1 = _x[1];
//             _fn1(name, _err1 => {
//             if(_err1) {
//                 _callback(_err1);
//             } else {
//                 _next1();
//             }
//         });
//     }

//     var _fn0 = _x[0];

//     _fn0(name, _err0 => {
//         if(_err0) {
//             _callback(_err0);
//         } else {
//             _next0();
//         }
//     });
    
// })