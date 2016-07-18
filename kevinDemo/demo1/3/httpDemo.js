/**
 *
 * Created by 康武 on 2016/7/18.
 */
var http=require('http');
var url=require('url');
var server=http.createServer(function(req,res){
    var urlServer=url.parse(req.url,true);
    console.log(urlServer.query);
    res.end();
})

server.listen(3000,'127.0.0.1.exports');