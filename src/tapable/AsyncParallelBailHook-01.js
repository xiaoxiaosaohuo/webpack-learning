/*
 * @Author: your name
 * @Date: 2020-01-22 15:00:17
 * @LastEditTime : 2020-01-23 10:08:42
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack-learning/src/tapable/tapable-parallelBail.js
 */
const { AsyncParallelBailHook } = require('tapable');
const hook = new AsyncParallelBailHook(['name']);

hook.tap('first', (name) => {
  console.log('first', name);
})

// 最先拥有返回值逻辑的事件回调
hook.tapAsync('second', (name, callback) => {
  setTimeout(() => {
    console.log('second', name);
    // 使用 callback 传入了不是 undefined 的返回值。
    callback(null, 'second result');
  }, 1000);
})

// 虽然这个异步的事件回调中的 Promise 对象会比第二个异步的事件回调早执行完毕，
// 但是因为第二个事件回调中已经拥有了返回值的逻辑，
// 因此这个事件回调不会执行 callAsync 传入的回调函数。
hook.tapPromise('third', (name) => {
  console.log('third', name);
  // 返回了一个 Promise 对象，并且它的状态是 Fulfilled, 值不为 undefined。
  return Promise.resolve('third result');
})

hook.callAsync('callAsync', (error, result) => {
  console.log('end', error, result);
});



// (function anonymous(name, _callback) {
//   "use strict";
//   var _context;
//   var _x = this._x;
//   var _results = new Array(3);
//   var _checkDone = ()=>{
//       for (var i = 0; i < _results.length; i++) {
//           var item = _results[i];
//           if (item === undefined)
//               return false;
//           if (item.result !== undefined) {
//               _callback(null, item.result);
//               return true;
//           }
//           if (item.error) {
//               _callback(item.error);
//               return true;
//           }
//       }
//       return false;
//   }
//   do {
//       var _counter = 3;
//       var _done = ()=>{
//           _callback();
//       }
//       ;
//       if (_counter <= 0)
//           break;
//       var _fn0 = _x[0];
//       var _hasError0 = false;
//       try {
//           var _result0 = _fn0(name);
//       } catch (_err) {
//           _hasError0 = true;
//           if (_counter > 0) {
//               if (0 < _results.length && ((_results.length = 1),
//               (_results[0] = {
//                   error: _err
//               }),
//               _checkDone())) {
//                   _counter = 0;
//               } else {
//                   if (--_counter === 0)
//                       _done();
//               }
//           }
//       }
//       if (!_hasError0) {
//           if (_counter > 0) {
//               if (0 < _results.length && (_result0 !== undefined && (_results.length = 1),
//               (_results[0] = {
//                   result: _result0
//               }),
//               _checkDone())) {
//                   _counter = 0;
//               } else {
//                   if (--_counter === 0)
//                       _done();
//               }
//           }
//       }
//       if (_counter <= 0)
//           break;
//       if (1 >= _results.length) {
//           if (--_counter === 0)
//               _done();
//       } else {
//           var _fn1 = _x[1];
//           _fn1(name, (_err1,_result1)=>{
//               if (_err1) {
//                   if (_counter > 0) {
//                       if (1 < _results.length && ((_results.length = 2),
//                       (_results[1] = {
//                           error: _err1
//                       }),
//                       _checkDone())) {
//                           _counter = 0;
//                       } else {
//                           if (--_counter === 0)
//                               _done();
//                       }
//                   }
//               } else {
//                   if (_counter > 0) {
//                       if (1 < _results.length && (_result1 !== undefined && (_results.length = 2),
//                       (_results[1] = {
//                           result: _result1
//                       }),
//                       _checkDone())) {
//                           _counter = 0;
//                       } else {
//                           if (--_counter === 0)
//                               _done();
//                       }
//                   }
//               }
//           }
//           );
//       }
//       if (_counter <= 0)
//           break;
//       if (2 >= _results.length) {
//           if (--_counter === 0)
//               _done();
//       } else {
//           var _fn2 = _x[2];
//           var _hasResult2 = false;
//           var _promise2 = _fn2(name);
//           if (!_promise2 || !_promise2.then)
//               throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise2 + ')');
//           _promise2.then(_result2=>{
//               _hasResult2 = true;
//               if (_counter > 0) {
//                   if (2 < _results.length && (_result2 !== undefined && (_results.length = 3),
//                   (_results[2] = {
//                       result: _result2
//                   }),
//                   _checkDone())) {
//                       _counter = 0;
//                   } else {
//                       if (--_counter === 0)
//                           _done();
//                   }
//               }
//           }
//           , _err2=>{
//               if (_hasResult2)
//                   throw _err2;
//               if (_counter > 0) {
//                   if (2 < _results.length && ((_results.length = 3),
//                   (_results[2] = {
//                       error: _err2
//                   }),
//                   _checkDone())) {
//                       _counter = 0;
//                   } else {
//                       if (--_counter === 0)
//                           _done();
//                   }
//               }
//           }
//           );
//       }
//   } while (false);

// }
// )


// 执行下一个注册回调之前，检查_counter是否被重置等，如果重置说明某些地方返回err，直接终止。
// if (_counter <= 0) break;

// 检查 _counter 的值，如果是 0 的话，则结束
  // 同样，由于函数实际调用时间无法确定，需要检查是否已经运行完毕，
  // if (--_counter === 0) {
  //   _done()
  // };