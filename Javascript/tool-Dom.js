// requestAnimationFrame()兼容性处理
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            console.log(currTime);
            var id = window.setTimeout(function() {
                callback();
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
//  正确获取浏览器可用区域的宽高
function getWindow(){
    var w = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

    var h = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    console.log("宽度是" + w + ";" + '高度是' + h);
    return {
        width: w,
        height: h
    }
}
// 获取元素在可视区域的位置： el.getBoundingClientRect()
//  获取元素在文档内的Y位置
function getElePos(el){
    var pos = 0;
    while(el){
        pos += el.offsetTop;
        el = el.offsetParent;
    }
    // var pos = window.scrollY + el.getBoundingClientRect().top
    return pos;
}
function getElePos2(el){
    return window.scrollY + el.getBoundingClientRect().top
}

// 获取当前浏览器支持的transform兼容写法
function getTransform() {
    var transform = '',
        divStyle = document.createElement('div').style,
        // 可能涉及到的几种兼容性写法，通过循环找出浏览器识别的那一个
        transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],

        i = 0,
        len = transformArr.length;

    for(; i < len; i++)  {
        if(transformArr[i] in divStyle) {
            // 找到之后立即返回，结束函数
            return transform = transformArr[i];
        }
    }

    // 如果没有找到，就直接返回空字符串
    return transform;
}

//  实现getElementByclass的功能
function getelementbyclass(node, className){
    var ele = node.getElementsByTagName("*");
    var len = ele.length;
    var curClass = '';
    var index = -1;
    var arr = [];
    for(var i = 0; i < len; i++){
        curClass = ele[i].getAttribute('class');
        index = curClass.indexOf(className);
        if( index >= 0){
            arr.push(ele[i]);
        }
    }
    return arr;
}
//    事件监听兼容性封装
var eventHandler = {
    addHandler:function(element,type,func){
        if(window.addEventListener){
            element.addEventListener(type,func,false);
        }else if(element.detachEvent){
            element.attachEvent('on'+type,func);
        }else{
            element['on'+type]=func;
        }
    },
    removerHandler:function(element,type,func){
        if(window.removeEventListener){
            element.removeEventListener(type,func,false);
        }else if(element.detachEvent){
            element.detachEvent('on'+type,func);
        }else{
            element['on'+type]=null;
        }
    }
}