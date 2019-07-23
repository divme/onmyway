/**
 * Created by Administrator on 2019/7/21 0021.
 */

// 两个数字比较是否相等
function ifEqual(n, m){
    return Math.abs(n - m) < Number.EPSILON
}

// 格式化金额
// 数字类处理函数，支持 12.74 和 1,238,12.55 两种格式
// 保留几位小数
// todo
function keepDecimals(num, n) {
    if (String(num).indexOf(',') > -1) {
        num = num.split(',').join('')
        if (isNaN(Number(num))) {
            return '--'
        }
    }
    if (isNaN(num) || num === null || num === '') {
        return '--'
    }
    n = (n || n === 0) ? n : 2
    return Number(num).toFixed(n)
}
// 小数转化为百分比
function toPercent(num, n) {
    if (String(num).indexOf(',') > -1) {
        num = num.split(',').join('')
        if (isNaN(Number(num))) {
            return '--'
        }
    }
    if (isNaN(num) || num === null || num === '') {
        return '--'
    }
    n = (n || n === 0) ? n : 2
    return Number(num * 100).toFixed(n) + '%'
}
// todo
// 百分比数字转化为小数
function toDecimals(num, n) {
    if (String(num).indexOf(',') > -1) {
        num = num.split(',').join('')
        if (isNaN(Number(num))) {
            return '--'
        }
    }
    if (isNaN(num) || num === null || num === '') {
        return '--'
    }
    n = (n || n === 0) ? n : 4
    return Number(num / 100).toFixed(n)
}
// 小数加法
// todo
function addition(n, m) {
    if (isNaN(n) || isNaN(m) || n === null || m === null || n === '' || m === '') {
        return '--'
    }
    return Number(n) + Number(m)
}

// 数字格式化为千分位逗号格式
// 参数：数字字符串
function formatNumber(num) {
    // 在table中不是数字，自动写入 '--'
    if (isNaN(num) || num === null || num === '') {
        return '--'
    }
    const arr = String(num).split('.')
    if (arr[0].length > 3) {
        arr[0] = arr[0].replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
        num = arr.join('.')
        return num
    } else {
        return num
    }
}
// 千分位逗号格式，解析为正常数字,
// 参数：数字字符串
function parseNumber(str) {
    const num = String(str).split(',').join('')
    if (!isNaN(num) && num !== '') {
        return num
    }
    return str
}

// 判断是否为数字
function isNumber(num) {
    if (num === null || num === '' || (typeof num !== 'string' && typeof num !== 'number')) {
        return ''
    }
    return !isNaN(Number(num))
}

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return String --金额格式的字符串,如'1,234,567.45'
 * @type
 */
function formatMoney(num, decimal) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
        num = "0";
    var sign = (num == (num = Math.abs(num)));
    var cents = 0;
    if(decimal > 0)
    {
        num = Math.floor(num*100+0.50000000001);
        cents = num%100;
        num = Math.floor(num/100).toString();
        if(cents<10)
            cents = "0" + cents;
    }
    else
    {
        num = num.toString();
    }
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
        num = num.substring(0,num.length-(4*i+3))+','+ num.substring(num.length-(4*i+3));

    var result = ((sign)?'':'-') + num;
    if(decimal > 0)
    {
        return (result + '.' + cents);
    }

    return result;
}

// -------------------------------------------------计算精度问题--------------------------------------------
//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function div(arg1,arg2){
    var t1 = 0, t2 = 0, r1, r2;
    try {t1 = arg1.toString().split(".")[1].length} catch(e) { t1 = 0}
    try {t2 = arg2.toString().split(".")[1].length} catch(e) { t2 = 0}
    r1 = Number(arg1.toString().replace(".",""))
    r2 = Number(arg2.toString().replace(".",""))
    return (r1/r2)*Math.pow(10,t2-t1);
}


//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：mul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function mul(arg1,arg2)
{
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

// 加法
function add(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m = Math.pow(10, Math.max(r1,r2))
    return (arg1*m+arg2*m)/m
}

// 减法：
function subtr(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //last modify by deeka
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
}