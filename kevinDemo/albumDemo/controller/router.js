/**
 *
 * Created by Administrator on 2016/7/20.
 */
var files=require('../models/files.js');
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