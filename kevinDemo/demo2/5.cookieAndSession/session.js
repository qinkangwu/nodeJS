var session = require('express-session');
var express      = require('express');

var app = express();



app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))


app.get('/',function(req,res){
    if(req.session.login==='1'){
        res.send(req.session.username);
    }else{
        res.send('未登录');
    }
})



app.get('/login',function(req,res){
    req.session.login='1';
    req.session.username='kevin';
    res.send('成功登录');
})
app.listen(3000);
