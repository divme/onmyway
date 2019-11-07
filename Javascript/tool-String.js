// 解析字符串
function template(html, obj) {
    return html.replace(/\{\{(.*?)\}\}/g, function(match, key) {
        return obj[key.trim()];
    });
}

template('{{name}}很厉name害，才{{ age }}岁', { name: 'jawil', age: '15' });