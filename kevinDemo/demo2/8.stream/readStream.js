

var fs = require('fs');

var rs = fs.createReadStream('128.txt',{});

//读到数据  
rs.on('data',function(data){
    console.log(data.length);
})