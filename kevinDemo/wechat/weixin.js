'use strict';

var config = require('./config');
var Wechat = require('./wechat2/wechat.js');

var wechatApi = new Wechat(config.wechat);

exports.reply=function* (next){
    var message = this.weixin;
    //console.log('message='+message);
    if(message.MsgType === 'event'){

        if(message.Event === 'subscribe'){
            if(message.EventKey){
                console.log('扫描二维码:'+ meesage.EventKey +'  '+ message.ticket);
            }

            this.body = '哦哦哦哦哦哦哦哦哦哦哦哦\r\n'+'消息ID'+message.MsgId;
        }else if(message.Event === 'unsubscribe'){
            console.log('无情!');
            this.body='';
        }else if(message.Event === 'LOCATION'){
            this.body = '你上报的位置是'+message.Latitude + '/' + message.Longitude + '-' +message.Precision;
        }else if(message.Event === 'CLICK'){
            this.body = '你点击了菜单'+ message.EventKey;
        }else if(message.Event === 'SCAN'){
            console.log('关注后扫二维码'+message.EventKey+' '+message.Ticket);
            this.body = '看到扫一下';
        }else if(message.Event === 'VIEW'){
            this.body = '你点击的菜单链接是:'+ message.EventKey
        }

    }else if(message.MsgType === 'text'){
        var content = message.Content;
        var reply = '二毛敲的代码太辣鸡了，无法理解你输入的'+message.Content+'指令,输入1,2,3,4';

        if(content === '1'){
            reply = '你是一个草包';
        }else if(content === '2'){
            reply = '你们是两个草包'
        }else if(content === '3'){
            reply = [{
                title :'哦',
                description : '描述。。。。。',
                picUrl : 'http://img.woyaogexing.com/touxiang/katong/20131031/2d547b4967837e02.jpg!200X200.jpg',
                url : 'http://www.baidu.com'
            },{
                title :'nodeJS 开发微信',
                description : '描述。。。。。',
                picUrl : 'http://img.woyaogexing.com/touxiang/katong/20131031/2d547b4967837e02.jpg!200X200.jpg',
                url : 'http://www.baidu.com'
            }]
        }else if(content === '4'){
            var data = yield wechatApi.uploadMaterial('image',__dirname+'/2.jpg');
            //console.log(data);
            reply = {
                type : 'image',
                mediaId : data.media_id
            }
        }else if(content === '5'){
            var data = yield wechatApi.uploadMaterial('video',__dirname+'/5.mp4');
            console.log(data)
            reply = {
                type : 'video',
                title : '回复视频内容',
                description : '小视频',
                mediaId : data.media_id
            }
        }else if(content === '6'){
            var data = yield wechatApi.uploadMaterial('image',__dirname+'/2.jpg');
            reply = {
                type : 'music',
                title : '回复音乐内容',
                description : '失落沙洲',
                musicUrl : 'http://sc.111ttt.com/up/mp3/189448/4DCB7FA455A62CBDA811130E8725DDFB.mp3',
                thumbMediaId : data.media_id
            }
        }else if(content === '7'){
            var data = yield wechatApi.uploadMaterial('image',__dirname+'/2.jpg',{type : 'image'});
            //console.log(data);
            reply = {
                type : 'image',
                mediaId : data.media_id
            }
        }else if(content === '8'){
            var data = yield wechatApi.uploadMaterial('video',__dirname+'/5.mp4',{type : 'video',description:'{"title":"Really nice a place","introduction":"Never think it so easy"}'});
            //console.log(data);
            reply = {
                type : 'video',
                title : '回复视频内容',
                description : '小视频',
                mediaId : data.media_id
            }
        }else if(content === '9'){
            var picData = yield wechatApi.uploadMaterial('image',__dirname+'/2.jpg',{});

            var media = {
                articles:[
                    {
                        title : '秦康武',
                        thumb_media_id: picData.mediaId,
                        author : 'Kevin',
                        digest : '这里是摘要',
                        show_cover_pic : 1,
                        content : '这里是内容',
                        content_source_url : 'http://www.baidu.com'
                    }
                ]
            };
            //console.log(data);
            data = yield wechatApi.uploadMaterial('news',media,{});
            data = yield wechatApi.fetchMaterial(data.media_id,'news',{});
            console.log(data);

            var items = data.news_item;
            var news = [];
            console.log(items);
            items.forEach(function(item){
                news.push({
                    title : item.title,
                    description : item.digest,
                    picUrl : picData.url,
                    url : item.url
                });
            });
            reply = news;
        }
        this.body = reply;
    }

    yield next;
};