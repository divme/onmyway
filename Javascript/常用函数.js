/**
 * Created by mszq on 2018/2/6.
 */

// 格式化小数,保留小数点后n位
// num： 数字或者可化为数字的字符串
// n: 小数点后保留n位
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


// 日期格式化： 年 月 日
function formatTime(date, symbol){
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();

        return [year, month, day].map(formatNumber).join(symbol) + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 不足两位的补0
function formatTenths(n) {
    n = n.toString();
    return n[1] ? n : '0' + n
}