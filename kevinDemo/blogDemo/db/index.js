var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/kevin');
mongoose.model('User',new mongoose.Schema({
    'username' : {type : String,required : true},
    'email' : {type : String , required: true},
    'password' : {type : String , required:true},
    'avatar' : {type : String , required:true}
}));
global.Model = function(type){
    return mongoose.model(type);
};