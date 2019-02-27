var user = userInit();
var pid =null;
var qustionNum;
var aid;
if(isLogin){
	pid = user.userinfo.pid;
}
var currentPage = 0;
var isFinsih=false;
var showState=true;

function ajaxList(){
	doActionSer("getGivingList",{"pid":""+pid,"pageindex":currentPage+""},2,true,recall);
}

//奖励记录回调
function recall(res){
	if(res.result.retcode=="1"){
		var list = res.result.list;
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
function drawChargeLog(log){
	var html='<div class="row consume_record">';
	html+='<ul>';
	html+='<li style="color: #ff6600;font-size: 1.1rem; display: inline-block;">'+log.title+'</li>';
	html+='<li style="float: right;"><span style="margin-right: 0.6rem;font-size: 0.8rem">获得'+log.num+'阅读券</span></li>';
	html+='</ul>';
	html+='<ul>';
	html+='<li style="display: inline-block;"></li>';
	html+=' <li style="float: right;font-size: 0.6rem;color: #b2b2b2;">'+log.date+'</li>';
	html+='</ul>';
	html+='</div>';
	html+='<div style="clear:both"></div>';
	$('.consume').append(html);
}
$(function(){
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