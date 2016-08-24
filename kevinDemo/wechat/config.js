'use strict';
var path = require('path');
var util = require('./libs/util.js');
var wechat_file = path.join(__dirname,'./config/wechat.txt');
var config = {
    wechat : {
        appID : 'wxb2e2d073025ea449' ,
        appSecret : 'd50caaff2dc152f08a8911e35eb40319',
        token : 'qinkangwugerenceshi',
        getAccessToken : function(){
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken : function(data){
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file,data);
        }
    }
};

module.exports = config;