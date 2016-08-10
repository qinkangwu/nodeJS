var fs = require('fs');
var express = require('express');
var http = require('http');

var app = express();

function send(filename,req,res){
    var lastModified = new Date(req.headers['if-modified-since']);
    console.log('lastModified'+lastModified.getTime());
    fs.stat(filename,function(err,stat){
        if(stat.mtime.getTime() == lastModified.getTime()){
            res.statusCode = 304;
            res.end();
        }else{
            res.writeHead(200,{'Last-Modified':stat.mtime.toGMTString()});
            console.log(stat.mtime.getTime());
            fs.createReadStream(filename).pipe(res);
        }
    })
}
http.createServer(function(req,res){
    if(req.url != '/favicon.ico'){
        var filename = req.url.slice(1);
        send(filename,req,res);
    }else{
        res.end('404');
    }
}).listen(3000);