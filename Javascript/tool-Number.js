/**
 * Created by Administrator on 2019/7/21 0021.
 */
// 小数--> 百分比
// 百分比--> 小数
// 数字--> 金额格式
// 金额格式--> 数字

// 判断是否为数字
function isNumber(num) {
    if (num === null || num === '' || (typeof num !== 'string' && typeof num !== 'number')) {
        return ''
    }
    return !isNaN(Number(num))
}

// 小数 ==> 百分比
function toPercent(num, n) {
    if (isNaN(num) || num === '' || num === false || num === null) {
        return '--'
    }
    n = (n || n === 0) ? n : 2
    return Number(num * 100).toFixed(n) + '%'
}
// 百分比 ==> 小数
function toDecimals(num, n) {
    num = String(num).indexOf('%') === String(num).length - 1 ? num.slice(0, -1) :num
    if (isNaN(num) || num === '' || num === false || num === null) {
        return '--'
    }
    n = (n || n === 0) ? n : 2
    return Number(num / 100).toFixed(n)
}


// 数字 ==> 千分位逗号格式
// 参数：数字字符串
function formatNumber(num) {
    if (isNaN(num) || num === '' || num === false || num === null) {
        return '--'
    }
    // 正向肯定预查：确保匹配项后面位数是3的倍数
    // 反向否定预查: 确保小数点后的位数不会被格式化
    return String(num).replace(/(?<!\d+\.\d*)\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
    // return String(num).replace(/(?<=(\d|,)+)\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}
// 千分位逗号格式 ==> 正常数字,
// 参数：数字字符串
function parseNumber(str) {
    const num = String(str).split(',').join('')
    if (!isNaN(num) && num !== '') {
        return num
    }
    return str
}

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
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
// 加法
function add(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m = Math.pow(10, Math.max(r1,r2))
    return (arg1*m+arg2*m)/m
}

// 减法
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
// 乘法
function mul(arg1,arg2){
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try { m+=s1.split(".")[1].length }catch(e){}
    try { m+=s2.split(".")[1].length }catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}
//除法
function div(arg1, arg2){
    var t1 = 0, t2 = 0, r1, r2;
    try { t1 = arg1.toString().split(".")[1].length } catch(e) { t1 = 0}
    try { t2 = arg2.toString().split(".")[1].length } catch(e) { t2 = 0}
    r1 = Number(arg1.toString().replace(".",""))
    r2 = Number(arg2.toString().replace(".",""))
    return (r1/r2)*Math.pow(10,t2-t1);
}




