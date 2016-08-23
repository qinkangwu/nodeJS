'use strict';
var koa = require('koa');
var path = require('path');
var wechat = require('./wechat2/g.js');
var wechat_file = path.join(__dirname,'./config/wechat.txt');
var config = {
    wechat : {
        appID : 'wxb2e2d073025ea449' ,
        appSecret : 'd50caaff2dc152f08a8911e35eb40319',
        token : 'qinkangwugerenceshi',
        getAccessToken : function(){
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken : function(){
            return util.writeFileAsync(wechat_file);
        }
    }
};

var app = koa();

app.use(wechat(config.wechat));

app.listen(3000);
