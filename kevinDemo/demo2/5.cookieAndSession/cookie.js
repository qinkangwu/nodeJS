var express      = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());


app.get('/',function(req,res){
    res.cookie('hobby','football',{maxAge:90000,httpOnly:true});
    res.send('success');
})
app.listen(3000);