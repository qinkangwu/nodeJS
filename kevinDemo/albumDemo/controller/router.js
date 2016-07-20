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
    res.send('相册名字是:'+req.params.albumName);
};