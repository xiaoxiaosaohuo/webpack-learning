import test from "./test";
import("./a").then((res)=>{
    let a = test+res
    console.log(a)  
})


