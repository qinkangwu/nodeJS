/**
 *
 * Created by 康武 on 2016/7/18.
 */
var http=require('http');
var server=http.createServer(function(req,res){
    var urlName=req.url;
    if(urlName.substr(0,9)=='/teacher/'){
        console.log('urlName.substr'+urlName.substr(0,9))
        var id=urlName.substr(9);
        console.log('id'+urlName.substr(9))
        if(/\d{5}/.test(id)){
            res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
            res.end('你要查询的老师id为'+id);
        }else{
            res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
            res.end('你要查询的id不是正确位数');
        }
    }else if(urlName.substr(0,9)=='/student/'){
        var id=urlName.substr(9);
        console.log('urlName.substr'+urlName.substr(0,9))
        console.log(id)
        if(/\d{10}/.test(id)){
            res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
            res.end('你要查询的学生id为'+id);
        }else{
            res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
            res.end('你要查询的id不是正确位数');
        }
    }else{
        res.writeHead(404,{'content-type':'text/html;charset=utf-8'});
        res.end('地址不对');
    }
})
server.listen(8080,'localhost');

