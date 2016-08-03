var Student = require('../model/Student.js');
var Course = require('../model/Course.js');
exports.showIndex=function(req,res){
    Student.find({},function(err,result){
        res.render('index',{
            'students' : result
        });
    });

};

exports.add=function(req,res){
    Course.find({},function(err,result){
        res.render('add',{
            'allCourse':result
        });
    })
};

exports.doAdd=function(req,res){
    console.log(req.query);
    Student.create(req.query,function(err,result){
        Course.addStudent(req.query.course,req.query.name,function(){

        });
        console.log('数据插入成功');
        res.redirect('/');
    })
};


exports.update=function(req,res){
    var _id = req.params['_id'];
    Student.findOne({'_id':_id},function(err,student){
        Course.find({},function(err,result2){
            res.render('update',{
                'student':student,
                'allCourse':result2
            })
        })

    })

};


exports.doUpdate=function(req,res){
    var _id = req.query._id;
    Student.update({'_id':_id},req.query,function(err,result){
        res.redirect('/');
    })
};

exports.remove=function(req,res){
    var _id = req.params['_id'];
    Student.remove({'_id':_id},function(err,result){
        res.redirect('/');
    })
};