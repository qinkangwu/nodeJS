/**
 * Created by 康武 on 2016/7/20.
 */
var express=require('express');
var bodyParser = require('body-parser');
var app=express();

app.set('view engine','ejs');
app.get('/',function(req,res){
    res.render('post');
})
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/',function(req,res){
    console.log(req.body);
})

app.listen(3000);