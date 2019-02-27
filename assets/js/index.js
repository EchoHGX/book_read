/*该方法用于用户在首页进入相应页面时添加标志，防止统计页面访问数时重复计数*/
function linkAddFlag(position){
	/*
	 * position
	 * 	1:分类页
	 * 	2:排行页
	 *  3:折扣页
	 *  4:精品页
	 * */
	var url = 'index.html';
	switch(position){
		case 1:localSto.setLocalStorage('bookclassifyFlag', 1);url ='t-bookclassify.html';break;
		case 2:localSto.setLocalStorage('bookrankFlag', 1);url ='t-bookrank.html';break;
		case 3:localSto.setLocalStorage('freecountFlag', 1);url ='t-freecount.html';break;
		case 4:localSto.setLocalStorage('subjectFlag', 1);url ='t-subject.html';break;
		case 5:localSto.setLocalStorage('latelyFlag', 1);url ='lately.html';break;
	}
	urlTo(url);
}

$(function(){ 
	
		_auto();
		window.onresize=function(){_auto();};
		/*渠道Id初始化*/
		channelInit();
	
		/*安卓、IOS 相关*/
		if(getParam('v')!=null){
			v=getParam('v');
			$.cookie("v",v, {path: "/", expires: 365 });
		}
		var sys=$.cookie("sys");;
	  	if(getParam('sys')!=null){
			sys=getParam('sys');
			$.cookie("sys",sys, {path: "/", expires: 365 });
			if(sys=='android'){
				//android系统保存版本信息
				var appvc = getParam('appvc');
				$.cookie("appvc",appvc, {path: "/", expires: 365 });
			}
			
		}	
	
	  	
	  	/*100224爱汇渠道转至爱汇页面*/
		if(channelTools.judgeChannel100224(channel)){
			channelTools.channel100224VerChange();
			channelTools.channel100224Login();
	  	}
		
		
		var countDown;
		
		/*获取公共首页内容*/
		doActionSer("mainPage",{"channel":""+channel},2,true,recall);
		
		function recall(res){
			var html = template('page', {});
			$(".main-page").append(html);
			
			if((channel=='100225'||channel=='100223')&&sys!=null){
				var fwid = getParam('fwid');
				var fwname =getParam('fwname');
				var fwsex =getParam('fwsex');
				var fwsign =getParam('fwsign');
				doActionSer("fwLogin",{"fwid":""+fwid,"fwname":""+fwname,"fwsex":""+fwsex,"fwsign":""+fwsign,"channel":""+channel},2,true,fwrecall);
				function fwrecall(res){
					if(!res.result.retcode){
						$.cookie("result",JSON.stringify(res.result), {path: "/", expires: 365 });
						var user = userInit();
						if(isLogin){
							$('.person_img img').attr('src',user.userinfo.imageurl);
						}
						if(sys=="android"){
							zmappwebviewjs.doAction(JSON.stringify({'a':'resH5','callback':'resWapCheck','userinfo':{'code':'1'}}));
						}else if(sys=="os"){
							WebViewJavascriptBridge.callHandler('doAction', {'a':'resH5','callback':'resWapCheck','userinfo':{'code':'1'}}, function(response) {
			    				console.log('JS got response', response);
			    			});
						}
					}else{
						if(sys=="android"){
							zmappwebviewjs.doAction(JSON.stringify({'a':'resH5','callback':'resWapCheck','userinfo':{'code':'0'}}));
						}else if(sys=="os"){
							WebViewJavascriptBridge.callHandler('doAction', {'a':'resH5','callback':'resWapCheck','userinfo':{'code':'0'}}, function(response) {
			    				console.log('JS got response', response);
			    			});
						}
					}
					
					function resWapCheck(){
						
					}
					
				}
			}

						/*用户信息初始化*/
			var user = userInit();
			var pid = "";
			/*绘制用户头像*/
			if(isLogin){
				$('.person_img img').attr('src',user.userinfo.imageurl);
				pid=user.userinfo.pid;
				if(is_weixn()){
					if(!$.cookie("wxopenid")){
						window.location.href="getId.jsp?state="+pid+"4";
					}
				}

			}
			
			drawIndexContent(res);
			
			judgeCode();
			 /*下载添加点击事件*/
			 $('.client-download').click(function(){
				download.downloadCount(); 
			 });
		}
		
		
		/*绘制首页内容*/
		function drawIndexContent(res){
			/*清空原有的数据*/
			$("#topAdv").html("");
			$(".book-content").html("");
			if(countDown){
				clearInterval(countDown);
			}
			
			/*绘制首页广告*/
			var advlist = {};
			
			advlist["topadvlist"]=res.result.topadvlist;
			advlist["channel"]=channel;
			var html = template('banner', advlist);
			$("#topAdv").append(html);
			/*轮播广告添加特效*/
			TouchSlide({
				slideCell:"#ad_banner",
				titCell : ".hd ul",
				mainCell : ".bd ul",
				effect : "leftLoop",
				autoPage : true,
				autoPlay : true,
				interTime:3000
			});
			if(res.result.moduleList!=null){
				var moduleList = res.result.moduleList;
				var moduleLength = res.result.moduleList.length;
				for(var i=0;i<moduleLength;i++){
					var module =moduleList[i];
					var type = Number(module.type);	
					switchType(type,module);				
				}
			}
			
			/*延迟加载书本图片*/
			lazy('.lazy_img');
		}
		
		
		
		function switchType(type,module){
			switch(type){
				case 1:
					drawType1(module);
					break;
				case 2:
					drawType2(module);
					break;
				case 3:
					drawType3(module);
					break;
				case 4:
					drawType4(module);
					break;
				case 5:
					drawType5(module);
					break;
				case 6:
					drawType6(module);
					break;
				case 7:
					drawType7(module);
					break;
				
			}
		}
		
		function drawType7(module){
			
			module["channel"]=channel;
			for(var i in module.param){
				module.param[i].bookinfo.price = (Number(module.param[i].bookinfo.price*0.01)).toFixed(2);
				module.param[i].desc  = (Number(module.param[i].desc*0.01)).toFixed(2);
			}
			
			var html = template('type7', module);
			$(".book-content").append(html);
			
			/*添加倒计时特效*/

			var secondsLast = parseInt(module.left_time);
			var d ={};
			d.leave =secondsLast;
			d.days = '00';
			d.hours = '00';
			d.minutes = '00';
			d.seconds = '00';
			
			function getRestTime(){
				d.leave--;
				if(d.leave>=0){
					var leave = d.leave % (12 * 30 * 24 * 3600);  
					//计算出相差天数
					var leave0 = leave % (30 * 24 * 3600);
					d.days = d.leave < 0 ? 0 :Math.floor(leave0 / (24 * 3600));
					//计算出小时数
					var leave1 = leave0 % (24 * 3600);    
					d.hours = d.leave < 0 ? 0 : Math.floor(leave1 / 3600);
					//计算相差分钟数
					var leave2 = leave1 % (3600);         
					d.minutes = d.leave < 0 ? 0 : Math.floor(leave2 / 60);
					//计算相差秒数
					var leave3 = leave2 % (60);       
					d.seconds = d.leave < 0 ? 0 : Math.round(leave3 );
					
					for(var key in d){
						if(key!=="leave"){
							d[key]=d[key] < 10 ? '0' + d[key] : '' + d[key];
						}
					}
					$(".seckill .count-down .day").html(d.days);
					$(".seckill .count-down .hour").html(d.hours);
					$(".seckill .count-down .minute").html(d.minutes);
					$(".seckill .count-down .second").html(d.seconds);
				}else{
					if(countDown){
						clearInterval(countDown);
					}
				}
			}
			countDown = setInterval(getRestTime,1000);
		}
		
		function drawType6(module){
			module["channel"]=channel;
			var html = template('type6', module);
			$(".book-content").append(html);
		}
		function drawType5(module){
			module["channel"]=channel;
			var html = template('type5', module);
			$(".book-content").append(html);
		}
		
		function drawType4(module){
			module["channel"]=channel;
			var html = template('type4', module);
			$(".book-content").append(html);
		}
		
		function drawType3(module){
			module["channel"]=channel;
			var html = template('type3', module);
			$(".book-content").append(html);
		}
		
		function drawType2(module){
			console.log(module);
			module["channel"]=channel;
			var length = module.param.length;
			
			var html = template('type2', module);
			$(".book-content").append(html);
			$('#scroller').css('width',length*7+'rem');
			
			var myScroll= new IScroll('#wrapper', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

		}
		
		function drawType1(module){
			module["channel"]=channel;
			var html = template('type1', module);
			$(".book-content").append(html);
			
			/*添加男女生标签点击切换事件*/
			$(".sex-change").click(function(){
				var img= $(".sex-change").attr('src')+'';
				if(img.indexOf('boy')!=-1){
					$(".sex-change").attr('src','images/girl.png');
					$(".recomm-girl").show();
					$(".recomm-boy").hide();
				}else{
					$(".sex-change").attr('src','images/boy.png');
					$(".recomm-boy").show();
					$(".recomm-girl").hide();
				}
			});
		}
		
		if(sys=="os"){
			
			//设置WebViewJavascriptBridge
			setupWebViewJavascriptBridge(function(bridge) {
				//注册一个从OC调用过来执行的JS方法
				bridge.registerHandler('resCallback', function(data, responseCallback) {
					if(data["callback"]){
						var fn = eval("("+data["callback"]+")");
						if(typeof(fn)=="function"){
							fn.apply(this, [data,responseCallback]);  
						}
					}else{}
					//responseCallback('js执行过了');
				});
			});
			LoadBtnOnClick();
		}
	
	
		
		/*os*/
		//定义一个WebViewJavascriptBridge的全局变量
		function setupWebViewJavascriptBridge(callback) {
			if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
			if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
			window.WVJBCallbacks = [callback];
			var WVJBIframe = document.createElement('iframe');
			WVJBIframe.style.display = 'none';
			WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
			document.documentElement.appendChild(WVJBIframe);
			setTimeout(function() { document.documentElement.removeChild(WVJBIframe);}, 0);
		}
		
		/*os*/
		//定义一个WebViewJavascriptBridge的全局变量
		function setupWebViewJavascriptBridge(callback) {
			if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
			if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
			window.WVJBCallbacks = [callback];
			var WVJBIframe = document.createElement('iframe');
			WVJBIframe.style.display = 'none';
			WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
			document.documentElement.appendChild(WVJBIframe);
			setTimeout(function() { document.documentElement.removeChild(WVJBIframe);}, 0);
		}

		//加载调用
		function LoadBtnOnClick() {
			//调用OC方法传入参数
		    WebViewJavascriptBridge.callHandler('doAction', {'a':'osload','callback':'loadSuc'}, function(response) {
		    	console.log('JS got response', response);
		    });
		}
		
		//加载回调
		function loadSuc(data,responseCallback){
			/*var dat = eval("("+data.body+")");
			$.cookie("result",JSON.stringify(dat.result), {path: "/", expires: 365 });
			window.location.href = window.location.href;*/
		}
		
		
		doActionSer("mainPageCount",{"channel":""+channel,"page_id":'1',"first_id":'0',"second_id":'0'},2,true,function(res){

		});
});