/**
 *
 * Created by 康武 on 2016/7/19.
 */
var http=require('http');
var querystring=require('querystring');
var server=http.createServer(function(req,res){
    if(req.url=='/doPost' && req.method.toLowerCase()=='post'){
        console.log('aaa');
        var allData='';
        req.addListener('data',function(chunk){
            console.log(chunk);
            allData+=chunk;
        })
        req.addListener('end',function(){
            var dataObj=querystring.parse(allData);
            console.log(dataObj.name);
            console.log(dataObj.gender);
            console.log(dataObj.hobby);
            console.log(dataObj.age);

        })
    }else{
        console.log('bbb');
    }
})
server.listen(3000,'127.0.0.1');

