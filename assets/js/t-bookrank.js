function linkAddFlag(topid,topname,img){
	var url ='t-bookrank-detail.html?topid='+topid+'&topname='+topname+'&img='+img;
	localSto.setLocalStorage('bookrankDetailFlag', 1);
	urlTo(url);
}


$(function(){
	
	/*渠道Id初始化*/
	channelInit();
	
	/*用于统计访问次数，如果从首页进入，则上报访问，上报成功后，更改标识*/
	try{
		if(localSto.getLocalStorage('bookrankFlag')==1){
			console.log('上报');
			doActionSer("mainPageCount",{"channel":""+channel,"page_id":'5',"first_id":'0',"second_id":'0'},2,true,function(res){
				console.log('上报成功');
			});
			localSto.setLocalStorage('bookrankFlag',0);
		}
		
	}catch(e){
		
	}
	
	/*100224爱汇渠道转至爱汇页面*/
	if(channelTools.judgeChannel100224(channel)){
		channelTools.channel100224VerChange();
  	}	
/*获取书籍排行内容*/
doActionSer("getTopBooks",{},1,true,recall);

/*返回上一页特殊设置*/
historyUtil.setBack($('.search-back'));

/*书籍排行内容回调*/
function recall(res){
	var list =res.result.toplist;
	if(list.length>0){
		for(var i=0;i<list.length;i++){
			var bookname=list[i].threebookname;
			var booklist =bookname.match(/\《(.*?)\》/g);
			list[i]['booklist']=booklist;
			var html = template('recommlist', list[i]);
			$(".ranking_list").append(html);
			}
		}
	}
});

share ={"title":"排行榜",
		  "content":"品名著、看小说，读经典，听历史。把书本变薄，把书房变大。让一本书娱乐你的生活！",
	      "imgurl": "http://zmring.oss-cn-hangzhou.aliyuncs.com/book/novel/icon.png"};