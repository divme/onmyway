var initWidth = 0;
if(document.documentElement.clientWidth > 100){
    initWidth = document.documentElement.clientWidth;
}else{
    initWidth = Math.max(window.innerWidth, screen.availWidth);
    initWidth = initWidth > 10? initWidth : 360;
}
document.documentElement.style.fontSize = initWidth / 3.75 + 'px';
