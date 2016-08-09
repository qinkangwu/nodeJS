/**
 * 反向代理
 */

var express = require('express');
var proxy = require('http-proxy').createProxyServer();
var app = express();

app.use(proxyPass({
    'www.kevin.com' : 'http://127.0.0.1:3000',
    'www.ermao.com' : 'http://127.0.0.1:4000'
}));
function proxyPass(config){
    return function(req,res,next){
        var target = config['www.kevin.com'];
        proxy.web(req,res,{
            target:target
        });
    }
}
app.get('/',function(req,res){
    res.send('8080');
});
app.listen(8080);


//3000 kevin
var app3000 = express();
app3000.get('/',function(req,res){
    res.end('3000');
});
app3000.listen(3000);
//4000 ermao
var app4000 = express();
app4000.get('/',function(req,res){
    res.end('4000');
});
app4000.listen(4000);