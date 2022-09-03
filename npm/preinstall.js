const { exec } = require('child_process')

require('child_process').exec("npm config get registry", function(error, stdout, stderr) {
    console.log("error:", error);
    console.log("stdoutm:", stdout);
    console.log("stderr:", stderr);
    if (!stdout.toString().match(/registry\.x\.com/)) {
        exec('npm config set @xscope:registry https://xxx.com/npm/');
    }
})