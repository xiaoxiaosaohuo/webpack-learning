/*
 * @Author: your name
 * @Date: 2020-01-22 11:40:25
 * @LastEditTime : 2020-01-23 16:09:23
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack-learning/src/tapable/tapable-promise.js
 */
const { AsyncSeriesHook } = require("tapable");
const hook = new AsyncSeriesHook(["name"]);

hook.tapPromise("first", name => {
  console.log("first", name);

  return Promise.resolve("first");
});

hook.tapPromise("second", name => {
  console.log("second", name);

  return Promise.resolve("second");
});

const promise = hook.promise("promise");

promise.then(
  value => {
    console.log("value", value);
  },
  reason => {
    console.log("reason", reason);
  }
);



// (function anonymous(name
//     ) {
//     "use strict";
//     return new Promise((_resolve, _reject) => {
//         var _sync = true;
//         function _error(_err) {
//             if(_sync)
//                 _resolve(Promise.resolve().then(() => { throw _err; }));
//             else
//                 _reject(_err);
//         };

//         var _context;
//         var _x = this._x;

//         function _next0() {
//             var _fn1 = _x[1];
//             var _hasResult1 = false;
//             var _promise1 = _fn1(name);
//             if (!_promise1 || !_promise1.then)
//             throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise1 + ')');
//             _promise1.then(_result1 => {
//                 _hasResult1 = true;
//                 _resolve();
//             }, _err1 => {
//                 if(_hasResult1) throw _err1;
//                 _error(_err1);
//             });
//         }
//         var _fn0 = _x[0];
//         var _hasResult0 = false;
//         var _promise0 = _fn0(name);
//         if (!_promise0 || !_promise0.then)
//         throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise0 + ')');
//         _promise0.then(_result0 => {
//             _hasResult0 = true;
//             _next0();
//         }, _err0 => {
//             if(_hasResult0) throw _err0;
//             _error(_err0);
//         });

//         _sync = false;
//     });
    
// })