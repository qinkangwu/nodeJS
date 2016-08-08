var url = require('url');
var util = require('util');
var http = require('http');
var mime = require('mime');
var fs = require('fs');
var formidable = require('formidable');
var queryString = require('querystring');
var app = http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    if(pathname == '/'){
        fs.createReadStream('./index.html').pipe(res);
    }else if(pathname == '/post'){
        var form = new formidable.IncomingForm();
        form.parse(req,function(err,fields,files){
            console.log(files);
            res.end('hello');
        });
        return;
    }else{
        res.end('404');
    }
}).listen(3000);
