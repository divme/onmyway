// IOS 输入框失去焦点，键盘不自动弹回问题
// function iosblur(){
//
//     //获取所有iphone的输入框控件
//     var time = 100;
//     var sDom = "textarea,[type='text']";
//     //判断是否为苹果
//     var isIPHONE = window.navigator.userAgent.toLowerCase().indexOf("iphone") != -1;
//     if (isIPHONE) {
//         var obj = document.querySelectorAll(sDom);
//         for (var i = 0; i < obj.length; i++) {
//             objBlur(obj[i], time);
//         }
//     }
//
//     // 输入框元素失去焦点隐藏iphone的软键盘（根本原因为ios点击空白document不能获取焦点）
//     function objBlur(sdom, time) {
//         if (sdom) {
//             sdom.addEventListener("focus", function () {
//                 document.addEventListener("touchend", docTouchend, false);
//             }, false);
//
//         } else {
//             throw new Error("objBlur()没有找到元素");
//         }
//
//         var docTouchend = function (e) {
//             if (e.target != sdom) {
//                 setTimeout(function () {
//                     sdom.blur();
//                     currentPosition=document.documentElement.scrollTop || document.body.scrollTop || window.scrollY;
//                     currentPosition= currentPosition?currentPosition: 0;
//                     window.scrollTo(0,currentPosition);
//                     // currentPosition -=1;
//                     // window.scrollTo(0,currentPosition);
//                     // currentPosition +=1;
//                     // window.scrollTo(0,currentPosition);
//                     document.removeEventListener('touchend', docTouchend, false);
//                 }, time);
//             }
//         };
//
//     }
//
// }
// function dd(){
//     var bfscrolltop = document.body.scrollTop;
//     $("input").focus(function(){
//         interval = setInterval(function(){
//             document.body.scrollTop = document.body.scrollHeight;
//         },100)
//     }).blur(function(){
//         clearInterval(interval);
//         document.body.scrollTop = bfscrolltop;
//     });
// }


function iosblur(){
    var ua = navigator.userAgent;
    var ios = ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
// 仅针对iOS处理该问题
    if (!ios) return;
// 统计input标签会弹出软件盘类型及textarea标签
    var _inputType = ["email", "number", "password", "search", "tel", "text", "url", "textarea"];
    _inputType.forEach(function (item) {
        var _inputDom = document.querySelector( item === "textarea" ? item : ("input[type=" + item + "]") );
        // 当页面不存在此元素则取消处理
        if (!_inputDom) return;
        // 对输入框侦听focus事件处理
        _inputDom.addEventListener("focus", function(event) {
            // 对domcument增加touchend事件处理
            document.addEventListener("touchend", eventHandler, false);
            var eventHandler = function (e) {
                if (e.target == _inputDom) return;
                // 延迟200ms失去焦点及移除事件监听
                setTimeout(function() {
                    document.activeElement.blur();
                    document.removeEventListener("touchend", eventHandler, false);
                    // 页面自动滚动一下，解决页面不自动回弹问题
                    currentPosition=document.documentElement.scrollTop || document.body.scrollTop || window.scrollY;
                    currentPosition= currentPosition?currentPosition: 0;
                    window.scrollTo(0,currentPosition);
                    // currentPosition -=1;
                    // window.scrollTo(0,currentPosition);
                    // currentPosition +=1;
                    // window.scrollTo(0,currentPosition);
                }, 100);
            };
        });
    });
}

// 检测手机系统：
// 返回值为字符串： 'IOS' || 'Android'
function checkMobSys() {
    var platform = typeof (navigator.platform) == "undefined" ? "" : navigator.platform.toLowerCase();
    if (platform == "ipod" || platform == "iphone" || platform == "ipad" || platform == "iphone simulator" || platform == "ipad simulator") {
        return "IOS";
    }
    var userAgent = typeof (navigator.userAgent) == "undefined" ? "" : navigator.userAgent;
    if (userAgent.indexOf("Android") > -1) {
        return "Android";
    }
    return "Other";
}
function isIphonex(){
    if(CheckMobSys() == 'IOS' && window.innerWidth == 375  && window.innerHeight > 810 && window.innerHeight < 820){
        return 'iphonex';
    }else{
        return 'no';
    }
}
// 检测是微信还是qq
// 返回值是布尔值
function iswx(){
    var ua = navigator.userAgent.toLowerCase();
    return ua.search(/micromessenger/i) > -1;

}
function isqq(){
    var ua = navigator.userAgent.toLowerCase();
    return ua.search(/qq/i) > -1;
}