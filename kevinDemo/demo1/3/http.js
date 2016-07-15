/**
 *
 * Created by 康武 on 2016/7/14.
 */
var http=require('http');
var fs=require('fs');
var mime=require('mime');
var url=require('url');//对URL进行处理 把字符串转成对象
/**
 *
 * @param request 请求
 * @param response 响应
 */
function serve(request,response){
    //true 表示query转成对象
    var urlObj=url.parse(request.url,true);
    var pathname=urlObj.pathname;
    if(pathname=='/'){
        //response.statusCode=200;  //状态
        response.setHeader('content-type','text/html;charset=utf-8')
        //response.setHeader('name','kevin');//设置响应头数据
        fs.readFile('index.html',function (err,data) {
            response.write(data);
            response.end();
        })
    }else{
        static(pathname,response);
    }
}
function static(pathname,response){
    response.setHeader('content-type',mime.lookup(pathname)+';charset=utf-8')
    fs.readFile(pathname.slice(1),function (err,data) {
        response.write(data);
        response.end();
    })
}
//每当有请求调用此函数
var server=http.createServer(serve);
server.listen(8080,'localhost');