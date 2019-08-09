// 判断一个变量之数据类型
// number string boolean null undefined object function array date regexp
function dataType(m) {
    var type = typeof m;
    if (type === 'object') {
       type = Object.prototype.toString.call(m).slice(8, -1).toLowerCase()
    }
    return type
}

// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;
// 无限参数
function add(){
    var arg = [].slice.apply(arguments)
    var temp = function(){
        var argtemp = [].slice.apply(arguments)
        return add.apply(null,  arg.concat(argtemp))
    }
    temp.toString = function(){
        return arg.reduce(function(total, cur){
            return total + cur
        })
    }
    return temp
}

// ---------------------------------------------柯里化函数----------------------------------------------
// 参数为确定数量
function curryFunc(func, arg){
    var total = func.length;
    var args = arg || [];
    var realCurry = function(){
        var realarg = [].slice.call(arguments);
        // 如果参数这样写，会形成必报，args 会累加，柯里化后的函数只有初次使用才成功
        // args = args.concat(realarg)
        [].push.apply(realarg, args);
        // 因为是确定参数数量，数量不足，说明后面还有参数要传递进来，所以，继续返回一个函数
        // 如果参数数量到达要求了，那么就调用原函数
        if (realarg.length < total){
            return curryFunc.call(null, func, realarg)
        } else {
            return func.apply(null, realarg)
        }
    }
    return realCurry
}

function add(x, y, n){
    return x+y+n
}
function mul(x, y, m){
    return x*y*m
}
var adder = curryFunc(add)
var muler = curryFunc(mul)

console.log(adder(1,2,3))
console.log(adder(1,2)(4))
console.log(adder(1)(2,5))

console.log(muler(1,2,3))
console.log(muler(1,2)(4))
console.log(muler(1)(2,5))



// 参数为不确定数量
function curryUnknown(func, arg){
    arg = arg || [];
    var realCurry = function(){
        var realarg = [].slice.apply(arguments)
        return curryInfinite.call(null, func, arg.concat(realarg))
    }
    realCurry.toString = function(){
        return func.apply(null, arg)
    }
    return realCurry
}

function adds(){
    var arg = [].slice.call(arguments)
    return arg.length > 0 ? arg.reduce(function(total, cur){
        return total + cur
    }) : 0
}
function muls(){
    var arg = [].slice.call(arguments)
    return arg.length > 0 ? arg.reduce(function(total, cur){
        return total * cur
    }) : 0
}
var adders = curryUnknown(adds)
var mulers = curryUnknown(muls)

console.log(adders(5))
console.log(adders(1)(9))
console.log(adders(1)(2,3)(4)(5))

console.log(mulers(1,4))
console.log(mulers(1,2)(3))
console.log(mulers(1)(2,3)(4))