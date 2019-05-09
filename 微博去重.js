// ==UserScript==
// @name         微博去重
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  微博去除重复内容
// @author       xixiu
// @match        *://weibo.com/*
// @match        *://m.weibo.cn/*

// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    MakeForm();

    // Your code here...
})();

//添加按钮
function MakeForm()
{
    // 创建一个 form
    var form1 = document.createElement("form");
    form1.id = "form1";
    form1.name = "form1";
    form1.style='z-index: 9999; position: fixed ! important; right: 0px; top: 10px;';//border:1px solid; width:200px; height:40px;
    // 添加到 body 中
    document.body.appendChild(form1);

    // 创建一个输入
    var input = document.createElement("input");
    // 设置相应参数
    input.type = "text";
    input.name = "removeData";
    input.placeholder = "请输入要过滤的元素";

    // 将该输入框插入到 form 中
    form1.appendChild(input);

    //添加一个button
    var input_button = document.createElement("input");
    input_button.type='button';
    input_button.id='submit';
    input_button.onclick=function(){
            validateForm()
    };
    input_button.value='提交';
    //input_button.setAttribute('font-size','20pt');
    form1.appendChild(input_button);

}

//检验输入
function validateForm() {
    var x = document.forms["form1"]["removeData"].value;


    if (x == null || x == ""||x ==' ') {
        alert("需要输入字符串。");
        return false;
    }
    //这里需要区分m.weibo.cn【手机端】//weibo.com【pc端】
    var url = window.location.href;
    console.log(url);
    var doc;
    if(url.indexOf('weibo.com'))//pc端
        doc = document.getElementsByClassName('WB_cardwrap WB_feed_type S_bg2 WB_feed_like')
    else if(url.indexOf('m.weibo.cn')){//移动端
        doc = document.getElementsByClassName('wb-item-wrap')
    }
    else
        alert('匹配url错误');


    for(var i =0;i<doc.length;++i){
        //console.log(doc[i].innerText.toString());
        if(doc[i].innerText.indexOf(x)>-1)
            doc[i].innerText='';
    }
}

