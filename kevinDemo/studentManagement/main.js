var express = require('express');
var main = express();
var router = require('./router/router.js');
var db = require('./model/db.js');

main.set('view engine','ejs');

main.get('/',router.showIndex);
main.get('/add',router.add);
main.get('/doAdd',router.doAdd);
main.get('/update/:_id',router.update);
main.get('/remove/:_id',router.remove);
main.get('/doUpdate',router.doUpdate);
main.listen(3000);
