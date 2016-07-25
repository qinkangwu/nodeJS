/**
 * Created by 康武 on 2016/7/20.
 */

var express=require('express');

var app=express();

app.set('views engine','ejs');
app.get('/',function(req,res){
    res.render('post');
})
app.post('/',function(req,res){
    res.send('success');
})

app.listen(3000);