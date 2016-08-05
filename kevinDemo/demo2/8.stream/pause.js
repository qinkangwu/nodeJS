var fs = require('fs');
var rs = fs.createReadStream('128.txt',{});
rs.pause(); //暂停读取数据

//读到数据
rs.on('data',function(data){
    console.log(data.length);
})
setTimeout(function(){
    rs.resume(); //恢复数据读取
},2000)