// 字符串方法
// 数字方法：Math/format Number
// 数组方法
// 日期方法

/*----------------------------------------------------------- 字符串方法--------------------------------------------------------------------*/
//  反转字符串
function reverseStr(str){
    return  str.split('').reverse().join('');
}
//  判断字符串是否为回文字符串
function isPalindrome(str){
    return str === str.split('').reverse().join('');
}
//  统计一个字符串出现最多的字母
function theMostWord(str){
    var obj = {};
    var arr = str.split('');
    var len = arr.length;
    for (var i = 0; i < len; i++){
        if(!obj[arr[i]]){
            obj[arr[i]] = 1;
        }else{
            obj[arr[i]] += 1;
        }
    }
    var max = 0,
        maxkey = '';
    for( key in obj ){
        if(obj.hasOwnProperty(key) && obj[key] > max){
            max = obj[key];
            maxkey = key;
        }
    }
    return maxkey;
}
//  随机生成指定长度的字符串
function randomStr(len){
    var all = "abcdefghijklmnopqrstuvwxyz1234567890";
    var alllen = all.length;
    var str = '';
    for(var i = 0; i < len; i++){
        str += all.charAt(Math.floor(alllen*Math.random()))
    }
    return str;
}
//    1. 去掉字符串前后空格
function trim(str){
    var reg = /^\s+|\s+$/g;
    return str.replace(reg, '')
}
//   3. 隐藏字符串中间数位
//   strHide('abcdefghijklmn', 3, 5)  返回："abc*****ijklmn"
function strHide(str, start, n){
    if(typeof str != 'string'){
        str = String(str);
    }
    var sonstr = '';
    for(var i = 0; i < n; i++){
        sonstr += '*';
    }
    str = str.slice(0, start) + sonstr + str.slice(start+n);
    return str;
}
//    2. html转义
function htmlEncode(html) {
    return text.replace(/\'/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function htmlDecode(text) {
    return text.replace(/&amp;/g, '\'').replace(/&quot;/g, '\"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
}
/*----------------------------------------------------------- 数字格式化--------------------------------------------------------------------*/
/*----------------------------------------------------------- Math方法--------------------------------------------------------------------*/
// 不足两位的补0
// 返回值为字符串： ‘05’ ‘14’
function formatTenths(n) {
    n = n.toString();
    return n[1] ? n : '0' + n
}
// 格式化小数num,保留小数点后n位
// 返回值为字符串类型
function formatDecimals(num, n){
    num = Number(num);
    if(num){
        return num.toFixed(2)
    }else{
        console.log('num参数有问题')
    }
}
// 数字千分位加逗号
// 返回值为字符串类型
function formatProfessional(num){
    num = Number(num);
    if(num){
        num = num + '';
        var arr = num.split('.');
        var len = arr[0].length;
        var remainder, quotient;
        var str = '';
        if(len > 3){
            remainder = len%3;
            quotient = Math.floor(len/3);
            if(remainder){
                str = arr[0].slice(0, remainder) + ',';
            }
            for(var i = 0; i < quotient; i++){
                if (i < quotient-1){
                    str += arr[0].slice(remainder + i*3, remainder + (i+1)*3)+',';
                }else{
                    str += arr[0].slice(remainder + i*3, remainder + (i+1)*3)
                }

            }
            arr[0] = str;
            num = arr.join('.');
        }else{
            return num;
        }
        return num;
    }
}
//  javascript小数加法精度问题
function addTwoFloat(num1,num2){
    var result;
    var arguments = [].slice.apply(arguments);
    var arr=[];
    for(var i=0,leng=arguments.length;i < leng;i++){
        var type = typeof arguments[i],
            instance = arguments[i] instanceof Number;
        if(type !='number' && instance == false) return NaN;
        var str = arguments[i].toString();
        var snum = str.indexOf('.');
        var newstr = str.slice(snum+1);
        arr[i] = newstr.length;
    }
    arr.sort(function(a,b){return b-a});
    result =  (num1*Math.pow(10,arr[0])+num2*Math.pow(10,arr[0]))/Math.pow(10,arr[0]);
    return result;
}
//  阶乘算法,从num开始到1
function factorialize(num){
    var result = num;
    if(num < 0){
        result = -1;
    }else if(num === 0 || num === 1){
        result = 0;
    }else{
        while( num > 1 ){
            num--;
            result *= num;
        }
    }
    return result;
}
/*----------------------------------------------------------- 日期方法--------------------------------------------------------------------*/
// 日期格式化： 年 月 日
// 返回值为 2018/01/02 13:45:30
function formatTime(date, symbol){
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    return [year, month, day].map(formatNumber).join(symbol) + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function updateTime() {
    const date = new Date()
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    this.curTime = hours + ':' + minutes + ':' + seconds
    const _this = this
    setTimeout(function() {
        _this.updateTime()
    }, 1000)
}


/*----------------------------------------------------------- 数组方法--------------------------------------------------------------------*/
/*----------------------------------------------------------- 数组方法--------------------------------------------------------------------*/
/*----------------------------------------------------------- 数组方法--------------------------------------------------------------------*/
/*----------------------------------------------------------- 数组方法--------------------------------------------------------------------*/
//    2.整形数组去重
function deleteRepeatInArr(arr){
    var obj ={};
    var len = arr.length;
    for(var i = 0; i < len; i++){
        if(!obj[arr[i]]){
            obj[arr[i]] = true;
        }else{
            arr.splice(i,1);
            i--;
            len = arr.length;
        }
    }
    return arr;
}
//    5.找出数组中最大差值
function findMax(arr){
    var len = arr.length;
    var max = arr[0],
        min = arr[0];
    for(var i = 0; i < len; i++){
        if(arr[i] > max){
            max = arr[i];
        }else if(arr[i] < min){
            min = arr[i];
        }
    }
    return max - min;
}

// Array indexof 方法
if(!Array.prototype.indexOf){
    Array.prototype.indexOf = function(item){
        for (var i = 0, len = this.length; i < len; i++){
            if(this[i] == item)
                return i;
        }
        return -1;
    }
}
// Array 去重
Array.prototype.uniq = function(){
    var arr = [];
    for(var i = 0, len = this.length; i < len; i++){
        if(arr.indexOf(this[i]) === -1){
            arr.push(this[i]);
        }
    }
    return arr;
};
Array.prototype.uniq_1 = function(){
    var arr = [];
    var obj = {};
    for(var i = 0, len = this.length; i < len; i++){
        if(!obj[this[i]]){
            obj[this[i]] = true;
            arr.push(this[i]);
        }
    }
    return arr;
};
Array.prototype.uniq_2 = function(){
    this.sort(function(a, b){
        return a-b;
    });
    var arr = [this[0]];
    for(var i = 1, len = this.length; i < len; i++){
        if(this[i] != arr[arr.length-1]){
            arr.push(this[i]);
        }
    }
    return arr;
};

