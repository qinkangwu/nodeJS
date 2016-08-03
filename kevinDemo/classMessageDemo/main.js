//引模块
var express=require('express');
var router=require('./router/router.js');
var session = require('express-session');
//初始化
var main=express();

main.set('trust proxy', 1);
main.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
//设置默认模板引擎
main.set('view engine','ejs');
//静态化
main.use(express.static('./public'));
main.use(express.static('./avatar'));

//路由
main.get('/',router.showIndex);
main.get('/register',router.showRegister);
main.get('/login',router.showLogin);
main.get('/setAvatar',router.showSetAvatar);
main.get('/cutPic',router.showCutPic);
main.get('/doCutPic',router.doCutPic);
main.get('/getAllContents',router.getAllContents);
main.get('/getUserInfo',router.getUserInfo);
main.get('/getContentCount',router.getContentCount);
main.get('/user/:user',router.showUser);


//接受请求处理
main.post('/doRegister',router.doRegister);
main.post('/doLogin',router.doLogin);
main.post('/doSetAvatar',router.doSetAvatar);
main.post('/doSendContent',router.doSendContent);

//监听
main.listen(3000);