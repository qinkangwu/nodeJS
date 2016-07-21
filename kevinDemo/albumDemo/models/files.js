/**
 * Created by Administrator on 2016/7/20.
 */

var fs=require('fs');
exports.getAllAlbum=function(callback){
    fs.readdir('./uploads',function(err,files){
        var allAlbums=[];
        (function iterator(i){
            if(i==files.length){
                //console.log(allAlbums);
                callback(allAlbums);
                return;
            };
            fs.stat('./uploads/'+files[i],function(err,stats){
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i+1);
            })
        }(0))

    })
}

exports.getImagesByAlbumName=function(allAlbums,callback){
    fs.readdir('./uploads/'+allAlbums,function(err,files){
        //console.log('./uploads/'+allAlbums);
        if(err){//console.log('没有找到文件');

            return;
        }
        var allImages=[];
        (function iterator(i){
            if(i==files.length){
                callback(allImages);
                return;
            };
            fs.stat('./uploads/'+allAlbums+'/'+files[i],function(err,stats){
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i+1);
            })
        }(0))

    })
}