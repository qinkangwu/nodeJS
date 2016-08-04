var express = require('express');
var superAgent = require('superagent');
var cheerio = require('cheerio');

var app = express();


app.get('/',function(req,res,next){
    //通过服务器发送http请求
    superAgent.get('http://www.hiniu.com/today/all')
        //错误处理 data储存了相应html
        .end(function(err,data){
            if(err){
                return next(err);
            }
            //把返回数据转换成html
            var $ = cheerio.load(data.text);
            var items = [];
            $('.row .detailed .title a').each(function(index,elem){
                items.push({
                    'title' : $(this).text(),
                    'href'  : 'http://www.hiniu.com'+$(this).attr('href')
                })
            })
            res.send(items);
        })
})

app.listen(3000);