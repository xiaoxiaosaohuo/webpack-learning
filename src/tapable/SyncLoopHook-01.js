/*
 * @Author: your name
 * @Date: 2020-01-22 19:06:04
 * @LastEditTime : 2020-01-23 12:21:13
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack-learning/src/tapable/SyncLoopHook-01.js
 */
const { SyncLoopHook } = require("tapable");
const hook = new SyncLoopHook(['SyncLoopHook']); // 创建钩子对象
let count = 0;
hook.tap({
    name: 'first',
}, (params) => {
    console.log(params);
    console.log('first');
    
})

hook.tap({
    name: 'second',
}, (params) => {
    console.log(params);
    console.log('second');
    count ++;
    if(count>1){
        return;
    }
    return true
})

hook.tap({
 name: 'third',
}, (params) => {
console.log('third');
})

hook.call('tapable', 'siven');


(function anonymous(SyncLoopHook) {
    "use strict";
    var _context;
    var _x = this._x;
    var _loop;
    do {
        _loop = false;
        var _fn0 = _x[0];
        var _result0 = _fn0(SyncLoopHook);
        if (_result0 !== undefined) {
            _loop = true;
        } else {
            var _fn1 = _x[1];
            var _result1 = _fn1(SyncLoopHook);
            if (_result1 !== undefined) {
                _loop = true;
            } else {
                var _fn2 = _x[2];
                var _result2 = _fn2(SyncLoopHook);
                if (_result2 !== undefined) {
                    _loop = true;
                } else {
                    if (!_loop) {}
                }
            }
        }
    } while (_loop);

}
)
