/**
 * Created by Administrator on 2016/7/20.
 */

var fs=require('fs');
exports.getAllAlbum=function(callback){
    fs.readdir('./uploads',function(err,files){
        var allAlbums=[];
        (function iterator(i){
            if(i==files.length){console.log(allAlbums);callback(allAlbums);return;};
            fs.stat('./uploads/'+files[i],function(err,stats){
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i+1);
            })
        }(0))

    })
}