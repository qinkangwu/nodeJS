var express = require('express');
var router = require('./router/router.js');
var main = express();


main.set('view engine','ejs');
main.get('/addbook',router.addbook)
main.get('/doadd',router.doadd)
main.get('/',router.showindex)
main.get('/updatebook',router.updatebook)
main.get('/doupdate',router.doupdate)
main.listen(3000);