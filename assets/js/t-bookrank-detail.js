$(function(){
	var topId= getParam('topid');
	var pageindex=0;
	var topName =getParam('topname');
	

	/*渠道Id初始化*/
	channelInit();
	
	try{
		if(localSto.getLocalStorage('bookrankDetailFlag')==1){
			console.log('上报');
			doActionSer("mainPageCount",{"channel":""+channel,"page_id":'6',"first_id":''+topId,"second_id":'0'},2,true,function(res){
				console.log('上报成功');
			});
			localSto.setLocalStorage('bookrankDetailFlag',0);
		}
		
	}catch(e){
		
	}
	
	/*100224爱汇渠道转至爱汇页面*/
	if(channelTools.judgeChannel100224(channel)){
		channelTools.channel100224VerChange();
  	}
	/*返回上一页特殊设置*/
	historyUtil.setBack($('.search-back'));
	
	/*分享*/
	shareUtil.shareInit();
	shareUtil.shareShow($('.share'));
	
	var user= userInit();
	/*sex:使用前先进行userInit
		0:未设置 1:男 2:女   */
	function getUserSex(user){if(user==null)return '0';else{
		if(user.userinfo.sex=='男'){
			return 1;
		}else if(user.userinfo.sex=='女'){
			return 2;
		} return user.userinfo.sex;}}

	var sex =getUserSex(user);
	if(sex=='0'){sex='2';}
	$('#'+sex).addClass('active');
	
	document.title=topName; 
	$('.logo-wrap span').html(topName);
	var shareTitle=topName;
	var shareImg=getParam('img');
	
	addClickMore();
	getTopBooksInfo();
	
	/*获取书籍排行内容*/
	function getTopBooksInfo(){
		doActionSer("getTopBooksInfo",{"pageindex":""+pageindex,"topid":""+topId,"type":""+sex},1,true,recall);
	}
		
	/*书籍排行内容回调*/
	function recall(res){
		pageindex++;
		var result = res.result;
		result['channel']=channel;
		if(result.booklist.length>0){
			if(result.booklist.length<26){
				$('.bookload').html("没有更多了");
				$('.bookload').unbind();
			}
			var html = template('booklist', result);
			$(".book_rank_list").append(html);
		}
		/*延迟加载书本图片*/
		lazy('.lazy_img');
	}
	//设置分享内容
	share ={"title":""+shareTitle+"",
			  "content":"品名著、看小说，读经典，听历史。把书本变薄，把书房变大。让一本书娱乐你的生活！",
		      "imgurl": ""+shareImg+""};
	 	shareInfo.title=shareTitle;
	    shareInfo.subtitle = "品名著、看小说，读经典，听历史。把书本变薄，把书房变大。让一本书娱乐你的生活！";
	    shareInfo.icon = shareImg;
	    shareInfo.url = window.location.href;
	
	/*标签切换*/
	$(".classify_tag a").click(function(){
	  sex = $(this).attr('id');
	  $(".classify_tag a").removeClass('active');
	  $(this).addClass('active');
	  $('.book_rank_list').html("");
	  addClickMore();
	  getTopBooksInfo();
	});
	
	/*添加加载更多事件*/
	function addClickMore(){
		$('.bookload').html("点击加载更多");
		pageindex=0;
		$(".bookload").click(function(){
			doActionSer("getTopBooksInfo",{"pageindex":""+pageindex,"topid":""+topId,"type":""+sex},1,true,recall);
		});
	}	
});