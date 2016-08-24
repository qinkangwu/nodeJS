'use strict';
var koa = require('koa');
var path = require('path');
var util = require('./libs/util.js');
var wechat = require('./wechat2/g.js');
var wechat_file = path.join(__dirname,'./config/wechat.txt');
var config = require('./config.js');
var wx = require('./weixin.js');
var app = koa();

app.use(wechat(config.wechat,wx.reply));

app.listen(3000);
