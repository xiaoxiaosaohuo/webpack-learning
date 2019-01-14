exports.stat = (inputFileSystem, path) => {
  return new Promise((resolve, reject) => {
    inputFileSystem.stat(path, (err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats);
    });
  });
};

exports.readFile = (inputFileSystem, path) => {
  debugger;
  return new Promise((resolve, reject) => {
    debugger;
    inputFileSystem.readFile(path, (err, stats) => {
      if (err) {
        reject(err);
      }
      debugger;
      resolve(stats);
    });
  });
};
