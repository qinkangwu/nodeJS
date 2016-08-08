/**
 * 1.创建服务器
 * 2.可以连接客户端
 * 3.客户端可以发言广播
 * 4.客户端断开和连接需要通知大家
 * 5.统计在线人数
 *
 */


var net = require('net');
var util = require('util');
var clients= {};
var server = net.createServer(function(socket){
    var username;
    socket.setEncoding('utf8');
    server.getConnections(function(err,count){
        socket.write('欢迎光临,当前在线'+count+'人,请输入用户名');
    });
    socket.write('欢迎光临,请输入用户名');
    socket.on('data',function(data){
        if(username){
            broadcast(username,data);
        }else{
            username=data;
            clients[username]=socket;
            broadcast(username,username+'加入了聊天室');
        }
    });
    socket.on('end',function(){
        broadcast(username,username+'离开了聊天室');
        clients[username].destroy();
        delete clients[username];
    })
});

function broadcast(username,data){
    for(var name in clients){
        if(username!=name)
            clients[name].write(data);
    }
};
server.listen(8089);

