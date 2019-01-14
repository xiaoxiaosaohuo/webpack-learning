module.exports = val =>
  Object.prototype.toString.call(val) === "[object Object]" ? true : false;
