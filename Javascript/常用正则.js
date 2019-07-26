// ---------------------数字校验--------------------
// 1.非负整数
var r1 = /^\d+$/
// 2.n位的数字
var r2 = /^\d{n}$/
// 3.至少n位的数字
var r3 = /^\d{n,}$/
// 4.m~n位的数字
var r4 = /^\d{n,m}$/
// 5.零和非零开头的数字
var r5 = /^(0|[1-9]\d*)$/
// 6.带1~2位小数的正数或负数
var r6 = /^(\-)?\d+(\.\d{1,2})?$/
// 7.正数 负数 和 小数
var r7 = /^(\-)?\d+(\.\d+)?$/
// 8.有两位小数的正实数
var r8 = /^\d+(\.\d{2})?$/
// 9.有1~3位小数的正实数
var r9 = /^\d+(\.\d{1,3})?$/
// 10.非零的正整数
var r10 = /^[1-9]\d*$/
// 11.非零的负整数
var r11 = /^\-[1-9]\d*$/
// 12.非负整数
var r12 = /^\d+$/
// 13.非正整数
var r13 = /^0|\-[1-9]\d*$/
// 14.非负浮点数
var r14 = /^\d+\.[1-9]\d+$/
// 15.非正浮点数
// 16.正浮点数
// 17.负浮点数
// 18.浮点数


// ------------------字符校验---------------
// 汉字
var s1 = /^[\u4e00-\u9fa5]*$/
// 英文和数字
var s2 = /^[a-zA-Z0-9]+$/
// 长度为3-20的所有字符
var s3 = /^.{3,20}$/
// 由26个英文字母组成的字符串
var s4 = /^[a-zA-Z]+$/
// 由26个大写英文字母组成的字符串
// 由26个小写英文字母组成的字符串
// 由数字和26个英文字母组成的字符串
var s7 = /^[1-9a-zA-Z]+$/
// 由数字、26个英文字母或者下划线组成的字符串
var s8 = /^\w+$/
// 中文、英文、数字包括下划线
var s9 = /^[\u4e00-\u9fa5\w]$/
// 中文、英文、数字但不包括下划线等符号
var s10 = /^[\u4e00-\u9fa5\d]$/
// 可以输入含有^%&',;=?$\"等字符
// 禁止输入含有~的字符

// ------------------特殊需求表达式---------------
// Email地址

// 手机号码
// 身份证号(15位、18位数字)，最后一位是校验位，可能为数字或字符X
// 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)
// 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
// 强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间)
// 强密码(必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-10之间)
// 一年的12个月(01～09和1～12)
// 一个月的31天(01～09和1～31)
// 钱的输入格式
// 中文字符
// 空白行
