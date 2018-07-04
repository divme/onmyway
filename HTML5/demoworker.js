/**
 * Created by mszq on 2017/11/25.
 */
// var i=0;
//
// function timedCount()
// {
//     i=i+1;
//     window.postMessage(i, 'webworker.html');
//     setTimeout("timedCount()",500);
// }
//
// timedCount();

self.onmessage = function(e){
    var jstr = JSON.parse(e.data);
    jstr.a = 10;
    jstr.b = 20;
    jstr.c = 30;
    jstr = JSON.stringify(jstr);
    self.postMessage(jstr);
};
