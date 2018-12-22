import test,{a} from "./test";
import("./a").then((res)=>{
    let output = test+res+a;
    console.log(output);  
})


