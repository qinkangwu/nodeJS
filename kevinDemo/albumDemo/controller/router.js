/**
 *
 * Created by Administrator on 2016/7/20.
 */
var files=require('../models/files.js');
var path=require('path');
var fs=require('fs');
var sd = require('silly-datetime');
var formidable=require('formidable');
exports.showIndex=function(req,res){
    files.getAllAlbum(function(allAlbums){
        res.render('index',{
            'albums': allAlbums
        })
    })
};
exports.showAlbumName=function(req,res){
    var allAlbums=req.params.albumName;
    files.getImagesByAlbumName(allAlbums,function(AllImages){
        res.render('albums',{
            'albumName':allAlbums,
            'images':AllImages
        })
    })

};

exports.showUp=function(req,res){
    files.getAllAlbum(function(allAlbums){
        res.render('up',{
            'albums':allAlbums
        })
    })
}

exports.doPost=function(req,res){
    var form = new formidable.IncomingForm();

    form.uploadDir=path.normalize(__dirname+'/../temp/');
    form.parse(req, function(err, fields, files,next) {
        if(err){next();return;}
        console.log(fields);
        console.log(files);
        var nowDate=sd.format(new Date(), 'YYYYMMDDHHmm');
        var random=parseInt(Math.random()*89999+10000);
        var oldPath=files.pic.path;
        var extName=path.extname(files.pic.name);
        var newPath=path.normalize(__dirname+'/../uploads/'+fields.files+'/'+nowDate+random+extName);
        fs.rename(oldPath,newPath,function(err){
            if(err){next();return;};
            res.send('success')
        })
    });

    return;
}