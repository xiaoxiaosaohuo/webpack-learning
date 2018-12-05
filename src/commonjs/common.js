const fs = require("fs");
function req (filename){
    let content = fs.readFileSync(filename,"utf-8");
    let fn = new Function("exports","module","require","__dirname","__filename",
    content+'\n return module.exports'
    );
    let module = {
        exports:{}
    }
    fn(module.exports,module,req,__dirname,__filename);
    return module
}

let str = req("./test.js");
console.log(str)