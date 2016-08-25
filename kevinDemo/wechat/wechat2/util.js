'use strict';

var Promise = require('bluebird');
var xml2js = require('xml2js');
var tpl = require('./temp.js');

exports.parseXMLAsync = function(xml){
    return new Promise(function(resolve,reject){
        xml2js.parseString(xml,{ trim : true},function(err,content){
            if(err){
                reject(err)
            }else{
                resolve(content)
            }
        })
    })
};

function formatMessage(result){
    var message = {};
    if(typeof result ==='object'){
        var keys = Object.keys(result);
        for(var i = 0 ; i < keys.length ; i++){
            var item = result[keys[i]];
            var key = keys[i];
            if(!(item instanceof Array)||item.length ===0){
                continue;
            }
            if(item.length === 1){
                var val = item[0];

                if(typeof val === 'object'){
                    message[key] = formatMessage(val);
                }else{
                    message[key] = (val || '').trim();
                }
            }else{

                message[key] = [];
                for (var j = 0 , k =item.length ; j<k ; j++ ) {
                    message[key].push(formatMessage(item[j]));
                }
            }
        }
        return message;
    }

}

exports.formatMessage = formatMessage ;

exports.tpl = function(content,message){
    var info = {};
    //console.log('内容是'+content);
    //console.log('内容长度为'+content.length);
    var type = 'text';
    console.log(content);
    var fromUserName = message.FromUserName;
    var toUserName = message.ToUserName;
    if(Array.isArray(content)){
        type = 'news';
    }
    if(content.type === 'image'){
        type = 'image';
    }
    if(content.type === 'video'){
        type = 'video';
    }
    if(content.type === 'music'){
        type = 'music';
    }
    info.content = content;
    info.createTime = new Date().getTime();
    info.msgType = type;
    info.toUserName = fromUserName;
    info.fromUserName = toUserName;
    console.log('info='+JSON.stringify(info))
    return tpl.compile(info);
};