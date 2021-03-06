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