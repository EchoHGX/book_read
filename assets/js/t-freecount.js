$(function(){
	/*渠道Id初始化*/
	channelInit();
	
	/*用于统计访问次数，如果从首页进入，则上报访问，上报成功后，更改标识*/
	try{
		if(localSto.getLocalStorage('freecountFlag')==1){
			console.log('上报');
			doActionSer("mainPageCount",{"channel":""+channel,"page_id":'7',"first_id":'0',"second_id":'0'},2,true,function(res){
				console.log('上报成功');
			});
			localSto.setLocalStorage('freecountFlag',0);
		}
		
	}catch(e){
		
	}
	
	
	/*100224爱汇渠道转至爱汇页面*/
	if(channelTools.judgeChannel100224(channel)){
		channelTools.channel100224VerChange();
  	}
	
	
	/*获取免费列表*/
	doActionSer("getFreeBook",{"pageindex":"0"},1,true,recall);
	
	function recall(res){
		var itemlist = res.result.itemlist;
		if(itemlist.length>0){
			for(var i =0;i<itemlist.length;i++){
				itemlist[i]['channel']=channel;
				if(i%2==0){
					var html = template('free_book_row', itemlist[i]);
					$(".free_list").append(html);
				}else{
					var html = template('free_book_col', itemlist[i]);
					$(".free_list").append(html);
				}
			}
		}
		/*延迟加载书本图片*/
		lazy('.lazy_img');
	}
});