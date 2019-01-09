import * as babylon from 'babylon';

import traverse from 'babel-traverse';
import * as t from "babel-types";
import generate from "babel-generator";

export const babylon01 = ()=>{
    const code = `function square(n){
        return n*n;
    }`;

    const ast = babylon.parse(code);
    
    traverse(ast, {
        enter(path) {
            if (t.isIdentifier(path.node, { name: "n" })) {
                path.node.name = "x";
            }
        }
    });
    let aa = generate(ast);
    console.log(aa.code);

}
