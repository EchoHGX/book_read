	/*渠道Id初始化*/
		channelInit();
		/*爱汇版本切换*/
		if(channelTools.judgeChannel100224(channel)){
			channelTools.channel100224VerChange();
		}
	
	/*
		state:
			1:书本详情
			2：评论区
	*/
	
	var flagstate =getParam('state');
	
	var bid =getParam('bid');
	var state = getParam('state');
	if(flagstate=='1'){
		$('.logo-wrap a').attr('href','b-detail.html?bid='+bid+'&channel='+channel+'&fromreview=1');	
	}
	
			
	/*用户信息初始化*/
	var user = userInit();
	
	var pid ="";
	var curpage = 0;
	var isFinsih = false;
	if(isLogin){
		pid=user.userinfo.pid;
	}else{
		
	}
	
	var postId = getParam("postid");
	doActionSer("getPostInfo",{"postid":postId,"type":"6"},1,true,subrecall);
	function subrecall(res){
		var post = res.result.postlist;
		$('.rew-li-l img').attr('src',post.uiconurl);
		$('.tit').html(post.uname+'<b></b><br><span class="rew-time">'+post.time+'</span><span class="jinghua-ico answer"><img src="images/book_detail_review_ico.png">('+post.commtnum+')</span>');
		$('.r_title').html(post.title);
		$('.text').html(post.content);
		ajaxList();
		curpage++;
	}
	
	function ajaxList(){
    	doActionSer("getPostCommt",{"postid":postId,"type":"6","pageindex":""+curpage},1,true,subrecall2);
    }
	
	$(window).scroll(function () {
        if(!isFinsih){
        	if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
        		 ajaxList();
                 curpage++;
        	}
        }
    });
	
	function subrecall2(res){
		var commlist =res.result.commtList;
		if(commlist==null){
			isFinsih=true;
		}
		if(commlist!=null){
			if(commlist.length<26){
				isFinsih=true;
			}
			for(var i=0;i<commlist.length;i++){
				drawCommLine(commlist[i]);
			}
		}
	}
	
	function drawCommLine(comm){
		var html= '<li>';
		html+='<p class="reply-l">';
		html+='<a href="javascript:void(0)">';
		html+='<img src="'+comm.uiconurl+'">';
		html+='</a>';
		html+='</p>';
		html+='<p class="reply-r">';
		html+='<span class="user_title">'+comm.uname+'</span>';
		html+='<span class="r-time"> '+comm.content+'</span>';
		html+='</p>';
		html+='</li>';
		$('#reply_box').append(html);	
	}
	
	$(function(){
        $('#chongzhi').click(function(){
            var $replyText = $('#replyContent').val();
            if($replyText == ''){
                return false;
            }else{
                $('#replyContent').val(' ');
                return false;
            }
        });
    });
    $('#resubmit').click(function(){
    	var state =true;
    	if(isLogin){
    		var text = $('#replyContent').val();
	        if($.trim(text) == ""){
	            alert("评论不能为空");
	            state = false;
	        }
	       	if($.trim(text).length>100){
	       		 alert("评论字数不能超过100字");
	       		 $('#replyContent').val(' ');
	       		 state = false;
	       	}
	       	
	        if(state){
	        	doActionSer("setComment",{"postid":postId,"type":"6","pid":pid,"content":$.trim(text)},1,true,submitrecall);  
	        }
    	}else{
    		urlTo('p-center.html?origin=10&postid='+postId+'&bid='+bid+'&state='+flagstate);
    	}
    	
        
		      
    });
    function submitrecall(res){
    	if(res.result.retcode=="1"){
    		 window.location.reload();
    	}
    }