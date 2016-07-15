/**
 *
 * Created by 康武 on 2016/7/14.
 */
var http=require('http');
var fs=require('fs');
var mime=require('mime');
/**
 *
 * @param request 请求
 * @param response 响应
 */
function serve(request,response){
    var url=request.url;
    if(url=='/'){
        //response.statusCode=200;  //状态
        response.setHeader('content-type','text/html;charset=utf-8')
        //response.setHeader('name','kevin');//设置响应头数据
        fs.readFile('index.html',function (err,data) {
            response.write(data);
            response.end();
        })
    }else{
        static(url,response);
    }
}
function static(url,response){
    response.setHeader('content-type',mime.lookup(url)+';charset=utf-8')
    fs.readFile(url.slice(1),function (err,data) {
        response.write(data);
        response.end();
    })
}
//每当有请求调用此函数
var server=http.createServer(serve);
server.listen(8080,'localhost');