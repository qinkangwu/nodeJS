var net =require('net');
var util = require('util');

var server=net.createServer({allowHalfOpen:false},function(socket){

});
server.listen(8080,'localhost',511,function(){
    console.log(util.inspect(server.address()))
});