#! /usr/bin/env node

// 入口

let entry = '../index.js';
let output = '../../dist/app.js';
const fs = require('fs');
let script = fs.readFileSync(entry, 'utf-8');
let ascript = script.replace(/import *\(['"](.+?)['"]\)/g, function () {
  console.log(arguments);
});

let template = `
(fucntion(modules){
    funciton webpackrequire(moduleId){
        if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        }
        modules[moduleId].call(module.exports, module, module.exports, webpackrequire);
        module.l = true;
        return module.exports;
    }
    return webpackrequire('${entry}')
})({
    "./src/index.js":(function(module, exports, webpackrequire) {
        "use strict";
        eval("${script}");
    })
})
`;

fs.writeFileSync(output, template);
