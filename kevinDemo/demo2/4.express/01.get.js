/**
 *
 * Created by 康武 on 2016/7/20.
 */
var express=require('express');
var app=express();
app.get('/',function(req,res){
    res.send('hello world');
})
app.get(/\/student\/([\d]{6})/,function(req,res){
    res.send('学生号码为'+req.params[0]);
})
app.get('/teacher/:tNum',function(req,res){
    res.send('老师号码为'+req.params.tNum);
})
app.listen(3000);