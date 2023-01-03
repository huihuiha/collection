const fs = require('fs');

const readStream = fs.createReadStream('./README.md');

let length = 0;
readStream.on('data', function (chunk) {
  length += chunk.toString().length;
});
readStream.on('end', function () {
  console.log(length);
});
