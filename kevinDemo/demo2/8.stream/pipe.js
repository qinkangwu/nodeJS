var fs = require('fs');
var src = fs.createReadStream('src.txt');
var dest = fs.createWriteStream('dest3.txt');
//类似于复制
src.pipe(dest);