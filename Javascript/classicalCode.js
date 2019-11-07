// 利用 Proxy，可以将读取属性的操作（get），转变为某个执行函数，从而实现链式操作
var pipe = (function(){
    return function (val) {
        var funcStack = []
        var proxy = new Proxy({}, {
            get(pipeObject, fn) {
                 if (fn === 'get') {
                     return funcStack.reduce(function(val, func){
                         return func(val)
                     }, value)
                 }
                 funcStack.push(window[fn])
                 return proxy
            }
        })
        return proxy
    }
})()
console.log(2)
var double = n => n*2
var pow = n => n*n
