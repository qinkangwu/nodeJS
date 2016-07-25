/**
 *
 * Created by 康武 on 2016/7/20.
 */
var express=require('express');
var app=express();
app.set('views engine','ejs');

app.get('/',function(req,res){
    res.render('haha',{
        news : ['我是新闻','我也是','me too']
    })
})

app.listen(3000);
