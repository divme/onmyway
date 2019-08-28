// 防抖
 function debounce(fn, delay){
    var timer;
    return function(){
        var arg = Array.prototype.slice.call(arguments)
        var that = this
        if(timer) clearTimeout(timer)
        timer = setTimeout(function(){
            fn.apply(this, arg)
        }. delay)
    }
 }
 // 节流
function throttle(fn, delay){
    var timer
    return function(){
        var arg= Array.prototype.slice.call(arguments)
        var that = this
        if(!timer){
            timer = setTimeout(function(){
                timer = null
                fn.apply(this, arg)
            }, delay)
        }
    }
}
function throttle2(fn, delay){
    var start = new Date()
    return function(){
        var arg = Array.prototype.slice.call(arguments)
        var that = this
        var now = new Date()
        if(now - start >= delay){
            start = now
            fn.apply(that, arg)
        }
    }
}

// 柯里化
// 1. 参数有限
function curry(fn, arr){
    var len = fn.length
    var args = arr || []
    return function(){
        var that = this
        var arg = Array.prototype.slice.call(arguments)
        arg = arg.concat(args)
        if(arg.length < len){
            return curry(fn, arg)
        }
        return fn.apply(that, arg)
    }
}
// 2. 参数不确定
function curry0(fn, arr){
    var len = fn.length
    var args = arr || []
    var that,
        realArg ;
    function temp(){
        var arg = Array.prototype.slice.call(arguments)
        realArg = arg.concat(args)
        that = this
        return curry0(fn, realArg)
    }
    temp.toString = function(){
        return fn.apply(that, realArg)
    }
    return temp
}

// 实现call 和 apply
Function.prototype.mycall = function(context){
    var func = this
    var arg = Array.prototype.slice.call(arguments)
    context.func()
}

// 实现 new 操作符
// 1. 如果构造函数本身没返回对象，则返回新对象
// 2. 给新对象添加构造函数的属性
// 3. 新对象的_proto_ 为 构造函数的protptype
function mynew(fn){
    var obj = {}
    obj._proto_ = fn.prototype
    var result = obj.apply(obj, Array.prototype.slice.call(arguments, 1))
    if(dataType(result) === 'object'){
        return result
    }
    return obj
}
function dataType(m) {
    var type = typeof m;
    if (type === 'object') {
        type = Object.prototype.toString.call(m).slice(8, -1).toLowerCase()
    }
    return type
}