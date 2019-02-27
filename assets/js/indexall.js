/*该方法用于用户在首页进入相应页面时添加标志，防止统计页面访问数时重复计数*/
function linkAddFlag(position){
	/*
	 * position
	 * 	1:分类页
	 * 	2:排行页
	 *  3:折扣页
	 *  4:精品页
	 *  5:最近阅读页
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
	var mininum=0;
	_auto();
	window.onresize=function(){_auto();};
			/*渠道Id初始化*/
			channelInit();
			/*安卓、IOS 相关*/
			if(getParam('v')!=null){
				v=getParam('v');
				$.cookie("v",v, {path: "/", expires: 365 });
			}
			var sys=$.cookie("sys");
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
			/*用户信息初始化*/
			var user = userInit();
			var pid = "";
			var sex = "";
			var genelist = "";
			/*获取用户信息*/
			if(isLogin){
				$('.person_img img').attr('src',user.userinfo.imageurl);
				pid=user.userinfo.pid;
				if(is_weixn()){
					if(!$.cookie("wxopenid")){
						window.location.href="getId.jsp?state="+pid+"4";
					}
				}

				sex=user.userinfo.sex;
				if(user.userinfo.genelist!=null){
					for(var i=0;i<user.userinfo.genelist.length;i++){
						genelist+=user.userinfo.genelist[i].geneid+",";
					}
				}
			}else{
				sex=$.cookie("sex");
			}
			if(sex!=""&&sex!=null){
				jxrescall();
			}else {
				if(sys=='android'||sys=='ios'){
					$(".fixedbox").show();
				}else{
					sex=0;
					$.cookie("sex",sex, {path: "/", expires: 365 });
					jxrescall();
				}
			}
//			$(document).bind("pageinit", function() {
//				isInit=0;
//				serverURL = doActionSer("getJXInfo",{"sex":""+sex},2,true,subrecall); //服务器地址
//				startNum = 1;//当前页
//				count = 5; //总页数
//			});
			$(".fixedbox div ul").click(function() {
				sex=$(this).attr("data");
				$.cookie("sex",sex, {path: "/", expires: 365 });
//				$(".fixedbox ul li.xuanz img").attr("src","");
//				$(this).find(".xuanz img").attr("src","images/choice_xz.png");
				$(".fixedbox").hide();
				jxrescall();
			});
			$(".fixedbox .jump").click(function() {
				sex=0;
				$.cookie("sex",sex, {path: "/", expires: 365 });
				$(".fixedbox").hide();
				jxrescall();
			});
//			/*获取个性主页内容*/
//			doActionSer("perMainPage",{"channelid":""+channel,"genelist":""+genelist,"sex":""+sex,"pid":""+pid},1,true,subrecall);
			function jxrescall() {
//				var jxlist=sessionStorage.getItem("jxlist");
//				if(jxlist!=""&&jxlist!=null){
//					subrecall(jxlist);
//				}else{
//				setTimeout(function () {doActionSer("getJXInfo",{"sex":""+sex},2,true,subrecall); },500)
				doActionSer("getJXInfo",{"sex":""+sex},2,true,subrecall);
//				}
			}
			function randomsort(a, b) {
			   return Math.random()>.5 ? -1 : 1; //通过随机产生0到1的数，然后判断是否大于0.5从而影响排序，产生随机性的效果。
			}
			/*个性主页回调*/
			function subrecall(res){
				/*绘制基因列表*/
				if(typeof res =='string'){
					res=JSON.parse(res);
				}else{
					//sessionStorage.setItem('jxlist', JSON.stringify(res));
				}
				console.info(res);
				$(".choice_content #dataList").html("");
				var list=res.result.jxList;
//				var list=(res.result.jxList).sort(randomsort);
				var jxlist={};
				jxlist["jxList"]=list;
				jxlist["channel"]=channel;
				var html = template('jxbanner', jxlist);
				$(".choice_content #dataList").append(html);
				mescroll.endSuccess(list.length,false);
				if($("#mescroll .bottom-qrcode").html().length<10){
					judgeCode();
				}
				$(".choice_content a.gotobook").click(function(){
					var data=$(this).attr("dat");
					data=JSON.parse(data);
					if(sex=="0"){
						if(data.booksex=="1"||data.booksex=="2"){
							$.cookie("sex",data.booksex, {path: "/", expires: 365 });
						}
					}
					if(data.cid){
						window.location.href="b-read.html?channel="+channel+"&bid="+data.bid+"&cid="+data.cid;
					}else{
						window.location.href="b-detail.html?bid="+data.bid+"&channel="+channel;
					}
				});
				if(sys=="android" || sys=="os"||channel=='100226'||channel=='100194'||channel=='100244'||channel=='100256'||channel=='100258'||channel=='100261'||channel=='100259'||channel=='100260'||channel=='100272'){
					
				 }else{
					 
				 	 $('.tip-client').show();
					 $('.tip-client-bottom').show();
				 	$('.tip-client').click(function(){
				 		download.downloadCount();
					 });
					 
					 $('.tip-client .cancel').click(function(){
						event.stopPropagation();
					 	$('.tip-client').hide();
					 	 $('.tip-client-bottom').hide();
					 });	
					wxmini();
				 }
				$(".top_center a").click(function(){
					$(".top_center a").removeClass("top_active");
					$(this).addClass("top_active");
					var id=$(this).attr("data");
					if(id=="mescroll"){
						$("#mainpagess").hide();
						$("#mescroll").show();
					}else{
						$("#mescroll").hide();
						if($(".main-page").html().length<10){
							var html = template('page', {});
							$(".main-page").append(html);
							doActionSer("mainPage",{"channel":""+channel},2,true,recall);
						}
						$("#mainpagess").show();
					}
				});
			}
			function recall(res){
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

				 if(sys=="android" || sys=="os"||channel=='100226'||channel=='100194'||channel=='100244'||channel=='100256'||channel=='100258'||channel=='100261'||channel=='100259'||channel=='100260'||channel=='100272'){
					
				 }else{
					 
				 	 $('.tip-client').show();
					 $('.tip-client-bottom').show();
				 	$('.tip-client').click(function(){
				 		download.downloadCount();
					 });
					 
					 $('.tip-client .cancel').click(function(){
						event.stopPropagation();
					 	$('.tip-client').hide();
					 	 $('.tip-client-bottom').hide();
					 });	
					wxmini();
				 }

				drawIndexContent(res);
				if($("#mainpagess .bottom-qrcode").html().length<10){
					$("#mescroll .bottom-qrcode").html("");
					judgeCode();
				}
				 /*下载添加点击事件*/
				 $('.client-download').click(function(){
					download.downloadCount(); 
				 });
			}
			function wxmini(){
				var wxmini=window.__wxjs_environment;
				mininum++;
				if(mininum>100){window.clearTimeout(time1)}
				if (typeof wxmini == "undefined") {var timer1=window.setTimeout("wxmini()",1000);return;}	
				$('.tip-client').hide();
				$('.tip-client-bottom').hide(); 
			}
			var width = $(window).width();
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
				$(".slide-banner ol").append(html);
				if (width >= 768) {
				    width = 768;
				}
				$(".slide-banner").css("height", width * (110 / 375));
//				$(".slide-banner img").css("height", width * (110 / 375));
				$(".slide-banner img").css("width",width);
				$(".slide-banner ol").css("width", width);
				/*轮播广告添加特效*/
				var subhtml="";
				for (var i in res.result.topadvlist) {
			        subhtml += '<li><a href="javascript:;"></a></li>';
			    }
			    $(".slide-banner ul").append(subhtml);
			    $(".slide-banner ul li").eq(0).addClass("active");
				//轮播
				$(".slide-banner ol").touchSlider({
				    flexible: true,
				    speed: 200,
				    btn_prev: $(".slide-banner i.slide-left"),
				    btn_next: $(".slide-banner i.slide-right"),
				    paging: $(".slide-banner ul li"),
				    counter: function (e) {
				        $(".slide-banner ul li").removeClass("active").eq(e.current - 1).addClass("active");
				    }
				});
				//自动轮播
				function autoSet() {
				    setTimeout(function () {
				        $(".slide-banner i.slide-right").trigger("click");
				    }, 100);
				}
				var autoSlide = setInterval(function () {
				    autoSet();
				}, 2400);
				//轮播监控鼠标状态
				$(".slide-banner").on("mouseenter", function () {
				    clearInterval(autoSlide);
				}).on("mouseleave", function () {
				    autoSlide = setInterval(function () {
				        autoSet();
				    }, 2400);
				});
				//轮播监控手势状态
				$(".slide-banner").on("touchstart", function () {
				    clearInterval(autoSlide);
				}).on("touchend", function () {
				    autoSlide = setInterval(function () {
				        autoSet();
				    }, 2400);
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
				console.info($(".lazy_img").length);
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
				
				var myScroll= new IScroll('#wrapper', {vScroll: false,eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false});
				
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
			var mescroll = new MeScroll("mescroll", {
				down: {  
//					use: false,
					auto: false,
					callback: jxrescall, //下拉刷新的回调     
//					offset: 60
					outOffsetRate: 0.2,
					bottomOffset: 20
				},   
				up: {
					use: false,
					auto: false,
					callback: null, //上拉回调,此处可简写; 相当于 callback: function (page) { getListData(page); }
					isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
					isLock: true
//					clearEmptyId: "dataList", //1.下拉刷新时会自动先清空此列表,再加入数据; 2.无任何数据时会在此列表自动提示空
//					toTop:{ //配置回到顶部按钮
//						src : "../images/mescroll-totop.png", //默认滚动到1000px显示,可配置offset修改
//						//offset : 1000
//					}
				}
			});
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
		});
	
		function lazy(clssName){
			$(clssName).lazyload({
				effect: "fadeIn",
				placeholder : "images/146915821024398292_160_224.png"
			});
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
		
//		judgeCode();
		
		 /*下载添加点击事件*/
		 $('.client-download').click(function(){
			download.downloadCount(); 
		 });