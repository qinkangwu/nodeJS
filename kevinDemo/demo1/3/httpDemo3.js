/**
 *
 * Created by 康武 on 2016/7/18.
 */

//导入模块
var http=require('http');
var url=require('url');
var fs=require('fs');
var path=require('path');


//创建一个服务器
var server=http.createServer(function(req,res){
    //获取用户输入的pathname
    var pathname=url.parse(req.url).pathname+'/';

    //如果用户没有具体请求文件，使pathname等于index.html
    if(pathname.indexOf('.')==-1){
        pathname +='index.html';
    }
    //获取文件拓展名
    var extname=path.extname(pathname);
    var fileUrl='./'+pathname;
    fs.readFile(fileUrl,function(err,data){
        if(err){
            //没有找到这个文件
            res.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
            res.end('没有找到页面');
        }
        getMime(extname,function(mime){
            res.writeHead(200,{'content-type':mime});
            res.end(data);
        })
    })

})

function getMime(extname,callback){
        fs.readFile('./mime.json',function(err,data){
            if(err){
                throw Error('找不到json文件');
                return;
            }
            var mimeJson=JSON.parse(data);
            var mime=mimeJson[extname] ||'text/plain';
            callback(mime);
        })
}
server.listen(8080,'localhost');


