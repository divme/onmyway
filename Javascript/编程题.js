// 1. 防抖
//    等停止后再执行函数
    function debounce(fn, delay){
        var timer
        return function(){
            var arg = [].slice.call(arguments)
            if(timer) clearTimeout(timer)
            timer = setTimeout(function(){
                fn.apply(null, arg)
            }, delay)
        }
    }

// 2. 节流
//    duration 时间内，至少执行一次
    function throttle(fn, time){
        var start = new Date()
        return function(){
            var now = new Date()
            var arg = Array.slice.call(arguments)
            var duration = now - start
            if( duration >= time) {
                start = now
                fn.apply(null, arg)
            }
        }
    }

    // 3. 柯里化
    // 确定参数个数
    function curry(fn){
       var len = fn.length
       var arg = Array.prototype.slice.call(arguments, 1)
       return function(){
           var args = Array.prototype.slice.call(arguments)
           arg = arg.concat(args)
           if(arg.length >= len){
               fn.apply(null, arg)
           } else {
               // return curry.apply(null, fn, arg)
               return arguments.callee
           }
       }
    }
function curry2(fn, arg){
    var len = fn.length
        arg = arg || []
    return function(){
        var args = Array.prototype.slice.call(arguments)
        arg = arg.concat(args)
        if(arg.length >= len){
            fn.apply(null, arg)
        } else {
            // return curry.apply(null, fn, arg)
            return arguments.callee
        }
    }
}
function add(x, y, n){
    return x+y+n
}
var adder = curry(add)
var adders = adder(1)
// adders(2)(3)
// adders(2,3)

// console.log(adder(1,2,3))
// console.log(adder(1,2)(4))
// console.log(adder(1)(2,5))
    // 不确定参数个数