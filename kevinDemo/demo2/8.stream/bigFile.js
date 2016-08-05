var fs = require('fs');
var src = fs.createReadStream('src.txt');
var dest = fs.createWriteStream('dest.txt');
var last=true;
src.on('data',function(data){
    var flag = dest.write(data);
    if(last!=flag){
        console.log(flag);
        last = flag;
    }
});

//当缓存区全部写入目标文件的时候触发
dest.on('brain',function(){
    console.log('brain');
})
