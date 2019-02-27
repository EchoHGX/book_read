function _auto(){var e=360,t=document.documentElement.clientWidth;if(t!==e){var n=document.getElementsByTagName("head")[0],m=document.createElement("style");m.innerHTML="html{font-size:"+t/e*100+"%;}",n.appendChild(m);}};
_auto();
window.onresize=function(){_auto();};

/*渠道Id初始化*/
channelInit();
/*100224爱汇渠道转至爱汇页面*/
if(channelTools.judgeChannel100224(channel)){
	channelTools.channel100224VerChange();
	}

$(function(){
	var flag=getParam("flag");
	if (flag=="1") {
		$(".back").attr("href","index.html");
	}
	
	/*获取热门推荐内容*/
	doActionSer("getHotRecommend",{"channelid":""+channel,"pid":""},1,true,hotrecall);
	
	/*热门推荐回调*/
	function hotrecall(res){
		/*绘制热门推荐列表*/
		var hotRecommList= res.result.hotlist;
		var hotrecomm = {};
		hotrecomm["hotrecommlist"]=hotRecommList;
		hotrecomm["channel"]=channel;
		
		var html = template('hotrecommlist', hotrecomm);
		$(".hot-contnet").append(html);
		
		$('.searchKey').click(function(){
			$('.search-box input').val($(this).attr('content'));
			search();
		});
	}
	
	
	var historyC = $.cookie("history");
	var history=new Array();
	
	if(historyC!=null){
		history =JSON.parse(historyC);
	}
	
	for(var i =0;i<history.length;i++){
		$('.history-list').append('<a class="history ellipsis searchKey" content="'+history[i]['name']+'" href="javascript:void(0)">'+history[i]['name']+'</a>');
	}
	 
	/*点击搜索*/
	$('.search-btn').click(function(){
		search();
	});
	
	if(getParam("words")!=null){
		$('.search-box input').val(getParam("words"));
		search();
	}
	
	function search(){
		var searchKey = $.trim($('.search-box input').val());
		if(searchKey==''){
			return;
		}
		var length = history.length;
		if(length==0){
			history.unshift({"name":searchKey});
		}else{
			for(var i=0;i<length;i++){
				var name= history[i]['name'];
				if(searchKey==history[i]['name']){
					history.splice(i,1);
					break;
				}
			}
			history.unshift({"name":searchKey});
			if(history.length>15){
				history.splice(15,history.length-15);
			}				
		}
		$.cookie("history",JSON.stringify(history), {path: "/", expires: 365 });
		
		$('.history-list').empty();
		for(var i =0;i<history.length;i++){
			$('.history-list').append('<a class="history ellipsis searchKey" content="'+history[i]['name']+'" href="javascript:void(0)">'+history[i]['name']+'</a>');
		}
		
		$('.searchKey').click(function(){
			$('.search-box input').val($(this).attr('content'));
			search();
		});
		$.cookie("word",searchKey, {path: "/"});
		urlTo('search-result.html');
	}
	
	
	/*关键词点击*/
	$('.searchKey').click(function(){
		$('.search-box input').val($(this).attr('content'));
		search();
		
	});
	
	/*删除历史记录操作*/	
	$('.del').click(function(){
		$('.history-list').empty();
		history.length=0;
		$.cookie("history",JSON.stringify(history), {path: "/"});
		});
});