		channelInit();
		var origin=getParam('origin');
		if(origin!=null){
			$.cookie("origin",origin, {path: "/"});
		}
		if(getParam('bid')!=null){
			$.cookie("bid",getParam('bid'), {path: "/"});
		}
		if(getParam('cid')!=null){
			$.cookie("cid",getParam('cid'), {path: "/"});
		}
		if(getParam('postid')!=null){
			$.cookie("postid",getParam('postid'), {path: "/"});
		}
		if(getParam('state')!=null){
			$.cookie("state",getParam('state'), {path: "/"});
		}
		
		
		var url ='index.html';
		if(origin=='4'){
			url =getPageByOrigin('11',url);
		}else{
			url =getPageByOrigin(origin,url);
		}
		$('.return_btn').attr('href',url);
		
		
		$('#phone').bind('input propertychange', function() {
	    	buttonAct();
		});
		$('#password').bind('input propertychange', function() {
	    	buttonAct();
		});
		
		/*微信及android，iOS端开发微信登陆接口*/
		var sys = $.cookie('sys');

		if(sys=="os"||sys=="android"){
			$('.wechat-login-btn').show();
		}else{
			$('.wechat-login-btn').show();
			$('.qq-login-btn').show();
		}
			
		var appvc = parseInt($.cookie("appvc"));
		if(appvc){
			if(appvc>=25000){
				/*25000版本之后增加QQ登陆方式*/
				$('.qq-login-btn').show();
			}
		}
		
		var bid = getParam('bid');
		var cid = getParam('cid');
	    var phone = $("#phone");
	    var password = $("#password");
	    $("#login").attr("disabled", true);
	    $("input").blur(function(){
	    	if (phone.val()!="") {
				$("#clearNum").show();
				$("#clearNum").unbind("click").click(function() {
					phone.val("");
					buttonDis();
					$("#clearNum").hide();
				});
			}else {
				buttonDis();
				$("#clearNum").hide();
			}
	    });
	    
	    $("#forget_pwd").unbind("click").click(function() {
	    	window.location.href="p-resetPwd.html";
	    });
	    $("#login").unbind("click").click(function() {
	        		if(phone.val().length<11){
	        			$('#tips').show().text("手机号码必须为11位！");closeTips();
	        			return false;
	        		}
	        		if(password.val().length==""){
	        			$('#tips').show().text("密码不能为空！");closeTips();
	        			return false;
	        		}
	        		userLogin();
	    		});
	    
	    function userLogin(){
	    	buttonDis();
			var pwdmd5 = hex_md5(password.val());
	    	doActionSer("userLogin",{"phone":phone.val(),"password":pwdmd5},0,true,loginrecall);
	    }
	    
	    function loginrecall(res){
	    	if(res.result.retcode=='1'){
	    		$.cookie("result",JSON.stringify(res.result), {path: "/", expires: 365 });
	    		/*酷派渠道赠送书券活动*/
//				if(channel =='100054'&&sys=='android'){
//					var pid = res.result.userinfo.pid;
//					var deviceInfo =JSON.parse(zmappwebviewjs.getDeviceInfo());
//					var imei = deviceInfo.imei;
//					var imsi = deviceInfo.imsi;	
//					doActionSer("cpGiving",{"pid":""+pid,"imei":""+imei,"imsi":""+imsi},2,true,recall);
//					function recall(res){
//						if(res.result.retcode=='1'){
//							if(getParam('coolpad')=='1'){
//								urlTo('index.html?coolpad=1');
//							}else{
//								var url ='index.html';
//						    	if(origin!=null){
//						    		url=getPageByOrigin(origin,url);
//						    	}
//						    	urlTo(url);
//							}
//						}else{
//							var url ='index.html';
//					    	if(origin!=null){
//					    		url=getPageByOrigin(origin,url);
//					    	}
//					    	urlTo(url);
//						}
//					}
//				}else{
					if(sys=="android"){
						//var pid = res.result.userinfo.pid;
						//var deviceInfo =JSON.parse(zmappwebviewjs.getDeviceInfo());
						//var imei = deviceInfo.imei;
						//doActionSer("givActivity",{"pid":pid,"imei":imei,"channel":""+channel},2,true,actrecall);
						
						//function actrecall(res){
							var url ='index.html';
					    	if(origin!=null){
					    		url=getPageByOrigin(origin,url);
					    	}
					    	urlTo(url);
						//}
					}else{
						var url ='index.html';
				    	if(origin!=null){
				    		url=getPageByOrigin(origin,url);
				    	}
				    	urlTo(url);
					}
//				}

				
				
	    	}else{
	    		buttonAct();
	    		$('#tips').show().text("账户或密码错误！");closeTips();
	    	}
	    }
	    
	    $("#register").unbind("click").click(function() {
	    	var url ='p-register.html';
	    	if(origin!=null){
	    		url=urlDispatch(origin,url);
	    	}
	    	urlTo(url);
		});
	    function closeTips(){setTimeout("$('.tips').hide()",1800);}
		$(function() {
			 $(".contactInfo div input").focus(function() {
				 $("#clearNum").show();
			 	 $(".contactInfo div").css('border-bottom-color','#FD6974');
			  }).blur(function() {
			    $(".contactInfo div").css('border-bottom-color', '#ebebeb');
			  });
			  $(".codeInfo div input").focus(function() {
			 	 $(".codeInfo div").css('border-bottom-color','#FD6974');
			  }).blur(function() {
			    $(".codeInfo div").css('border-bottom-color', '#ebebeb');
			  });
		});
		
		//按钮生效
		function buttonAct(){
			$("#login").attr("disabled", false);
	        $("#login").addClass("login_in");
		}
		
		//按钮失效
		function buttonDis(){
			$("#login").attr("disabled", true);
	    	$("#login").removeClass("login_in");
		}
		
		
		/*android*/
		function reswxLogon(data){
			$.cookie("result",JSON.stringify(data.body), {path: "/", expires: 365 });
			/*酷派渠道赠送书券活动*/
//			if(channel =='100054'){
//				var pid = data.body.userinfo.pid;
//				var deviceInfo =JSON.parse(zmappwebviewjs.getDeviceInfo());
//				var imei = deviceInfo.imei;
//				var imsi = deviceInfo.imsi;	
//				doActionSer("cpGiving",{"pid":""+pid,"imei":""+imei,"imsi":""+imsi},2,true,recall);
//				function recall(res){
//					if(res.result.retcode=='1'){
//						if(getParam('coolpad')=='1'){
//							urlTo('index.html?coolpad=1');
//						}else{
//							var url ='index.html';
//					    	if(origin!=null){
//					    		url=getPageByOrigin(origin,url);
//					    	}
//					    	urlTo(url);
//						}
//					}else{
//						var url ='index.html';
//				    	if(origin!=null){
//				    		url=getPageByOrigin(origin,url);
//				    	}
//				    	urlTo(url);
//					}
//				}
//			}else{
				if(sys=="android"){
//					var pid = data.body.userinfo.pid;
//					var deviceInfo =JSON.parse(zmappwebviewjs.getDeviceInfo());
//					var imei = deviceInfo.imei;
//					doActionSer("givActivity",{"pid":pid,"imei":imei,"channel":""+channel},2,true,actrecall);
//					
//					function actrecall(res){
						var url ='index.html';
				    	if(origin!=null){
				    		url=getPageByOrigin(origin,url);
				    	}
				    	console.log(url);
				    	urlTo(url);
//					}
				}else{
					var url ='index.html';
			    	if(origin!=null){
			    		url=getPageByOrigin(origin,url);
			    	}
			    	urlTo(url);
				}
//			}
			
			
		}
		function resCallback(res){
			if(res["callback"]){
				var fn = eval("("+res["callback"]+")");
				if(typeof(fn)=="function"){
					fn.apply(this, [res]);  
				}
			}
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
		 		
		//登陆调用
		function loginBtnOnClick() {
			//调用OC方法传入参数
		    WebViewJavascriptBridge.callHandler('doAction', {'a':'wxLogon','callback':'resWxLogin'}, function(response) {
		    	console.log('JS got response', response);
		    });
		}
		
		//登录回调
		function resWxLogin(data,responseCallback){
			var dat = eval("("+data.body+")");
			$.cookie("result",JSON.stringify(dat.result), {path: "/", expires: 365 });
			var url ='p-center.html';
		    if(origin!=null){
		    	url=getPageByOrigin(origin,url);
		    }
		    urlTo(url);
		}
		
		
		function qqlogin(){
			if(sys=="android"){
				try{
					zmappwebviewjs.doAction(JSON.stringify({'a':'qqLogon','callback':'resqqLogon'}));
				}catch(e){

				}
			}else{
				QC.Login.showPopup({
			 		appId:"101423545",
		  			redirectURI:"http://shuke.zmapp.com/qq-login-callback.html"
			 	});		
			}
			
			
			
			
			
		}
		
		
		function resqqLogon(data){
			console.log(data);
			$.cookie("result",JSON.stringify(data.body), {path: "/", expires: 365 });
				if(sys=="android"){
						var url ='index.html';
				    	if(origin!=null){
				    		url=getPageByOrigin(origin,url);
				    	}
				    	console.log(url);
				    	urlTo(url);
				}else{
					var url ='index.html';
			    	if(origin!=null){
			    		url=getPageByOrigin(origin,url);
			    	}
			    	urlTo(url);
				}
			
			
		}
		
		function wexinlogin(){
			//微信端登陆调用微信登陆接口
			if(is_weixn()){
				var url = '';
				if(origin!=null){
					url ='doWxLogin.jsp?state=';
					url=setState(origin,url);
				}else{
					var state=setParam("p","01");
					url ='doWxLogin.jsp?state='+state;
				}
				urlTo(url);
			}else if(sys=="android"){
				zmappwebviewjs.doAction(JSON.stringify({'a':'wxLogon','callback':'reswxLogon'}));
			}else if(sys=="os"){
				//设置WebViewJavascriptBridge
				setupWebViewJavascriptBridge(function(bridge) {
					//注册一个从OC调用过来执行的JS方法
				   	bridge.registerHandler('resCallback', function(data, responseCallback) {
							if(data["callback"]){
								var fn = eval("("+data["callback"]+")");
								if(typeof(fn)=="function"){
									fn.apply(this, [data,responseCallback]);  
								}
							}else{
			
							}
							//responseCallback('js执行过了');
				    });
				});
				loginBtnOnClick();
			}else{
				$('.wechat-login').show();
				var obj = new WxLogin({
					id:"wechat-area", 
					appid: "wx4b2e8fce83332128", 
					scope: "snsapi_login", 
					redirect_uri: "http%3a%2f%2fdl.lsqudong.com%2fwechat-login-callback.html",
					state: "STATE",
					style: "white",
					href: ""
				});
			}
		}