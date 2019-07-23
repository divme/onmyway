// 判断一个变量之数据类型
// number string boolean null undefined object function array date regexp
function dataType(m) {
    var type = typeof m;
    if (type === 'object') {
       type = Object.prototype.toString.call(m).slice(8, -1).toLowerCase()
    }
    return type
}