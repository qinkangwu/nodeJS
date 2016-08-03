var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/studentProject');

var db = mongoose.connection;
db.once('open',function(callback){
    console.log('数据库链接成功');
})

module.exports = db;