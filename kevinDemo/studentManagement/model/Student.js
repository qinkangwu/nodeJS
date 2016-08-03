var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    'name' : String,
    'age'  : Number,
    'gender'  : String,
    'course':[Number]
});

studentSchema.index({'sid':1});
var Student = mongoose.model('Student',studentSchema);

module.exports=Student;