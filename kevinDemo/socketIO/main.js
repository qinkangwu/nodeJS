var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var session = require('express-session');

var allUser=[];
app.set('view engine','ejs');
app.set('trust proxy', 1);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.get('/',function(req,res,next){
    res.render('index');
});
app.get('/checked',function(req,res,next){
    if(!req.query.username){
        res.send('必须填写用户名');
        return;
    }
    if(allUser.indexOf(req.query.username)!=-1){
        res.send('用户名存在');
        return;
    }
    allUser.push(req.query.username);
    req.session.username=req.query.username;
    res.redirect('/chat');
});

app.get('/chat',function(req,res){
    res.render('chat',{
        'username':req.session.username
    });
})



io.on("connection",function(socket){
    socket.on("liaotian",function(msg){
        io.emit("liaotian",msg);
    })
})


http.listen(3000);