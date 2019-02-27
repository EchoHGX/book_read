function setCookie(name, value, seconds) {seconds = seconds || 0;var expires = "";if (seconds != 0 ) {var date = new Date();date.setTime(date.getTime()+(seconds*1000));expires = "; expires="+date.toGMTString();}document.cookie = name+"="+escape(value)+expires+"; path=/";}
function setCookie30(name,value){setCookie(name, value,30*24*60*60);}
function getCookie(name) {var nameEQ = name + "=";var ca = document.cookie.split(';');for(var i=0;i < ca.length;i++) {var c = ca[i];while (c.charAt(0)==' ') {c = c.substring(1,c.length);}if (c.indexOf(nameEQ) == 0) {return unescape(c.substring(nameEQ.length,c.length));}}return false;}
//删除数组指定元素
function removeByValue(arr, val) {for(var i=0; i<arr.length; i++) {if(arr[i] == val) {arr.splice(i, 1);break;}}}
//获取url参数
function getParam(name) {var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");var r = window.location.search.substr(1).match(reg);if (r != null)return decodeURI(r[2]);return null;}
var base = {"A0":"/readUserOfficial/readUser","A1":"/readUnionOfficial/readUnion","A2":"/readWechat/do","A3":"/readSearch","A4":"/readSms"};
var doActionSer = function(m,data, s,bl, callback) {var dat ={"jsonrpc":"2.0","method":m,"params":data};$.ajax({type : 'post',url : base['A'+s],data : JSON.stringify(dat)+"",async : bl || true,success : function(json) {if(callback){callback(json);}}});};
function setParam(cmdid,val){if(val != "")return cmdid +(val.length<10?"0":"")+val.length+val;return "";}
function is_weixn(){var ua = navigator.userAgent.toLowerCase();if(ua.match(/MicroMessenger/i)=="micromessenger") {return true;} else {return false;}  }  
function isMobile(){if(/android/i.test(navigator.userAgent)){return true;}if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){return true;}if(/Linux/i.test(navigator.userAgent)){return true;}if(/Linux/i.test(navigator.platform)){return true;}return false;}
function isSafari(){if(navigator.userAgent.indexOf("Safari")>0&&navigator.userAgent.indexOf("Chrome")<0)return true; else return false;};
function addLink(url){var doc=document;var link=doc.createElement("link");link.setAttribute("rel", "apple-touch-icon"); link.setAttribute("href", url);var heads = doc.getElementsByTagName("head");if(heads.length)heads[0].appendChild(link);else doc.documentElement.appendChild(link);}; 
function isAndroid(){var u = navigator.userAgent;if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1)return true;else return false;}
function isIOS(){var u = navigator.userAgent;if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))return true;else return false;}
var dynamicLoading = {css: function(path){if(!path || path.length === 0){throw new Error('argument "path" is required !');}var head = document.getElementsByTagName('head')[0];var link = document.createElement('link');link.href = path; link.rel = 'stylesheet';link.type = 'text/css';head.appendChild(link);},js: function(path){if(!path || path.length === 0){throw new Error('argument "path" is required !');}var head = document.getElementsByTagName('head')[0];var script = document.createElement('script');script.src = path;script.type = 'text/javascript';head.appendChild(script);}}
/*渠道Id初始化*/
var channel = '100194';
function channelInit(){if(getParam('channel')!=null){channel=getParam('channel');$.cookie("channel",channel, {path: "/", expires: 365 });}if($.cookie('channel')!=null && $.cookie('channel')!='null'){channel=$.cookie('channel');}if(channel=="100194"){$(".foot-menu .client-download").remove()}}
/*用户信息初始化*/
var isLogin = false;
function userInit(){if($.cookie('result')!=null && $.cookie('result')!='null'){var result = null;result=JSON.parse($.cookie('result'));isLogin=true;return result;}}
/*url跳转*/
function urlTo(url){

	console.log("当前地址:"+window.location.href);
	console.log('跳转至:'+"http://shuke.zmapp.com/"+url);
self.location=url;
console.log("当前地址:"+window.location.href);

}

