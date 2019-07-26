/*
* created by zy on 2019.07.26
*/

// 可以选择：年月日 时分秒 or 年月日 or 时分秒
// option = {
//     onlyDate: true/false,
//     onlyTime: true/false,
//     dateSymbol: '--',
//     timeSymbol: ':'
// }
function formatTime(time, option) {
    option = option? option : {}
    var dateSymbol = option.dateSymbol || '-'
    var timeSymbol = option.timeSymbol || ':'
    if (time) {
        var date = new Date(time)
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
        if (option.onlyDate) {
            return year + dateSymbol + month + dateSymbol + day
        }
        if (option.onlyTime) {
            return hours + timeSymbol + minutes + timeSymbol + seconds
        }
        return year + dateSymbol + month + dateSymbol + day + ' ' + hours + timeSymbol + minutes + timeSymbol + seconds
    }
    return ''
}
// 格式化时间：年月日，时分秒
function formatDate(time, dateSymbol, timeSymbol) {
    dateSymbol = option.dateSymbol || '-'
    timeSymbol = option.timeSymbol || ':'
    if (time) {
        var date = new Date(time)
        var year = date.getFullYear()
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            return '--'
        }
        return year + dateSymbol + month + dateSymbol + day + ' ' + hours + timeSymbol + minutes + timeSymbol + seconds
    }
    return ''
}
// 格式化时间：年月日
function formatYmd(time, symbol) {
    symbol = symbol || '-'
    if (time) {
        var date = new Date(time)
        var year = date.getFullYear()
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        if (isNaN(year) || isNaN(month) || isNaN(day)) {
            return '--'
        }
        return year + symbol + month + symbol + day
    }
    return ''
}
// 格式化时间：时分秒
function formatHms(time, symbol) {
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