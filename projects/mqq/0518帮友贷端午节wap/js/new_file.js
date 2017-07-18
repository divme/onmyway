function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}else{
	   window.onload=function(){
	   	oldonload();
	   	func();
	   }
	}
}

function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

function addClass(element,value){
	if(!element.className){
		element.className = value;
	}else{
		element.className+="&nbsp";
		element.className+=value;
	}
}

function moveElement(id,finalx,finaly,interval){
	var elem = document.getElementById(id);
	if(!elem.style.left){ elem.style.left="0px"; }
	if(!elem.style.top){ elem.style.top="0px"; }
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if (xpos == finalx && ypos == finaly){
		 return false;
	}
	if (xpos<finalx){
		var dist =Math.ceil((finalx-xpos)/10);
		xpos+=dist;
	}
	if(xpos>finalx){
		var dist = Math.ceil((xpos-finalx)/10);
		xpos-=dist;
	}
	elem.style.left=xpos + "px";
	elem.style.top=ypos +"px";
}

function prepare(){
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var frame =document.createElement("img");
	frame.setAttribute("src","/img/choujiang1.png");
	frame.setAttribute("alt","艺术就是爆炸");
	frame.setAttribute("id","preview");
}
















































































