/**
 * Created by mszq on 2018/3/19.
 */
//    requestAnimationFrame 封装
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
//    浮点数加法
function addTwoFloat(keepnum, mode, num1, num2){
    var result,
        resultStr,
        arguments = [].slice.apply(arguments);
    var arr = [];
    for(var i = 2,leng=arguments.length;i < leng;i++){
        var type = typeof arguments[i],
            instance = arguments[i] instanceof Number;
        if(type !='number') {
            arguments[i] = Number(arguments[i]);
            if(typeof arguments[i] != 'number'){
                return;
            }
        }
        var str = arguments[i].toString();
        var snum = str.indexOf('.');
        if(snum < 0){
            arr[i-2] = 0
        }else{
            var newstr = str.slice(snum+1);
            arr[i-2] = newstr.length;
        }
    }
    arr.sort(function(a,b){return b-a});
    arguments.shift();
    arguments.shift();
    if(mode){
        result = arguments.reduce(function(total, cur, curIndex){
            return total += cur*Math.pow(10,arr[0]);
        }, 0);
    }else{
        result = arguments.reduce(function(total, cur, curIndex){
            return total -= cur*Math.pow(10,arr[0]);
        }, arguments[0]*Math.pow(10,arr[0])*2);
    }
    result = result/Math.pow(10,arr[0]);
    if(keepnum){
        resultStr = result.toFixed(keepnum);
        result = Number(resultStr);
    }
    return result;
}
//    定义一个获取/设置元素属性值(不包括transform)的方法: css(el,"width"); css(el, "width", "100px")
//    transform: css(el, 'translateX', '100px');
function css(el, attr, val, fn){
    var transforms = ['transform', 'rotate','rotateX','rotateY','rotateZ','translate','translateX','translateY','translateZ','scale','scaleX','scaleY','skew',"skewX","skewY"];
    for(var i = 0, len = transforms.length; i < len; i++){
        if( attr == transforms[i]){
            return transform(el, attr, val, fn);
        }
    }
    if( val == undefined ){
        return window.getComputedStyle?window.getComputedStyle(el)[attr] : el.currentStyle[attr];
    }
    el.style[attr] = val;
    setTimeout(fn, 200);
}
//    可以单独利用transform方法设置transform属性，transform(el, "scaleX", "1.5")
//    也可以集成到css方法中
function transform(el, attr, val, fn){
    var str = '', // transform 属性值串联字符串
        curAttr; // 遍历 el.transform 对象中的属性
//        给dom对象绑定transform对象属性
    if(!el.transform){
        el.transform = {};
    }

//        如果是查询，直接返回属性值或者绑定在dom对象上的transform对象；
    if(val == undefined){
        if(attr == "transform"){
            return el.transform;
        }
        return el.transform[attr]? el.transform[attr] : 1;
    }

//        如果是设置，就先把属性值绑定在transform对象上
    el.transform[attr] = val;
    console.log(el.transform);

//        遍历el.transform对象，并且串联为赋值字符串
    for(curAttr in el.transform){
        if(el.transform.hasOwnProperty(curAttr)){
            str += curAttr + "(" + el.transform[curAttr] +") ";
        }
    }
    el.style.WebkitTransform = el.style.transform = str;
    setTimeout(fn, 200);
}