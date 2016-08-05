var Readable = require('stream').Readable;
var util = require('util');
util.inherits(Counter,Readable);
function Counter(max,option){
    Readable.call(this,option);
    this._max=max;
    this._index=0;
}
Counter.prototype._read=function(){
    if(this._index++<this._max){
        this.push(new Buffer(String(this._index)));
    }else{
        this.push(null); //写入完毕
    }
};
var counter = new Counter(100);

counter.setEncoding('utf8');
counter.on('data',function(data){
    console.log(data);
});
counter.on('end',function(){
   console.log('over');
});