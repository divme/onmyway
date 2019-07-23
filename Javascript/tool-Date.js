// 格式化日期： 年月日  时分秒
// 参数： 第一个可以接受的日期格式，第二个是否只有日期，第三个日期连接符，第四个时间连接符
function formatDate(time, onlyDate, symbol1, symbol2) {
    symbol1 = symbol1 || '-'
    symbol2 = symbol2 || ':'
    if (time) {
        var date = new Date(time)
        /* 在日期格式中，月份是从0开始的，因此要加1
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        var year = date.getFullYear()
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            return '--'
        }
        // 拼接
        if (onlyDate) {
            return year + symbol1 + month + symbol1 + day
        }
        return year + symbol1 + month + symbol1 + day + ' ' + hours + symbol2 + minutes + symbol2 + seconds
    }
    return ''
}
// 格式化时间：时：分：秒
function formatTime(time, symbol) {
    symbol = symbol || ':'
    if (time) {
        var date = new Date(time)
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            return '--'
        }
        // 拼接
        return hours + symbol + minutes + symbol + seconds
    }
    return ''
}