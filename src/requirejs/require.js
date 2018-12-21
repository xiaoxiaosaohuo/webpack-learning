let factories = {};

function define (moduleName, dependencies, factory) {
  factory.dependencies = dependencies;
  factories[moduleName] = factory;
}
function require (mods, callback) {
  let results = mods.map(mod => {
    let factory = factories[mod];
    let dependencies = factory.dependencies;
    let exports;
    if (dependencies) {
      require(dependencies, function (...args) {
        exports = factory.apply(null, args);
      });
    } else {
      exports = factory();
    }

    // let exports = factory();

    return exports;
  });
  callback.apply(null, results);
}

define('name', [], function () {
  return '金鑫';
});
define('age', ['name'], function (name) {
  return name + '30';
});

require(['age'], function (age) {
  console.log(age);
});
