
console.log(process.argv[2])
process.on('beforeExit', function (code) {
    console.log('before exit: ' + code);
});
process.on('exit', function (code) {
    setTimeout(function () {
        console.log('exit: ' + code);
    }, 0);
});
process.on('uncaughtException', function () {
    console.log('uncaught listener');
});
process.setUncaughtExceptionCaptureCallback(function () {
    console.log('uncaught fn');
});
console.log(a.b());