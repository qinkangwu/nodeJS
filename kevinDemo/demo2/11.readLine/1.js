var fs = require('fs');
var EventEmitter = require('events');
var util = require('util');
function LineReader(path){
    this._rs = fs.createReadStream(path);
}
var RETURN = 0x0d;
var NEWLINE = 0x0a;
util.inherits(LineReader,EventEmitter);
LineReader.prototype.on('newListener',function(eventName,callback){
    if(eventName == 'newLine'){
        var row = [];
        var self = this;
        this._rs.on('readable',function(){
            var buff;
            while(null != (buff = this.read(1))){
                var ch = buff[0];
                if(ch == RETURN) {
                    this.read(1);
                    self.emit('newLine',new Buffer(row));
                    row.length = 0;
                }else{
                    row.push(ch);
                }
            }
        });
        this._rs.on('end',function(){
            if(row.length>0){
                self.emit('newLine',new Buffer(row));
            }
            self.emit('end');
        })
    }
});

var lineReader = new LineReader('./index.txt');
lineReader.on('newLine',function(row){
    console.log(row.toString());
});
lineReader.on('end',function(){
    console.log('end');
});