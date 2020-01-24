/*
 * @Author: your name
 * @Date: 2020-01-22 20:02:31
 * @LastEditTime : 2020-01-23 10:12:59
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack-learning/src/tapable/AsyncParallelHook-01.js
 */
const { AsyncParallelHook } = require("tapable");
const hook = new AsyncParallelHook(["name"]);
console.time('cost');
hook.tapAsync("first", (name, callback) => {
    setTimeout(() => {
        console.log('first');
        callback();
    }, 1000);
});

hook.tapAsync("second", (name, callback) => {
    setTimeout(() => {
        console.log('second');
        callback();
    }, 2000);
});

hook.callAsync('tapable',(error, result) => {
    console.log("end", error, result);
    console.timeEnd('cost');
});



// (function anonymous(name, _callback) {
//     "use strict";
//     var _context;
//     var _x = this._x;
//     do {
//         var _counter = 2;
//         var _done = ()=>{
//             _callback();
//         }
//         ;
//         if (_counter <= 0)
//             break;
//         var _fn0 = _x[0];
//         _fn0(name, _err0=>{
    // 这个函数是 next 函数
            // 调用这个函数的时间不能确定，有可能已经执行了接下来的几个注册函数
//             if (_err0) {
    // 如果还没执行所有注册函数，终止
//                 if (_counter > 0) {
//                     _callback(_err0);
//                     _counter = 0;
//                 }
//             } else {
    // 检查 _counter 的值，如果是 0 的话，则结束
                // 同样，由于函数实际调用时间无法确定，需要检查是否已经运行完毕
//                 if (--_counter === 0)
//                     _done();
//             }
//         }
//         );
//         if (_counter <= 0)
//             break;
//         var _fn1 = _x[1];

//         _fn1(name, _err1=>{
//             if (_err1) {
//                 if (_counter > 0) {
//                     _callback(_err1);
//                     _counter = 0;
//                 }
//             } else {
//                 if (--_counter === 0)
//                     _done();
//             }
//         }
//         );
//     } while (false);

// }
// )
