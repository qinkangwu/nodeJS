var Writable = require('stream').Writable;
var util = require('util');
util.inherits(ConsoleStream,Writable);

function ConsoleStream(){
    Writable.call(this);
};

ConsoleStream.prototype._write=function(data,encoding,callback){
    console.log(data.toString());
    callback();
};
var consoleSm=new ConsoleStream();
consoleSm.write('呵呵','utf8',function(){
    console.log('写入完毕');
});
