var e=360;
var h= $(window).height();
var w = $(window).width();
function browserRedirect() { 
	var sUserAgent= navigator.userAgent.toLowerCase(); 
	var bIsIpad= sUserAgent.match(/ipad/i) == "ipad"; 
	var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os"; 
	var bIsMidp= sUserAgent.match(/midp/i) == "midp"; 
	var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"; 
	var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb"; 
	var bIsAndroid= sUserAgent.match(/android/i) == "android"; 
	var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce"; 
	var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile"; 
	
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		var t=document.documentElement.clientWidth;if(t!==e){var n=document.getElementsByTagName("head")[0],m=document.createElement("style");m.innerHTML="html{font-size:"+t/e*100+"%;}",n.appendChild(m);}
		$(".top").width(w);
		$(".change").width(w);
		$("#screen").height(h*0.72);
		crossScreen();
	} else { 
		$("body").css({"width":"500px","margin":"0 auto"});
		$(".top").css({"width":"500px","margin":"0 auto"});
	    $(".change").css({"width":"500px","margin-left":"-250px","left":"50%"});
	} 
} 
browserRedirect();
//横屏状态的方法
function crossScreen(){
	if (window.orientation === 90 || window.orientation === -90 ){
    	var t=document.documentElement.clientHeight;e=t;if(t!==e){var n=document.getElementsByTagName("head")[0],m=document.createElement("style");m.innerHTML="html{font-size:"+t/e*100+"%;}",n.appendChild(m);} 
       	$("body").css({"width":"500px","margin":"0 auto"});
       	$(".top").css({"width":"500px","margin":"0 auto"});
        $(".change").css({"width":"500px","margin":"0 auto"});
	    $("#screen").height(h*0.72);
    };
}
//判断手机横竖屏状态：  
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
	//竖屏状态  
    if (window.orientation === 180 || window.orientation === 0) {
       	//location.reload();
       	var t=document.documentElement.clientWidth;e=360;if(t!==e){var n=document.getElementsByTagName("head")[0],m=document.createElement("style");m.innerHTML="html{font-size:"+t/e*100+"%;}",n.appendChild(m);}
       	$(".top").width(w);
       	$(".change").width(w);
		$("#screen").height(h*0.72);
       	$("body").css("width","100%");
    };
    //横屏状态 
    crossScreen();
}, true);   
//移动端的浏览器一般都支持window.orientation这个参数，通过这个参数可以判断出手机是处在横屏还是竖屏状态。  