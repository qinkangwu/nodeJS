var express = require('express');
var superAgent = require('superagent');
var cheerio = require('cheerio');

var app = express();


app.get('/',function(req,res,next){
    //通过服务器发送http请求
    superAgent.get('https://cnodejs.org/')
        //错误处理 data储存了相应html
        .end(function(err,data){
            if(err){
                return next(err);
            }
            //把返回数据转换成html
            var $ = cheerio.load(data.text);
            var items = [];
            $('#topic_list .topic_title').each(function(index,elem){
                items.push({
                    'title' : $(this).attr('title'),
                    'href'  : 'https://cnodejs.org'+$(this).attr('href')
                })
            })
            res.send(items);
        })
})

app.listen(3000);