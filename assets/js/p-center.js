 $(function(){
	 	_auto();
		window.onresize=function(){_auto();};
	 
    	var flag=getParam("flag");
    	if (flag=="1") {
    		$(".search-back").attr("href","index.html");
    	}
    	
    	/*渠道Id初始化*/
		channelInit();
		/*爱汇版本切换*/
//		if(channelTools.judgeChannel100224(channel)){
//			channelTools.channel100224VerChange();
//		}
		
		/*FWatch渠道屏蔽切换账号*/
		var sys=$.cookie("sys");
		if((channel=='100223'||channel=='100225')&&sys!=null){
			$('.changeAccount').hide();
		}
		
		/*用户信息初始化*/
		var user = userInit();
		var pid =null;
		
		var origin =getParam('origin');
		if(isLogin){
			$(".person .personimg").attr("src",user.userinfo.imageurl);
			$(".userinfo .username").html(user.userinfo.name);
			pid = user.userinfo.pid;
			$(".userid span").html(pid);
			doActionSer("getWechatUserInfo",{"pid":""+pid,"type":"2"},2,true,subrecall);
		}else{
			var url='p-login-choose.html';
			url=urlDispatch(origin,url);
			urlTo(url);
		}

    });
    function subrecall(res){
    	var read_money=0;
    	var read_ticket =0;
    	if(res.result.retcode==1){
    		$(".userinfo .username").html(res.result.nickname);
    		$(".person .personimg").attr("src",res.result.imageurl);
    		read_money =res.result.read_money?res.result.read_money:0;
    		read_ticket = res.result.read_ticket?res.result.read_ticket:0;
    		$(".i_detail_money").html(read_money);
    		$(".i_detail_ticket").html(read_ticket);
    		if(res.result.vip&&res.result.vip!="0"){
    			$(".userinfo .uservip").show();
    			var timesta=timestampToTime(res.result.vip);
    			timesta=timesta.substr(0,10);
				$(".uservip span").html(timesta);
    		}else{
    			$(".userinfo .uservip").hide();
    		}
    	}
    }
    function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate()<10?'0'+date.getDate()+' ':date.getDate()+ ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y+M+D+h+m+s;
    }
    function switchLogin(){
    	$.cookie('result', null,{path: "/"}); 
    	window.location.href="p-login-choose.html";
    }
    $('#go_topup').attr('href','pay.html');
    $('#userpay').attr('href','pay.html?&flag=1');
    
	judgeCode();  
	 /*下载添加点击事件*/
	 $('.client-download').click(function(){
		download.downloadCount(); 
	 });