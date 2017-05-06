/**
 * Created by wwtliu on 14/10/24.
 */

// function find(id){
//     return typeof  id=="string"?document.getElementById(id):id;
// }
//
// window.onload = function(){
//     var titleName = find("tab-title").getElementsByTagName("li");
//     var tabContent = find("tab-content").getElementsByTagName("div");
//     if(titleName.length != tabContent.length){
//         return;
//     }
//     for(var i = 0;i<titleName.length;i++){
//         titleName[i].id = i;
//         // debugger;
//         titleName[i].onmouseover = function(){
//             for(var j = 0;j<titleName.length;j++){
//                 titleName[j].className = "";
//                 tabContent[j].style.display = "none"
//             }
//             this.className = "select";
//             tabContent[this.id].style.display = "block";
//         }
//     }
// }

$(document).ready(function(){
    $("#tab-title").on("mouseover",'li',function(){
        $(this).siblings().css('background','white');
        $(this).css('background','red');
        var index=$(this).index();
        console.log(index);
        $('#tab-content div').css('display','none').eq(index).css('display','block');
    })
})