	/*渠道Id初始化*/
		channelInit();
		/*爱汇版本切换*/
		if(channelTools.judgeChannel100224(channel)){
			channelTools.channel100224VerChange();
		}


var bid =getParam("bid");
	//$('.logo-wrap a').attr('href','b-detail.html?bid='+bid);
	var state = getParam("state");
	var curpage = 0;
	var isFinish = false;
	if(state=="1"){
		$('.alert').show();
		$('.logo-wrap a').attr('href','b-detail.html?bid='+bid+'&fromreview=1');
	}
	ajaxList();
    curpage ++ ;
    $(window).scroll(function () {
        if(!isFinsih){
        	if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
        		 ajaxList();
                 curpage++;
        	}
        }
    });
        
    function subrecall(res){
		var commlist =res.result.commtlist;
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
    
    function ajaxList(){
    	doActionSer("getBookCommt",{"bid":bid,"pageindex":""+curpage},1,true,subrecall);
    }
    
    function drawCommLine(comm){
    	var html ='<li style="width:100%;">';
    	html+='<p class="rew-li-l"><a href="javascript:void(0)">';
    	html+='<img src="'+comm.uiconurl+'"></a></p>';
    	html+='<p class="rew-li-r">';
    	html+='<a id="red_url" href="b-review-detail.html?postid='+comm.postid+'&bid='+bid+'&state=2">';
    	html+='<span class="tit">';
    	html+=comm.uname+'<br>';
    	html+='<span class="rew-time">'+comm.time+'</span>';
    	html+='<span class="jinghua-ico answer">';
    	html+='<img src="images/book_detail_review_ico.png">('+comm.commtnum+')';
    	html+='</span>';
    	html+='</span>';
    	//html+='<span class="r_title">'+comm.title+'</span>';
    	html+=' <span class="text">'+comm.content+'</span>';
    	html+='</a>';
    	html+='</p>';
    	html+='</li>';
    	$('.review-ul').append(html);
    }