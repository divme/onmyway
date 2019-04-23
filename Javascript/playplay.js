
//    4.不借助临时变量，进行两个整数交换
function change(a, b){
    a = [b, b = a][0];
    return [a,b];
}
//    10.生成n项菲波那切数列数组
function fiboone(len){
    var fb = [];
    var  i = 0;
    while ( i < len){
        if( i <= 1 ){
            fb.push(i);
        }else{
            fb.push(fb[i-1] + fb[i-2]);
        }
        i++;
    }
    return fb;
}