/*书籍图片延迟加载*/
function lazy(clssName){$(clssName).lazyload({effect: "fadeIn",placeholder : "images/146915821024398292_160_224.png"});}
var doActionCmRead = function(data,bl, callback) {$.ajax({type : 'post',url : '/3C/cmread.jsp',data : "data="+JSON.stringify(data),async : bl,success : function(json) {var data =JSON.parse(json);if(callback){callback(data);}}});};
var doActionCmReadLogin = function(data,bl, callback) {$.ajax({type : 'post',url : '/3C/cmread-login.jsp',data : "cmccRm="+data.cmccRm+"&redirectUri="+data.redirectUri,async : bl,success : function(json) {var data =JSON.parse(json);if(callback){callback(data);}}});};
var doActionCmReadRead = function(data,bl, callback) {$.ajax({type : 'post',url : '/3C/cmread-read.jsp',data : "nextUrl="+data.nextUrl+"&userVistorId="+data.userVistorId+"&JSESSIONID="+data.JSESSIONID+"&bid="+data.bid+"&cid="+data.cid,async : bl,success : function(json) {var data =JSON.parse(json);if(callback){callback(data);}}});};
var doActionCmReadChapter = function(data,bl, callback) {$.ajax({type : 'post',url : '/3C/getCmreadChapter.jsp',data : "bid="+data.bid+"&paperPage="+data.paperPage,async : bl,success : function(json) {var data =JSON.parse(json);if(callback){callback(data);}}});};
function judgeCode(){
	channelInit();
	var sys = $.cookie('sys');
	var wxName= '';
	var codeImg = '';
	if(channel!='100256'&&channel!='100244'&&channel!='100258'&&channel!='100261'){
		if(channel=='100219'){
			wxName='书客文学网';
			codeImg='qrcode-100219.png';
		}else{
			wxName='朵拉小说';
			codeImg='qrcode-novel.jpg';
		}
		var html='<div class="bottom-info">';
		html+='<div class="bottom-left">';
		html+='<p>客服</p>';
		html+='<p>时间：&nbsp;周一至周五 9:00-18:00</p>';
		html+='<p>电话：&nbsp;0571-87380215</p>';
		html+='<p>QQ：&nbsp;3312305443</p>';
		html+='<p>微信公众号：&nbsp;'+wxName+'</p>';
		html+='</div>';
		html+='<div class="bottom-right">';
		html+='<img src="images/qrcode/'+codeImg+'">';
		if(is_weixn()){
			html+='<p>长按二维码关注</p>';
		}else{
			html+='<p>扫码关注</p>';
		}
		html+='</div>';
		html+='</div>';
		html+='<div class="bottom-site">';
		html+='<p>本站所收录小说作品、书库评论均属其个人行为，不代表本站立场！</p>';
		html+='</div>';
		$('.bottom-qrcode').append(html);
	}	
}
function _auto(){var e=360,t=document.documentElement.clientWidth;if(t!==e){var n=document.getElementsByTagName("head")[0],m=document.createElement("style");m.innerHTML="html{font-size:"+t/e*100+"%;}",n.appendChild(m);}};

