
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
    return webpackrequire('../index.js')
})({
    "./src/index.js":(function(module, exports, webpackrequire) {
        "use strict";
        eval("import a from "./test";
import "./index.css";
console.log(a)");
    })
})
