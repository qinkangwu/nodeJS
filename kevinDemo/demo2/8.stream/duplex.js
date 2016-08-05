var Duplex = require('stream').Duplex;
var fs = require('fs');
var util = require('util');
util.inherits(SecretStream,Duplex);

//实现一个加密功能
function SecretStream(){
    Duplex.call(this);
}


SecretStream.prototype._read=function(){

};

SecretStream.prototype._write=function(data,encoding,callback){
    for(var i = 0; i < data.length; i++){
        data[i]=255-data[i];
    }
    this.push(data);
    this.push(null);
};
var secret = new SecretStream();
fs.createReadStream('./password.txt').pipe(secret).pipe(
    fs.createWriteStream('./password-secret.txt')
);