var download = {
	downloadCount:function(){
		if(isAndroid()){
			doActionSer("sumClickDown",{"type":"1"},2,true,recall);
		}else if(isIOS()){
			doActionSer("sumClickDown",{"type":"2"},2,true,recall);
		}
		function recall(res){
			urlTo('http://a.app.qq.com/o/simple.jsp?pkgname=com.zmapp.shuke');
		}
	}
		
};
/*localStorageAPI*/
var localSto = {
	setLocalStorage: function(key, value) {
	    try {
	        if (localStorage) {
	            localStorage.setItem(key, value);
	        }
	    } catch(e) {}
	},
	getLocalStorage: function(key) {
        try {
            if (localStorage) {
                return localStorage.getItem(key);
            }
        } catch(e) {}
    },
    removeLocalStorage: function(key) {
        try {
            if (localStorage) {
                return localStorage.removeItem(key);
            }
        } catch(e) {}
    }
};
var shareUtil = {
	
	/*android版本展示分享选择栏并可分享*/	
	androidShareChoseShow : function(){
		var local = window.location.href;
    	var $cancel = $('.share-bottom-box .share-chose-area .share-cancel');
    	var $box = $('.share-bottom-box');
    	var $unit = $('.share-bottom-box .share-chose-area .unit');
    	$box.show();
    	
    	$unit.on('click',function(){
    		if($(this).hasClass('wx-friend')){
    			shareInfo.isCircle=0;
    		}else{
    			shareInfo.isCircle=1;
    		}
    		zmappwebviewjs.doAction(JSON.stringify({'a':'WxShare','callback':'shareUtil.resShareWx','title':shareInfo.title,'subtitle':shareInfo.subtitle,'icon':shareInfo.icon,'url':shareInfo.url,'isCircle':shareInfo.isCircle}));
    		
    	});
    	$cancel.on('click',function(){
    		$box.hide();
    		$cancel.off('click');
    		$unit.off('click');
    	});
	},
	resShareWx :function(){
		alert('分享成功');
	},
	/*分享初始化*/
	shareInit : function($area){
		var local = window.location.href;
		var sys = local.indexOf('b-read-new')==-1?$.cookie("sys"):cookie_api_atl.cookie("sys");
		var appvcP = local.indexOf('b-read-new')==-1?$.cookie("appvc"):cookie_api_atl.cookie("appvc");
		var appvc = isNaN(parseInt(appvcP))?0:parseInt(appvcP);		
		var html = '';
		
		
    	if(sys!=null){
    		if(sys=='android'){
    			if(appvc>=25000){
					/*25000版本之后增加分享*/
					html = '<div class="share-bottom-box">'
						+'<div class="share-chose-area">'
							+'<div class="title">分享</div>'
							+'<a class="unit wx-friend" href="javascript:;">'
							+'<img src="images/icon/share-friend.png">'
							+'<p>发送给朋友</p>'
							+'</a>'
							+'<a class="unit wx-friends" href="javascript:;">'
								+'<img src="images/icon/share-friends.png">'
								+'<p>分享至朋友圈</p>'
							+'</a>'
							+'<a class="share-cancel">'
								+'<img src="images/icon/share-cancel.png">'
							+'</a>'
						+'</div>'
					+'</div>';
				}else{
					if(local.indexOf('b-read')!=-1){
	    				/*阅读界面*/
	    				$('.share').hide();
	    				$('.old-ver').css('right','10px');
	    			}else if(local.indexOf('b-detail')!=-1){
	    				/*书本详情界面*/
	    				$('.de-share').hide();
	    				$('.header-search').css('right','0');
	    			}else if(local.indexOf('act-week')!=-1){
	    				/*抢书券*/
	    				$('.act-share').hide();
	    			}else{
	    				$('.share').hide();
	    			}
				}
    		}
    	}else{
    		html = '<div class="share-box"><img src="images/tip/share-tip.png" class="share-tip"><img src="images/button/share-know.png" class="share-know"></div>';
    	}
    	$area = $area ? $area : $('body');
		$area.append(html);
    },
    /*分享展示*/
    shareShow : function($btn){
    	var local = window.location.href;
    	var sys = local.indexOf('b-read-new')==-1?$.cookie("sys"):cookie_api_atl.cookie("sys");
    	if(sys!=null){
    		if(sys=='android'){
    			$btn.on('click',function(){
					shareUtil.androidShareChoseShow();
				});    			
    		}else if(sys=='os'){
    			if(local.indexOf('b-read')!=-1){
    				/*阅读界面*/
    				$('.share').hide();
    				$('.old-ver').css('right','10px');
    			}else if(local.indexOf('b-detail')!=-1){
    				/*书本详情界面*/
    				$('.de-share').hide();
    				$('.header-search').css('right','0');
    			}else if(local.indexOf('act-week')!=-1){
    				/*抢书券*/
    				$('.act-share').hide();
    			}else{
    				$('.share').hide();
    			}
    		}
    		
    	}else{
    		if(is_weixn()){
    			
    			$btn.on('click',function(res){
        			var $shareBox = $('.share-box');
        			var $shareKnow = $('.share-box .share-know');
        			
        			$shareBox.show();
        			$shareKnow.on('click',function(res){
        				$shareBox.hide();
        				$shareKnow.off('click');
        			});
        		});
    		}else{
    			$btn.on('click',function(res){
        			alert('分享功能暂只支持微信及客户端中使用哦！');
        		});
    		}
    		
    	}
    }
};
var historyUtil = {
	/*返回上一页特殊处理，如果当前页为第一页则返回按钮返回至指定页或首页*/
	setBack : function($area,url){
		url = url ? url : 'index.html';
		if(window.history.length==1){
			$area.attr('href',url);
		}else{
			$area.attr('href','javascript:history.go(-1)');
		}
	}
		
};

