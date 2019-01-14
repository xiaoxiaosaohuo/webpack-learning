const loaderUtils = require('loader-utils')
module.exports =  function loader(source) {
    const options = loaderUtils.getOptions(this);
    source = source.replace(/\[name\]/g, options.name);
    const res = `export default ${JSON.stringify(source)}`;
    this.callback(null,res);
    return 
};