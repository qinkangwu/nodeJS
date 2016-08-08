var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/testPro');

var db = mongoose.connection;
db.once('open',function(callback){
    console.log('数据库成功连接');
})
var studentSchema = new mongoose.Schema({
    "name" : String,
    "age" : Number,
    "sex" : String
});
var Student = mongoose.model('student',studentSchema);
var studySchema = new mongoose.Schema({
    'name' : String,
    'info': String,
    'student':[studentSchema]
});
studySchema.methods.addStudent=function(studentObj,callback){
    this.student.push(studentObj);
    this.save(function(){
        callback();
    });
}
var Study = mongoose.model('Study',studySchema);

/*Student.create({'name':'kevin','age':22,'sex':'男'});
 Student.create({'name':'周杰伦','age':37,'sex':'男'});
 Student.create({'name':'大毛','age':22,'sex':'男'});
 Student.create({'name':'爱德华','age':15,'sex':'男'});*/
var ermao=new Student({'name':'二毛','age':22,'sex':'男'});


var english = new Study({
    'name':'英语',
    'info':'英语课，必选课'
});
english.addStudent(ermao,function(){
    console.log('添加成功');
})