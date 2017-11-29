/**
 * Created by mszq on 2017/11/25.
 */
var i=0;

function timedCount()
{
    i=i+1;
    window.postMessage(i, 'webworker.html');
    setTimeout("timedCount()",500);
}

timedCount();