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
//  获取元素在文档内的Y位置
function getEleTop(el){
    var pos = 0;
    while(el){
        pos += el.offsetTop;
        el = el.offsetParent;
    }
    // var pos = window.scrollY + el.getBoundingClientRect().top
    return pos;

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