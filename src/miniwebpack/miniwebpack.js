const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');
let ID = 0;
function createAsset(filename){
    const content = fs.readFileSync(filename,'utf-8');
    
    const ast = babylon.parse(content, {
        sourceType: 'module',
    });
    // 这个数组将保存这个模块依赖的模块的相对路径.
    const dependencies = [];
    traverse(ast,{
        ImportDeclaration:({node})=>{
            dependencies.push(node.source.value);
        }
    })

    const id = ID++;

    const { code } = transformFromAst(ast, null, {
        presets: ['env'],
    });
    return {
        id,
        filename,
        dependencies,
        code,
    };
    // console.log(ast);

}

function createGraph(entry) {
    mainAsset = createAsset(entry);
    const queue = [mainAsset];
    for(const asset of queue){
        asset.mapping = {};
        // 这是这个模块所在的目录. 
        const dirname = path.dirname(asset.filename);
        asset.dependencies.forEach(relativePath => {
         //将相对路径转变为绝对路径.
          const absolutePath = path.join(dirname, relativePath);

          // 解析资产,读取其内容并提取其依赖关系.
          const child = createAsset(absolutePath);

          //   通过给`asset.mapping`对象增加一个新的属性(值为child.id)来表达这种一一对应的关系.
          asset.mapping[relativePath] = child.id;

          // 最后,我们将`child`这个资产推入队列,这样它的依赖关系也将被迭代和解析.
          queue.push(child);
        });
    }
    return queue;
}

function bundle(graph) {
  let modules = '';
  graph.forEach(mod=>{
       modules += `${mod.id}: [
        function (require, module, exports) { ${mod.code} },
        ${JSON.stringify(mod.mapping)},
        ],`;
  })
  const result = `
    (function(modules) {
      function require(id) { 
        const [fn, mapping] = modules[id];
        function localRequire(name) { 
          return require(mapping[name]); 
        }
        const module = { exports : {} };
        fn(localRequire, module, module.exports); 
        return module.exports;
      }
      require(0);
    })({${modules}})
  `;
  return result;
}
const graph = createGraph("./entry.js");
const result = bundle(graph)
console.log(result);