var shareInfo ={
		'title':'朵拉小说',
		'subtitle':'朵拉小说——追书看小说，超便捷的手机阅读神器',
		'icon':"http://zmring.oss-cn-hangzhou.aliyuncs.com/book/novel/icon.png",
		'url':'http://shuke.zmapp.com/',
		'isCircle':'1' //1 朋友圈         0 好友
};
/*获取优惠券组件*/
var couponUtil =function(){
	var top = 13;
	
	function getCouponHtml(top,price){
		var couponhtml = '<div class="coupon-area" style="top:0;left:0;z-index:999999;position:fixed;background:rgba(0,0,0,.9);width:100%;height:100%;">'
			+'<img src="images/coupon/coupon-bg-read.png" style="position:absolute; width:20rem; top:8rem;left:calc(50% - 10rem)">'
			+'<img class="coupon-cancel" src="images/coupon/box-cancel.png" style="position:absolute; width:1.4rem; top:7rem; left:calc(50% + 5rem)">'
			+'<div style="width:100%;color:#fff;font-size:3rem;position:absolute;top:'+top+'rem;text-align:center;">'+price+'<span style="font-size:1.4rem;">元</span></div>'
			+'<div style="position:absolute;top:19.2rem;width:100%;text-align:center; color:#fff">'
			+'<p>送你'+price+'元红包</p>'
			+'<p>今天你被包养了！</p>'
			+'</div>'
			+'<div style="width:100%;color:#ED638B; text-align:center;font-size:.9rem;position:absolute;top:27rem;">'
			+'<a class="receive" href="javascript:; "style="color:#ED638B;margin:0 1rem;display:inline-block;height:2rem;line-height:2rem;width:6rem;border:2px solid #ED638B;border-radius:1rem;">点击领取</a>'
			+'<a href="p-coupon.html" style="color:#ED638B;margin:0 1rem;display:inline-block;height:2rem;line-height:2rem;width:6rem;border:2px solid #ED638B;border-radius:1rem;">查看奖励</a>'
			+'</div>'
			+'</div>';
		return couponhtml;
	}
	
	
	
	var tiphtml = '<div class="coupon-tip" style="position:fixed;top:16rem;width:100%;text-align:center;z-index:999999;">'
		+'<div style="font-size:.9rem;background-color:rgba(0,0,0,.7);color:#fff;max-width:16rem;display:inline-block;padding:.6rem;">领取成功，请前往个人中心查看</div>'
		+'</div>';
	
	return{
		Couponshow : function(price){
			if(!price){
				price =0;
			}
			var $area = null;
			
			var url = window.location.href;
			if(url.indexOf('new')==-1){
				$area=$('.wrapper');
				top = 13;
			}else{
				$area=$('body');	
				top=14.3;
			}
			$area.append(getCouponHtml(top,price));	
			
			$('.coupon-area .coupon-cancel').on('click',function(){
				$('.coupon-area').hide();
			});
			
			$('.coupon-area .receive').on('click',function(){
				$('.coupon-area').hide();
				$area.append(tiphtml);
				setTimeout(function(){
					$('.coupon-tip').hide();
				},2000);
			});
		},
		
		getCoupon : function(){
			/*开始时间*/
			var startMill = 1518051600000;//20180208
			/*结束时间*/
			var endMill = 1519401600000;//20180223
			
			var date = new Date();
			var dateMill = date.getTime();
			
			var sys = null;
			var url = window.location.href;
			
			if(url.indexOf('new')==-1){
				sys = $.cookie('sys');
			}else{
				sys = cookie_api_atl.cookie('sys');
			}
			/*去除不参与此次活动的情况*/
			if(sys==null&&channel!='100259'&channel!='100260'){
				/*活动时间内*/
				if(channel == '100270'||(dateMill>=startMill&&dateMill<=endMill)){
					var time =''+date.getFullYear()+(date.getMonth()+1)+date.getDate();
					var timeSto = localSto.getLocalStorage('couponTime');
					
					if(!timeSto||time!=timeSto){
						localSto.setLocalStorage('couponCisitTimes','1');
						localSto.setLocalStorage('couponTime',time);
						console.log("次数"+localSto.getLocalStorage('couponCisitTimes'));
					}
					var times = Number(localSto.getLocalStorage('couponCisitTimes'));
					if(times<10){
						times++;
						localSto.setLocalStorage('couponCisitTimes',times+'');
					}else if(times==10){
						console.log('抽奖');
						doActionSer("userGetCoupon",{"pid":pid},2,true,function(res){
							if(typeof res =='string'){
								res = JSON.parse(res);
							}	
							console.log(res);
							if(res.result.retcode==1){
								var price = parseInt(res.result.num)/100;
								couponUtil.Couponshow(price);
							}
						});
						times++;
						localSto.setLocalStorage('couponCisitTimes',times+'');
					}
				}
				
			}
			
		}
	};
}();

