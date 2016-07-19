/**
 *
 * Created by 康武 on 2016/7/19.
 */
var http=require('http');
var formidable=require('formidable');
var querystring=require('querystring');
var util=require('util');
var fs=require('fs');
var sd = require('silly-datetime');
var path=require('path');
var server=http.createServer(function(req,res){
    if(req.url=='/doPost' && req.method.toLowerCase()=='post'){
        var form = new formidable.IncomingForm();
        form.uploadDir = "./uploads";
        form.parse(req, function(err, fields, files) {
            console.log(fields);
            console.log(files);
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end(util.inspect({fields: fields, files: files}));
            var nowDate=sd.format(new Date(), 'YYYYMMDDHHmm');
            var random=parseInt(Math.random()*89999+10000);
            var oldPath=__dirname+'/'+files.file.path;
            var extName=path.extname(files.file.name);
            var newPath=__dirname+'/uploads/'+nowDate+random+extName;
            console.log(newPath);
            fs.rename(oldPath,newPath,function(err){
                if(err){throw err;return};
                res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
                res.end('成功');
            })
        });
    }
})
server.listen(3000,'127.0.0.1');

