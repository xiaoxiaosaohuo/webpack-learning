// import "./b";
export const aaa = 1;
export const bbb = 1;
let c = 'siven';
import("./b").then((res) => {
    return c = res.default+aaa;
});
import("./a").then((res) => {
    return c = res.default+bbb;
});
export default c;
