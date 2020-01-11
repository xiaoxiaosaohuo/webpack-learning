const { spawn, exec } = require("child_process");

// const child = spawn("pwd");
// child.stdout.pipe(process.stdout);
// child.stdout.on('data', function (data) {
//     process.stdout.write(data);
// });


const child = spawn("ls -l", {
  stdio: "inherit",
  shell: true,
    cwd: '../'
});

exec("ls -l | wc -l", function(err, stdout, stderr) {
  console.log(stdout);
});