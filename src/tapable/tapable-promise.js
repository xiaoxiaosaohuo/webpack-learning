/*
 * @Author: your name
 * @Date: 2020-01-22 11:40:25
 * @LastEditTime: 2020-01-22 11:40:32
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /webpack-learning/src/tapable/tapable-promise.js
 */
const { AsyncSeriesHook } = require('tapable');
const hook = new AsyncSeriesHook(['name']);

hook.tapPromise('first', (name) => {
  console.log('first', name);

  return Promise.resolve('first');
});

hook.tapPromise('second', (name) => {
  console.log('second', name);

  return Promise.resolve('second');
});

const promise = hook.promise('promise');

console.log(promise);

promise.then(value => {
  // value 是 undefined，不会接收到事件回调中传入的值
  console.log('value', value);
}, reason => {
  // 事件回调返回的 Promise 对象状态是 Rejected
  // reason 会有事件回调中传入的错误信息
  console.log('reason', reason);
});
