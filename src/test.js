export const a = 1;
let c = null;
import("./b").then((res) => {
    c = res+a
})
export default c;