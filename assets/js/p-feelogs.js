/*渠道Id初始化*/
		channelInit();
		/*爱汇版本切换*/
		if(channelTools.judgeChannel100224(channel)){
			channelTools.channel100224VerChange();
		}

var state =getParam("state");
	var type =getParam("type");
	var result =null;
	var pid =null;
	//state为1时为安卓端请求，pid取url中参数 
	if(state=='1'){
		pid=getParam("pid");
		$('.wx_nav_box').hide();
	}else{
		if($.cookie('result')!=null && $.cookie('result')!='null'){
		result=JSON.parse($.cookie('result'));
		pid = result.userinfo.pid; 
		}
	}
	
	var currentPage = 0;
	var isFinsih=false;
	var showState=true;
	
	function ajaxList(){
       if(type==1){
			doActionSer("userRechargeLog",{"pid":""+pid,"pageindex":currentPage+""},2,true,userecall);
		}else if (type==2){
			doActionSer("getBuyChapterLog",{"pid":""+pid,"pageindex":currentPage+""},2,true,chargerecall);
		}
    }
	
	//消费记录回调
	function userecall(res){
		console.info(res)
		if(res.result.retcode=="1"){
			var list = res.result.loglist;
			if(list){
				$(".no_record").hide();
				for(var i=0;i<list.length;i++){
				drawChargeLog(list[i]);
				}
			}else {
				if (showState) {
					$(".no_record").show();
				}
			}
		}
	}
	
	//充值记录回调
	function chargerecall(res){
		console.info(res)
		if(res.result.retcode=="1"){
			var list = res.result.loglist;
			if(list){
				$(".no_record").hide();
				for(var i=0;i<list.length;i++){
				drawUseLog(list[i]);
				}
			}else {
				if (showState) {
					$(".no_record").show();
				}
			}
		}
	}
	
	function drawUseLog(log){
		var html='<div class="row consume_record">';
		html+='<ul>';
		html+='<li style="width:15rem; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;color: #ff6600;font-size: 1.0rem; display: inline-block;">购买《'+log.bname+'》</li>';
		html+='<li style="float: right;">';
		html+=log.money;
		if(log.type=="2"){
			html+='阅读券';
		}else if(log.type=="1"){
			html+='阅读币';
		}else if(log.type=="3"){
			html+='代金券';
		}
		html+='</li>';
		html+='</ul>';
		html+='<ul>';
		html+='<li style="display: inline;"><span style="width:13rem;display:inline-block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;margin-right: 0.6rem;font-size: 0.8rem">'+$.trim(log.cname)+'</span></li>';
		html+=' <li style="float: right;font-size: 0.6rem;color: #b2b2b2;">'+log.time+'</li>';
		html+='</ul>';
		html+='</div>';
		html+='<div style="clear:both"></div>';
		$('.consume').append(html);
	}
	
	function drawChargeLog(log){
		var html='<div class="row consume_record">';
		html+='<ul>';
		html+='<li style="color: #ff6600;font-size: 1.1rem; display: inline-block;">充值'+log.money*0.01+'元</li>';
		html+=' <li style="float: right;">';
		if(log.type=="2"){
			html+='微信支付';
		}else if(log.type=="1"){
			html+='支付宝支付';
		}
		html+='</li>';
		html+='</ul>';
		html+='<ul>';
		html+='<li style="display: inline;"><span style="margin-right: 0.6rem;font-size: 0.8rem">获得'+log.readMoney+'阅读币,'+log.readTicket+'阅读券</span></li>';
		html+=' <li style="float: right;font-size: 0.6rem;color: #b2b2b2;">'+log.time+'</li>';
		html+='</ul>';
		html+='</div>';
		html+='<div style="clear:both"></div>';
		$('.consume').append(html);
	}
    $(function(){
        if(type == 1){
            $('.logo-wrap').html('<a href="javascript:history.go(-1);" class="search-back"><img src="images/arrow.png"></a>充值记录');
            document.title="充值记录"; 
        }else{
           $('.logo-wrap').html('<a href="javascript:history.go(-1);" class="search-back"><img src="images/arrow.png"></a>消费记录');
            document.title="消费记录"; 
        }
        $('.record_ul a').click(function(){
            return false;
        });
        
        ajaxList();
        currentPage ++ ;
        $(window).scroll(function () {
        	if(!isFinsih){
        		 if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
        		 	 ajaxList();
        		 	showState=false;
                     currentPage++;
        		 }
        	}
        });
    });