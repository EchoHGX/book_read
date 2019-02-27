function _auto(){var e=360,t=document.documentElement.clientWidth;if(t!==e){var n=document.getElementsByTagName("head")[0],m=document.createElement("style");m.innerHTML="html{font-size:"+t/e*100+"%;}",n.appendChild(m);}};
	_auto();
	window.onresize=function(){_auto();};
	
	/*渠道Id初始化*/
	channelInit();
	

	/*用于统计访问次数，如果从首页进入，则上报访问，上报成功后，更改标识*/
	try{
		if(localSto.getLocalStorage('latelyFlag')==1){
			console.log('上报');
			doActionSer("mainPageCount",{"channel":""+channel,"page_id":'10',"first_id":'0',"second_id":'0'},2,true,function(res){
				console.log('上报成功');
			});
			localSto.setLocalStorage('latelyFlag',0);
		}
		
	}catch(e){
		
	}
	
	/*
	lateType: 
		1:在读
		2：收藏	
	*/    	
   	var lateType = $.cookie('lateType');
   	if(lateType==null){
   		lateType=1;	
   	}
   	
   	if(!RTool.getLocalStorage('read-ver')){
		RTool.setLocalStorage('read-ver','old');
	}
   	
   	/*爱汇版本切换*/
	if(channelTools.judgeChannel100224(channel)){
		channelTools.channel100224VerChange();
	}
		
	var pid ="";
	/*用户信息初始化*/
	var user = userInit();
		
	var booklog=$.cookie('booklog');
	
	
	
	if(isLogin){		
		pid = user.userinfo.pid; 
		if(lateType==1){
			/*用户初次登陆后，上传未登陆前的阅读记录*/
		    if(booklog!=null){
		    	booklog=JSON.parse(booklog);
		    	doActionSer("updateReadLog",{"pid":""+pid,"readlog":booklog},2,true,updaterecall);
		    }else{
		    	/*获取云端的阅读记录*/
		    	doActionSer("getUserReadLog",{"pid":""+pid},2,true,logrecall);
		    }
		}else{
			doActionSer("getUsrCollect",{"pid":""+pid,"pageidx":"0"},2,true,logrecall);
			$('.title-name').html('书架收藏(');
			$('.chosen-item').removeClass('item-active');
			$('.chosen-favor').addClass('item-active');
		}
		
	}else{
		urlTo('p-center.html?origin=5');
	}
		
	function updaterecall(res){
		/*获取云端的阅读记录*/
		doActionSer("getUserReadLog",{"pid":""+pid},2,true,logrecall);
		/*清空本地阅读记录*/
		$.cookie("booklog",JSON.stringify(booklog), {path: "/", expires: 0});
	}
		
		
	//请求记录回调
	function logrecall(res){
		$(".book-list").html('');
		var listLength=0;
		var list= null;
		if(lateType==1){
			list= res.result.loglist;
		}else{
			list= res.result.collectlist;
		}
		if(list!=null){
			listLength = list.length;
			$('.book-num').html(listLength);
				for(var i=0;i<listLength;i++){
					list[i]['lateType']=lateType;
					list[i]['channel']=channel;
					var html = template('book', list[i]);
					$(".book-list").append(html);
				}
			}
			bookClick();
			
			lazy('.lazy_img');
		}
    
    function bookClick(){
    	$('.book').click(function(){
			var bid = $(this).find('.book-id').html();
//			var sys=$.cookie('sys');
//			if(sys==null){
//				if(bid.indexOf('ks')==-1){
//					urlTo('b-detail.html?bid='+bid);
//				}else{
//					$('.go-download').show();
//					$('.go-download .gd-close').click(function(){
//						$('.go-download').hide();
//					});
//					
//					$('.go-download .gd-btn').click(function(){
//						urlTo('download-tip.html?download=1');
//					});
//				}
//			}else{
				urlTo('b-detail.html?bid='+bid);
//			}
			
		});
    }
    
    
    /*标题栏切换*/
   	$('.chosen-item').click(function(){
   		$('.chosen-item').removeClass('item-active');
   		$(this).addClass('item-active');
   		if($(this).hasClass('chosen-read')){
   			$('.title-name').html('书架在读(');
   			$('.book-num').html(0);
   			lateType=1;
   			$.cookie("lateType",lateType, {path: "/", expires: 365 });
   			doActionSer("getUserReadLog",{"pid":""+pid},2,true,logrecall);
   		}
   		if($(this).hasClass('chosen-favor')){
   			$('.title-name').html('书架收藏(');
   			$('.book-num').html(0);
   			lateType=2;
   			$.cookie("lateType",lateType, {path: "/", expires: 365 });
   			doActionSer("getUsrCollect",{"pid":""+pid,"pageidx":"0"},2,true,logrecall);
   		}
   	});
    
    	
   	/*编辑按钮添加点击事件*/
   	$('.edit').click(function(){
   		$('.edit').hide();
   		$('.chosen-radio').show();
   		$('.cancel').show();
   		$('.book-read').hide();
   		
   		$('.page-header').hide();
   		
   		$('.bar-title').addClass('bar-title-center');
   		$('.bar-title').removeClass('bar-title');
   		
   		$('.chose-all').show();
   		
   		$('.book').unbind('click');
   		/*添加点击事件*/
   		$('.book').click(function(){
    		var radio= $(this).find('.chosen-img');
    		radio.toggleClass('radio-chosen');
    		if(radio.hasClass('radio-chosen')){
	    		radio.attr('src','images/chosen.png');
    		}else{
    			radio.attr('src','images/chosen-not.png');
    		}
    		
    		if($('.book').find('.radio-chosen').length>0){
    			/*删除按钮显示*/
    			delShow();
    		}else{
    			/*删除按钮隐藏*/
		   		delHide();
    		}
    	});
   		
   		
   	});
    	
    $('.cancel').click(function(){
    	/*点击取消时，去除之前选中的选项,并移除点击事件*/
    	$('.chosen-img').removeClass('radio-chosen');
   		$('.chosen-img').attr('src','images/chosen-not.png');
   		$('.book').unbind("click");
   		
   		bookClick();
   		
   		$('.cancel').hide();
   		$('.chosen-radio').hide();
   		$('.edit').show();
   		$('.book-read').show();
   		
   		$('.page-header').show();
   		
   		$('.bar-title-center').addClass('bar-title');
   		$('.bar-title-center').removeClass('bar-title-center');
   		
   		$('.chose-all').hide();
   		
   		if(lateType==1){
    		/*重新加载阅读记录*/
    		doActionSer("getUserReadLog",{"pid":""+pid},2,true,logrecall);
    	}else{
    		doActionSer("getUsrCollect",{"pid":""+pid,"pageidx":"0"},2,true,logrecall);
    	}
   		/*删除按钮隐藏*/
		delHide();
   		
   	});
    	
   	/*编辑界面，全选操作*/
   	$('.chose-all').click(function(){
   		$('.chose-all').toggleClass('chose-all-not');
   		
   		if($(this).hasClass('chose-all-not')){
   			$('.chose-all').html('全不选');
   			$('.chosen-img').addClass('radio-chosen');
   			$('.chosen-img').attr('src','images/chosen.png');
   			delShow();
   		}else{
   			$('.chose-all').html('全选');
   			$('.chosen-img').removeClass('radio-chosen');
   			$('.chosen-img').attr('src','images/chosen-not.png');
   			delHide();
   		}
    });
    
    /*删除操作*/
    $('.delete').click(function(){
    	/*遍历获取删除的bid*/
    	var bidStr = '';
    	$('.book').find('.radio-chosen').each(function(){
    		bidStr +=$(this).parent().prev('.book-id').html()+',';
    		/*页面上删除当前元素*/
    		$(this).parent().parent().remove();
    	});
    	bidStr=bidStr.substr(0,bidStr.length-1);
    	if(lateType==1){
    		/*删除阅读记录*/
    		doActionSer("delReadLog",{"pid":""+pid,"bid":bidStr},2,true,delrecall);
    	}else{
			doActionSer("delCollect",{"pid":""+pid,"bid":bidStr},2,true,delrecall);
    	}
    	function delrecall(res){
			var booklength = $('.book-list').find('.book').length;
			$('.book-num').html(booklength);
		}
    	delHide();
    });
    
    
    
    
   	/*微信配置特殊处理，返回栏返回至首页*/
    var flag=getParam("flag");
	if (flag=="1") {
		$(".header-back").attr("href","index.html");
	}   
	    
		
	//记录删除操作
    function deleteReading(t){
    	var bookId =$(t).parent().find('input[name="bookId"]').val();
    	var book = $(t).parent();
		doActionSer("delReadLog",{"pid":""+pid,"bid":""+bookId},2,true,delrecall);
    	book.parent().remove();
    	return false;
    }
		
	function delrecall(res){}
	
	/*删除按钮隐藏*/
	function delHide(){
		$('.delete').hide();
		$('.delete-bottom').hide();
	}
	
	function delShow(){
		$('.delete').show();
		$('.delete-bottom').show();
	}
	
	function readChapter(bid, cid, channel){
		event.stopPropagation();
		
//		var sys=$.cookie('sys');
//		if(sys==null){
//			if(bid.indexOf('ks')==-1){
//				urlTo('b-read-new.html?bid='+bid+'&cid='+cid+'&channel='+channel);
//			}else{
//				$('.go-download').show();
//				$('.go-download .gd-close').click(function(){
//					$('.go-download').hide();
//				});
//				
//				$('.go-download .gd-btn').click(function(){
//					urlTo('download-tip.html?download=1');
//				});
//			}
//		}else{
		var readUrl ='b-read-new.html';
		if(RTool.getLocalStorage('read-ver')=='old'){
			readUrl = 'b-read.html';
		}else{
			readUrl = 'b-read-new.html';
		}
		
		urlTo(readUrl+'?bid='+bid+'&cid='+cid+'&channel='+channel);
//		}
		
	}
	