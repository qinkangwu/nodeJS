//Referer:http://localhost:63342/project/nodeJS/kevinDemo/demo2/12.refer/images.html
var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(__dirname));
app.use('/img',function(req,res,next){
    var referer = req.headers.referer;
    console.log(referer);
    if(!referer){
        console.log(referer);
        return next();
    }
    var refererHost = require('url').parse(referer).host.split(':')[0];
    if(refererHost === req.host){
        return next();
    }
    res.sendFile(path.join(__dirname,'img','2.jpg'));
});

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'img.html'));
});
app.listen(3000);