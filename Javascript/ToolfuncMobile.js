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