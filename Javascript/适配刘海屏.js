var xheight = 0.25;
matchFullScreen();

//    适配安卓和iphoneX
function matchFullScreen(){
    if( iphoneX() == 'iphonex'){
        xheight = 0.3;
    }else if(!isNaN(matchAndroid())){
//            xheight(rem)*docFontSize(px/rem) = matchAndroid(px-分辨率)/Dpi = 系统状态栏高度(px)
        xheight = matchAndroid()/(devicePixelRatio*parseInt(document.documentElement.style.fontSize))+0.01;
        if(isNaN(Number(xheight))){
            xheight = 0.3;
        }else{
            xheight = xheight < 0.1 ? 0.3: xheight;
        }
    }
}
//安卓机型，根据返回StatusHeight,计算xheight合理数值
function matchAndroid(){
    var msearch = window.location.search;
    if(msearch.indexOf('?') == 0){
        msearch = msearch.slice(1);
    }
    var marr = msearch.split('&');
    var num = "d";
    marr.forEach(function(item, index){
        if(item.indexOf('StatusHeight') > -1){
            var curindex = item.indexOf('=');
            if( !isNaN(item.slice(curindex+1)) ){
                num = Number(item.slice(curindex+1));
            }
        }
    });
    return num;
}
//检测手机系统, 做iphoneX的判断
function iphoneX(){
    var mobSys = CheckMobSys();
    if(mobSys == 'IOS' && window.innerWidth == 375  && window.innerHeight == 690) {
        return 'iphonex'
    }else if(mobSys == 'IOS' && window.innerWidth == 375  && window.innerHeight == 812){
        return 'iphonex'
    }else if(mobSys == 'IOS' && window.innerWidth == 375  && window.innerHeight > 665 && window.innerHeight < 820){
        return 'iphonex'
    }else {
        return 'no';
    }
}
function CheckMobSys() {
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