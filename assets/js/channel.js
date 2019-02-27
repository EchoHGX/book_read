(function() {

	var channelTools = {

		/* 100227渠道特殊处理,阅读界面隐藏不必要参数 */
		channel100227ReadHide : function() {
			if (channelTools.judgeChannel100227(channel)) {
				$('.sign').hide();
				$('.logo-wrap a').hide();
				$('.tip-client').hide();
				$('.tip-client-bottom').hide();
				$('.foot_menu').hide();
				$('.advlist').hide();

			}
		},
		/* 100227渠道特殊处理,展示提示下载框 */
		channel100227MaskShow : function() {
			var html = '<div class="channel-100227-mask" style="position:fixed;width:100%;height:100%;top:0;left:0;z-index:99999;background-color:rgba(0,0,0,.5);">'
					+ '<img class="channel-100227-tip-box" src ="images/bg/100227-read-tip@3x.png" style="position:absolute;width:16rem;top:7rem;left:calc(50% - 8rem)"/>'
					+ '<a href="http://download.zhushou.sogou.com/open/files/year_2017/day_20170118/eee95d111325f166f44dfa0eca1b7e90.apk"><img class="channel-100227-tip-button" src="images/button/go-down-2@3x.png" style="position:absolute;width:8rem;top:25rem;left:calc(50% - 4.2rem)"/></a>'
					+ '</div>';
			$('body').append(html);
		},
		judgeChannel100227 : function(channel) {
			if (channel == 100227) {
				return true;
			} else {
				return false;
			}

		},

		judgeChannel100197 : function(channel) {
			return channel == 100197 ? true : false;
		},

		channel100197AppendQrcode : function(channel,cl) {
			if(cl=='buy-box'){
				$('.first_name').hide();
				$('.pay-t').hide();
				$('.seckill-tip').hide();
			}
			var html = '<div style="text-align: center;">'
					+ '<img style="width:6rem;" src="images/qrcode/qrcode-100197.jpg"/>'
					+'<p style="font-size:.8rem;margin-top:.4rem">关注书客小说，追书更方便</p>'
					+ '<div>';
			$('.'+cl).append(html);

		},
		judgeChannel100224 : function(channel) {
			return channel == 100224 ? true : false;
		},
		/*爱汇，从手机版本切换至平板版本*/
		channel100224Dispatcher : function(){
			var local = window.location.href;
			
			if(local.indexOf('-b.html')==-1){
				/*不在平板环境中*/	
				if(local.indexOf('html')==-1){
					/*首页*/
		  			var url = 'index-b.html';
		  			if(local.indexOf('?')!=-1){
		  				/*获取参数*/
		  				urlTo(url+=local.substring(local.indexOf('?')));
		  			}else{
		  				urlTo(url);
		  			}
		  		}else{
		  			/*非首页*/
		  			var url = local.substring(0,local.indexOf('.html'));
		  			url = url.substring(url.lastIndexOf('/')+1)+'-b.html';
		  			if(local.indexOf('?')!=-1){
		  				/*获取参数*/
		  				urlTo(url+=local.substring(local.indexOf('?')));
		  			}else{
		  				urlTo(url);
		  			}
		  		}
			}
	  		
		},
		/*爱汇，从平板版本切换至手机版本*/
		channel100224Dispatcher2 : function(){
			var local = window.location.href;
			if(local.indexOf('-b.html')!=-1){
				/*转换*/
				if(local.indexOf('html')==-1){
					/*首页*/
		  			var url = 'index.html';
		  			if(local.indexOf('?')!=-1){
		  				/*获取参数*/
		  				urlTo(url+=local.substring(local.indexOf('?')));
		  			}else{
		  				urlTo(url);
		  			}
		  		}else{
		  			/*非首页*/
		  			var url = local.substring(0,local.indexOf('-b.html'));
		  			url = url.substring(url.lastIndexOf('/')+1)+'.html';
		  			if(local.indexOf('?')!=-1){
		  				/*获取参数*/
		  				urlTo(url+=local.substring(local.indexOf('?')));
		  			}else{
		  				urlTo(url);
		  			}
		  		}
			}
		},
		
		
		/*爱汇切换版本，根据不同的屏幕宽度，在两个版本中进行切换*/
		channel100224VerChange : function(){
			var width = document.documentElement.clientWidth;
			if(width>600){
				/*手机-->平板*/
				channelTools.channel100224Dispatcher();
			}else{
				/*平板-->手机*/
				channelTools.channel100224Dispatcher2();
			}
		},
		/*爱汇登陆*/
		channel100224Login : function(){
			var state =true;
			var info = {
				ahid:getParam('ahid'),
				ahname:getParam('ahname'),
				ahsex:getParam('ahsex'),
				ahdepart:getParam('ahdepart'),
				ahage:getParam('ahage'),
				ahmac:getParam('ahmac'),
				ahsign:getParam('ahsign'),
				channel:getParam('channel')
			};
			if(info.ahmac!=null){
				localSto.setLocalStorage('aihuimac',info.ahmac);
			}
			if(info.ahid!=null){
				localSto.setLocalStorage('ahid',info.ahid);
			}
			
			for(var i in info){
				if(info[i]==null){
					state=false;
					break;
				}
			}
			if(state){
				doActionSer("aiHLogin",info,2,true,function(res){
					if(res.result.retcode=='1'){
						$('.page-container .page-header .go-center').attr('href','p-center-b.html');
						$.cookie("result",JSON.stringify(res.result), {path: "/", expires: 365 });
					}
				});	
			}
		},
		
		judgeChannel100260 : function(channel) {
			if((channel == 100260)&&(self!=top)){
				return true;
			}
			return false;
		},
		/*多好玩登陆逻辑*/
		login100260 : function(){
			var url = window.location.href;
			if(url.indexOf('duohw')!=-1){
				if(url.indexOf('read-new')!=-1){
					$('body').append("<div id='dhwgame'></div>");	
				}else{
					$('.wrapper').append("<div id='dhwgame'></div>");	
				}
				
				$("#dhwgame").append('<iframe id="jsurl_mainframe" frameborder="0" scrolling="yes" name="jsmain" src="" style="top:0px;height:100vh; display: none; visibility: inherit; width: 100vw;max-width:1000px; z-index: 99999;overflow: visible;position:absolute;background-repeat:no-repeat;background-size:cover;"></iframe>');
		   	
				var mycars=new Object();
				mycars.channelExt=getParam('channelExt');
				mycars.email=getParam('email');
				mycars.game_appid=getParam('game_appid');
				mycars.new_time=getParam('new_time');
				mycars.loginplatform2cp=getParam('loginplatform2cp');
				mycars.user_id=getParam('user_id');
			    mycars.sdklogindomain=getParam('sdklogindomain');
			    mycars.sdkloginmodel=getParam('sdkloginmodel');
			    mycars.sign=getParam('sign');
			    mycars.icon=getParam('icon');
			    mycars.nickname=getParam('nickname');
				var ifr = document.querySelector('#jsurl_mainframe');
				ifr.src="http://www.duohw.cn/mobile.php?s=/Game/singlegame.html";
		   		 
				 ifr.onload=function(){
		            if (!mycars.user_id) {
		                var userdata = JSON.stringify(mycars);
		                ifr.style.display = "";
		                loginparam = {"event": "login", "data": userdata, "status": 0};
		                ifr.contentWindow.postMessage(loginparam, '*');
		                $('body').css('overflow-y','hidden');
		            }else{
		                var obj = document.getElementById("jsurl_mainframe");
		                obj.style.display= "none";
		                localSto.setLocalStorage('dhwchannelExt',mycars.channelExt);
		                localSto.setLocalStorage('dhwuser_id',mycars.user_id);
		                doActionSer("duoHaoWan_Login",{"user_id":""+mycars.user_id,"nickname":""+decodeURIComponent(mycars.nickname),"channel":""+channel},2,true,function(res){
		                	if(typeof res =='string'){
		            			res = JSON.parse(res);
		            		}	
		                	if(res.result.retcode=='1'){
		                		if(url.indexOf('read-new')!=-1){
		                			cookie_api_atl.cookie("result",JSON.stringify(res.result), {path: "/", expires: 365 });
		            			}else{
		            				$.cookie("result",JSON.stringify(res.result), {path: "/", expires: 365 });
		            			}
		                	}
		                	
		                });
		        		
		            }
		        };
			}
			
			
		},
		
		/*100260多好玩渠道，跳转至定制支付页*/
		goPay100260 : function(bid,cid){
			if(bid&&cid){
				urlTo('pay-100260.html?bid='+bid+'&cid='+cid+"&r="+Math.random());
			}else{
				urlTo('pay-100260.html'+"?r="+Math.random());
			}
			
		},
		/*100260多好玩渠道，跳转至定制支付页*/
		goSinglePay100260 : function(bid,cid){
			if(bid&&cid){
				urlTo('b-buy-single-100260.html?bid='+bid+'&cid='+cid+"&r="+Math.random());
			}else{
				urlTo('b-buy-single-100260.html'+"?r="+Math.random());
			}
			
		},
		judgeChannelDHW : function(channel) {
			if((channel == 100260||channel == 100259)&&(self!=top)){
				return true;
			}
			return false;
		},
		goNewRead : function(){
			var url = window.location.href;
			var param = url.substring(url.indexOf('?'));
			RTool.setLocalStorage('read-ver','new');
			urlTo('b-read-new.html'+param);
			
		},
		hideReadTransform : function(){
			$('.old-ver').hide();
		}
		
	};

	window.channelTools = channelTools;

})();