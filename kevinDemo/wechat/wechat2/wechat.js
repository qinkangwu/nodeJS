'use strict';
var Promise = require('bluebird');
var fs = require('fs');
var _ = require('lodash');
var request = Promise.promisify(require('request'));
var prefix = 'https://api.weixin.qq.com/cgi-bin/';
var util = require('./util.js');
var api = {
    access_token : prefix+'token?grant_type=client_credential',
    temporary:{
        upload : prefix + 'media/upload?',
        fetch :prefix + 'media/get?'
    },
    permanent :{
        upload : prefix + 'material/add_material?',
        uploadNews : prefix + 'material/add_news?',
        uploadNewsPic : prefix + 'media/uploadimg?',
        fetch: prefix + 'material/get_material?',
        del: prefix + 'material/del_material?',
        update: prefix + 'material/update_news?',
        count: prefix + 'material/get_materialcount?',
        batch: prefix + 'material/material/batchget_material?'
    }


};
function Wechat(opts){
    //console.log(opts);
    var that = this;
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;
    this.fetchAccessToken();
}

Wechat.prototype.fetchAccessToken = function(data){
    var that = this;
    if(this.access_token && this.expires_in){
        if(this.isValidAccessToken(this)){
            return Promise.resolve(this);
        }
    }
    //console.log(this);
    this.getAccessToken()
        .then(function(data){
            try {
                data = JSON.parse(data);
            }catch (e){
                return that.updateAccessToken();
            }
            if(that.isValidAccessToken(data)){
                return Promise.resolve(data);
            }else{
                return that.updateAccessToken();
            }
        })
        .then(function(data){
            that.access_token = data.access_token;
            that.expires_in = data.expires_in;
            that.saveAccessToken(data);
            return Promise.resolve(data);
        })
};



Wechat.prototype.isValidAccessToken = function(data){
    if(!data || !data.access_token || !data.expires_in){
        return false;
    }
    var access_token = data.access_token;
    var expires_in = data.expires_in;
    var now = (new Date().getTime());
    if ( now < expires_in){
        return true;
    }else{
        return false;
    }
};

Wechat.prototype.updateAccessToken = function(){
    var appID = this.appID;
    var appSecret = this.appSecret;
    var url  = api.access_token+'&appid='+appID+'&secret='+appSecret;

    return new Promise(function(resolve,reject){
        request({
            url : url,
            json : true
        }).then(function(res){
            var data = res.body;
            var now = (new Date().getTime());
            var expires_in = now + (data.expires_in-20)*1000;
            data.expires_in = expires_in;
            resolve(data);
        })
    })

};


Wechat.prototype.uploadMaterial = function(type,material,permanent){
    var that = this;
    var form = {};
    var uploadUrl = api.temporary.upload;

    if(permanent){
        uploadUrl = api.permanent.upload;

        _.extend(form,permanent);
    }

    if(type === 'pic'){
        uploadUrl = api.permanent.uploadNewsPic;
    }

    if(type === 'news'){
        uploadUrl = api.permanent.uploadNews;
        form = material;
    }else{
        form.media = fs.createReadStream(material);
    }
    /*var form = {
        media : fs.createReadStream(filepath)
    };*/
    var appID = this.appID;
    var appSecret = this.appSecret;


    return new Promise(function(resolve,reject){
        that.fetchAccessToken()
            .then(function(data){
                /*console.log('type:');
                console.log(type);*/
                var url = uploadUrl+'access_token='+data.access_token;

                if(!permanent){
                    url += '&type='+type;
                }else{
                    form.access_token = data.access_token;
                }

                var options = {
                    method : 'POST',
                    url : url,
                    json : true
                };

                if(type === 'news'){
                    options.body = form;
                }else{
                    options.formData = form;
                }

                //console.log(url);
                request(options).then(function(res){
                    var _data = res.body;
                    if(_data){
                        console.log(_data)
                        return resolve(_data);
                    }else{
                        throw new Error('upload material fails');
                    }

                })
                  .catch(function(err){
                      reject(err);
                  })
            })
    })

};


