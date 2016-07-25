/**
 * Created by 康武 on 2016/7/20.
 */


var express=require('express');

var app=express();

app.set('views engine','ejs')
app.use(express.static('./views'))
app.listen(3000);