Date.prototype.Format = function(fmt)   
{ 
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
};
//用于统计用户活跃，同一台设备一天只会上传一次
(function(){
	var url = window.location.href;
	//var channel = 100001;
	var user = null;
	if(url.indexOf('b-read-new')==-1){
		channelInit();
		user= userInit();
	}else{
		if(getParam('channel')!=null){
			channel=getParam('channel');
			cookie_api_atl.cookie("channel",channel, {path: "/", expires: 365 });
		}
		if(cookie_api_atl.cookie('channel')!=null && cookie_api_atl.cookie('channel')!='null'){
			channel=cookie_api_atl.cookie('channel');
		}
		if(cookie_api_atl.cookie('result')!=null && cookie_api_atl.cookie('result')!='null'){
			user=JSON.parse(cookie_api_atl.cookie('result'));
			isLogin=true;
		}
	}
	
	var dateActive = localSto.getLocalStorage('dateActive');
	var dateStrNow = new Date().Format("yyyy-MM-dd");
	if(dateActive!=dateStrNow){
		var uid= 0;
		var sex= 0;//0未知1男2女 
		if(isLogin){
			sex= user.userinfo.sex;
			uid= user.userinfo.pid;
			doActionSer("getUserActiveInfo",{"pid":""+uid,"sex":""+sex,"channel":""+channel},2,true,function(res){
			localSto.setLocalStorage('dateActive',dateStrNow);
		});
		}
		
	}
})();
