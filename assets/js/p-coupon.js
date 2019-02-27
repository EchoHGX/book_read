$(function(){ 	
	_auto();
	window.onresize=function(){_auto();};
	
	/*用户信息初始化*/
	var user = userInit();
	var pid = null;
	if(isLogin){
		pid = user.userinfo.pid;
		doActionSer("getUserCoupon",{"pid":""+pid,'status':'0'},2,true,function(res){
			console.log(res);
			/*有效券*/
			var effcList = res.result.effcList;
			if(effcList){
				var html = template('coupon', {'list':effcList});
				$(".page-container").append(html);
			}
			/*无效券*/
			var inEffcList = res.result.inEffcList;
			if(inEffcList){
				html = template('coupon-expire', {'list':inEffcList});
				$(".page-container").append(html);
			}
			/*无券*/
			if((!inEffcList)&&(!effcList)){
				var html = template('coupon-not', {});
				$(".page-container").append(html);
			}
		});
	
	}else{
		alert('请先进行登陆');
		urlTo('p-center.html');
	}
	
});