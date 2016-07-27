//引模块
var express=require('express');
var router=require('./router/router.js');
var session = require('express-session')
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


//接受请求处理
main.post('/doRegister',router.doRegister);
main.post('/doLogin',router.doLogin);

//监听
main.listen(3000);