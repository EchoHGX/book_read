channelInit();
	var origin=getParam('origin');
	
	$('#phone').bind('input propertychange', function() {
    	buttonAct();
        $("#btn").css("background-color","#FD6974");
	});
	$('#password').bind('input propertychange', function() {
    	buttonAct();
	});
	$('#re_password').bind('input propertychange', function() {
    	buttonAct();
	});

	var clock = '';
	var nums = 60;
	var btn;
	
	var bid = getParam('bid');
	var cid = getParam('cid');
    	
    var phone = $("#phone");
    var password = $("#password");
    var re_password=$("#re_password");
    var code=$("#code");
    var pwdmd5 ='';
    $("#register").attr("disabled", true);
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
    
    $("#btn").click(function(){
		if(phone.val()==""){
			$('#tips').show().text("手机号码不能为空！");closeTips();
			return false;
		}
		if(phone.val().length<11){
			$('#tips').show().text("手机号码必须为11位！");closeTips();
			return false;
		}
		doActionSer("checkPhoneRegister",{"phone":phone.val()+""},0,true,checkrecall);
		btn=this;
	});
    function checkrecall(res) {
    	console.info(JSON.stringify(res));
		if (res.result.retcode==-1) {
			$('#tips').show().text("非法请求！");closeTips();
		}else if (res.result.retcode==1) {
			$('#tips').show().text("该手机号已被注册！");closeTips();
		}else if (res.result.retcode==0) {
			sendCode();
			doActionSer("getCaptcha",{"phone":phone.val()+""},4,true,subrecall);
		}
	}
	function subrecall(res) {
		if (res.result.retcode==1) {
			$('#tips').show().text("短信已发送！");closeTips();
		}
	}
	function sendCode(){ 
		 btn.disabled = true; //将按钮置为不可点击
		 clock = setInterval(doLoop, 1000); //一秒执行一次
		 $("#btn").css("background-color","#ffa7ae");
	}
	function doLoop(){
		 nums--;
		 if(nums > 0){
		  	btn.value = nums+'秒后重新获取';
		 }else{
			  clearInterval(clock); //清除js定时器
			  btn.disabled = false;
			  btn.value = '发送验证码';
			  $("#btn").css("background-color","#FD6974");
			  nums = 60; //重置时间
		 }
	}
    
    
    $("#register").unbind("click").click(function() {
       		if(phone.val().length<11){
       			$('#tips').show().text("手机号码必须为11位！");closeTips();
       			return false;
       		}
       		
       		if ($.trim(password.val())==""||$.trim(re_password.val())=="") {
       			$('#tips').show().text("密码不能为空！");closeTips();
       			return false;
			}
       		
       		if (password.val()!=re_password.val()) {
       			$('#tips').show().text("密码不一致！");closeTips();
       			return false;
			}
       		if(code.val()==""){
       			$('#tips').show().text("验证码不能为空！");closeTips();
       			return false;
       		}
       		doActionSer("checkCaptcha",{"phone":phone.val()+"","code":code.val()+""},4,true,coderecall);
   	});
    
    function coderecall(res) {
// 		console.info(JSON.stringify(res));
		if (res.result.retcode==1) {
			userRegister();
		}else {
			$('#tips').show().text("验证失败！");closeTips();
		}
	}
    function userRegister(){
    	pwdmd5 = hex_md5(password.val());
    	buttonDis();
    	doActionSer("userRegister",{"phone":phone.val(),"password":pwdmd5,"channelid":channel},0,true,regrecall);
    }
    
    function regrecall(res){
    	if(res.result.retcode=='-3'){
    		//已注册
    		$('#tips').show().text("该手机已被注册！");closeTips();
    		buttonAct();
    	}else if(res.result.retcode=='-2'){
    		//已绑定
    		$('#tips').show().text("该手机已被绑定！");closeTips();
    		buttonAct();
    	}else if(res.result.retcode=='-1'){
    		//非法请求
    		$('#tips').show().text("非法请求！");closeTips();
    		buttonAct();
    	}else if(res.result.retcode=='1'){
			//注册成功
			doActionSer("userLogin",{"phone":phone.val(),"password":pwdmd5},0,true,loginrecall);
    	}
    
    }
    
    function loginrecall(res){
    	if(res.result.retcode=='1'){
    		$.cookie("result",JSON.stringify(res.result), {path: "/", expires: 365 });	
    		/*酷派活动*/
    		var sys = $.cookie('sys');
//    		if(channel =='100054'&&sys=='android'){
//    			var pid = res.result.userinfo.pid;
//				var deviceInfo =JSON.parse(zmappwebviewjs.getDeviceInfo());
//				var imei = deviceInfo.imei;
//				var imsi = deviceInfo.imsi;	
//				doActionSer("cpGiving",{"pid":""+pid,"imei":""+imei,"imsi":""+imsi},2,true,recall);
//				function recall(res){
//					if(res.result.retcode=='1'){
//						urlTo('index.html?coolpad=1');
//					}else{
//						var url ='p-center.html?flag=1';
//					    if(origin!=null){
//					    	url=getPageByOrigin(origin,url);
//					    }
//					    urlTo(url);			
//					}
//				}
//    		}else{
    			if(sys=="android"){
//					var pid = res.result.userinfo.pid;
//					var deviceInfo =JSON.parse(zmappwebviewjs.getDeviceInfo());
//					var imei = deviceInfo.imei;
//					doActionSer("givActivity",{"pid":pid,"imei":imei,"channel":""+channel},2,true,actrecall);
//					
//					function actrecall(res){
						var url ='p-center.html?flag=1';
		    		    if(origin!=null){
		    		    	url=getPageByOrigin(origin,url);
		    		    }
		    		    urlTo(url);			
//					}
				}else{
					var url ='p-center.html?flag=1';
	    		    if(origin!=null){
	    		    	url=getPageByOrigin(origin,url);
	    		    }
	    		    urlTo(url);			
				}
//    		}
    	}
    	
    }
    
    $("#login").unbind("click").click(function() {
    	var url ='p-login-choose.html';
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
		  $(".recode div input").focus(function() {
			 	 $(".recode div").css('border-bottom-color','#FD6974');
			  }).blur(function() {
			    $(".recode div").css('border-bottom-color', '#ebebeb');
		  });
		  $(".validateInfo div #code").focus(function() {
			 	 $(".validateInfo div").css('border-bottom-color','#FD6974');
			  }).blur(function() {
			    $(".validateInfo div").css('border-bottom-color', '#ebebeb');
		  });
	});
	
	//按钮生效
	function buttonAct(){
		$("#register").attr("disabled", false);
        $("#register").addClass("login_in");
	}
	
	//按钮失效
	function buttonDis(){
		$("#register").attr("disabled", true);
    	$("#register").removeClass("login_in");
//     	$("#btn").css("pointer-events","none"); //将按钮置为不可点击
		$("#btn").css("background-color","#ffa7ae");
	}