Wechat.prototype.fetchMaterial = function(mediaId,type,permanent){
    var that = this;
    var form = {};
    var fetchUrl = api.temporary.fetch;

    if(permanent){
        fetchUrl = api.permanent.fetch;
    }
    return new Promise(function(resolve,reject){
        that.fetchAccessToken()
            .then(function(data){
                /*console.log('type:');
                 console.log(type);*/
                var url = fetchUrl+'access_token='+data.access_token;
                var form = {};
                var options = {
                    method : 'POST',
                    url : url,
                    json : true
                };
                if(permanent){
                    options.media_id = mediaId;
                    options.access_token = data.access_token;
                    options.body = form;
                }else{
                    if(type === 'video') {
                        url = url.replace('https://','http://')
                    }
                    url += '&media_id='+mediaId
                }

                if(type === 'news' || type === 'video'){
                    request(options).then(function(res){
                            var _data = res.body;
                            if(_data){
                                resolve(_data);
                            }else{
                                throw new Error('Delete material fails');
                            }

                        })
                        .catch(function(err){
                            reject(err);
                        });
                }else{
                    resolve(url);
                }

            })
    })

};


Wechat.prototype.deleteMaterial = function(mediaId){
    var that = this;
    var form = {
        media_id : mediaId
    };
    return new Promise(function(resolve,reject){
        that.fetchAccessToken()
            .then(function(data){
                /*console.log('type:');
                 console.log(type);*/
                var url = api.permanent.del+'access_token='+data.access_token+'&media_id='+mediaId;

                request({
                    method : 'POST',
                    url : url,
                    body : form ,
                    json : true
                }).then(function(res){
                        var _data = res.body;
                        if(_data){
                            resolve(_data);
                        }else{
                            throw new Error('Delete material fails');
                        }

                    })
                    .catch(function(err){
                        reject(err);
                    })
            })
    })

};


Wechat.prototype.updateMaterial = function(mediaId,news){
    var that = this;
    var form = {
        media_id : mediaId
    }
    ._extend(form,news);
    return new Promise(function(resolve,reject){
        that.fetchAccessToken()
            .then(function(data){
                /*console.log('type:');
                 console.log(type);*/
                var url = api.permanent.update+'access_token='+data.access_token+'&media_id='+mediaId;

                request({
                    method : 'POST',
                    url : url,
                    body : form ,
                    json : true
                }).then(function(res){
                        var _data = res.body;
                        if(_data){
                            resolve(_data);
                        }else{
                            throw new Error('Update material fails');
                        }

                    })
                    .catch(function(err){
                        reject(err);
                    })
            })
    })

};



Wechat.prototype.countMaterial = function(){
    var that = this;
    var form = {
        media_id : mediaId
    }
        ._extend(form,news);
    return new Promise(function(resolve,reject){
        that.fetchAccessToken()
            .then(function(data){
                /*console.log('type:');
                 console.log(type);*/
                var url = api.permanent.count+'access_token='+data.access_token;

                request({
                    method : 'GET',
                    url : url,
                    json : true
                }).then(function(res){
                        var _data = res.body;
                        if(_data){
                            resolve(_data);
                        }else{
                            throw new Error('Update material fails');
                        }

                    })
                    .catch(function(err){
                        reject(err);
                    })
            })
    })

};




Wechat.prototype.batchMaterial = function(options){
    var that = this;
    options.type = options.type || 'images';
    options.offset = options.offset || 0;
    options.count = options.count || 1;

    var form = {
        media_id : mediaId
    }
        ._extend(form,news);
    return new Promise(function(resolve,reject){
        that.fetchAccessToken()
            .then(function(data){
                /*console.log('type:');
                 console.log(type);*/
                var url = api.permanent.batch+'access_token='+data.access_token;

                request({
                    method : 'POST',
                    url : url,
                    body : options,
                    json : true
                }).then(function(res){
                        var _data = res.body;
                        if(_data){
                            resolve(_data);
                        }else{
                            throw new Error('Update material fails');
                        }

                    })
                    .catch(function(err){
                        reject(err);
                    })
            })
    })

};




Wechat.prototype.replyOthers = function(){
    var content = this.body;
    var message = this.weixin;
    var xml = util.tpl(content,message);

    this.status = 200;
    this.type = 'application/xml';
    this.body = xml;

};

module.exports = Wechat;