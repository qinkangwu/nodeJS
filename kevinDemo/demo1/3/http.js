/**
 *
 * Created by 康武 on 2016/7/14.
 */
var http=require('http');

/**
 *
 * @param request 请求
 * @param response 响应
 */
function serve(request,response){
    console.log(request.method); //请求方法
    console.log(request.url);   //请求URL
    console.log(request.headers); //请求头数据
    response.statusCode=200;  //状态
    response.setHeader('content-type','text/html;charset=utf-8')
    response.setHeader('name','kevin');//设置响应头数据
    response.write(new Date().toString());
    response.end();

}
//每当有请求调用此函数
var server=http.createServer(serve);
server.listen(8080,'localhost');