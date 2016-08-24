'use strict';

var ejs = require('ejs');
var heredoc = require('heredoc');

var temp = heredoc(function(){/*
<xml>
    <ToUserName><![CDATA[<%= toUserName%>]]></ToUserName>
    <FromUserName><![CDATA[<%= fromUserName%>]]></FromUserName>
    <CreateTime><%= createTime%></CreateTime>
    <MsgType><![CDATA[<%= msgType%>]]></MsgType>

    <% if(msgType === 'text'){  %>
        <Content><![CDATA[<%= content%>]]></Content>
    <% }else if(msgType === 'image'){ %>
        <Image>
            <MediaId><![CDATA[<%= content.media_id%>]]></MediaId>
        </Image>
    <% }else if(msgType === 'voice'){ %>
        <Voice>
            <MediaId><![CDATA[<%= content.media_id%>]]></MediaId>
        </Voice>
    <% }else if(msgType === 'video'){ %>
        <Video>
            <MediaId><![CDATA[<%= content.media_id%>]]></MediaId>
            <Title><![CDATA[<%= content.title%>]]></Title>
            <Description><![CDATA[<%= content.description%>]]></Description>
        </Video>
    <% }else if(msgType === 'music'){ %>
        <Music>
            <Title><![CDATA[<%= content.title%>]]></Title>
            <Description><![CDATA[<%= content.description%>]]></Description>
            <MusicUrl><![CDATA[<%= content.musicUrl%>]]></MusicUrl>
            <HQMusicUrl><![CDATA[<%= content.hqMusicUrl%>]]></HQMusicUrl>
            <ThumbMediaId><![CDATA[<%= content.ThumbMediaId%>]]></ThumbMediaId>
        </Music>
    <% }else if(msgType === 'news'){ %>
        <ArticleCount><%= content.length%></ArticleCount>
        <Articles>
            <% for(var j=0 ; j<content.length;j++){ %>
                <item>
                <Title><![CDATA[<%= content[j].title%>]]></Title>
                <Description><![CDATA[<%= content[j].description%>]]></Description>
                <PicUrl><![CDATA[<%= content[j].picUrl%>]]></PicUrl>
                <Url><![CDATA[<%= content[j].url%>]]></Url>
                </item>
            <% } %>
        </Articles>
    <% } %>
</xml>
*/});


var compile = ejs.compile(temp);

exports = module.exports = {
    compile : compile
};
