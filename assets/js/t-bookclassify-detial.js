_auto();
window.onresize=function(){_auto();};


var classcode = getParam('classcode');
var classname = getParam('classname');

/*渠道Id初始化*/
channelInit();

try{
	if(localSto.getLocalStorage('bookclassifyDetailFlag')==1){
		console.log('上报');
		doActionSer("mainPageCount",{"channel":""+channel,"page_id":'4',"first_id":''+classcode,"second_id":'0'},2,true,function(res){
			console.log('上报成功');
		});
		localSto.setLocalStorage('bookclassifyDetailFlag',0);
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

document.title=classname;
var page=0;
var param ={"classcode": "","state":"","purchase":"","refreshtime":"","wordnum":"","sequence":"","pageindex":"0"};
param.classcode = classcode;
$(".logo-wrap span").html(classname);
$("title").html(classname);
var shareTitle=classname;
doActionSer("getClassifyBook",param,1,true,classrecall);
function classrecall(res){
	var booklist=res.result.booklist;
	if (page==0&&booklist==null) {
		$(".booklist").hide();
		$(".placeholder").show();
		$(".bookload").hide();
	}else{
		if (booklist) {
			$("body").css({"overflow-y":"auto","height":"100%"});
			$(".booklist").show();
			$(".placeholder").hide();
			for (var i = 0; i < booklist.length; i++) {
			$(".booklist").append(booklists(booklist[i]));
			$(".bookload").show();
			}
		}else{
			$(".bookload").text("没有更多了");
		}
	}
	/*延迟加载书本图片*/
	lazy('.lazy_img');
}

function lazy(clssName){
	$(clssName).lazyload({
		effect: "fadeIn",
		placeholder : "images/146915821024398292_160_224.png"
	});
}
	
function booklists(bookinfos){
	var status=bookinfos.status;
	if (status=="0") {
		status="连载";
	}else {
		status="完结";
	}
	return "<div class='book_comm'>"+
					"<a href='b-detail.html?bid="+bookinfos.bid+"&channel="+channel+"'>"+
					"<div class='book_img'><img class='lazy_img' data-original='"+bookinfos.iconurl+"'></div>"+
					"<div class='book_content'>"+
						"<span class='book_title'>"+bookinfos.bname+"</span>"+
						"<span class='book_author'>"+bookinfos.author+"</span>"+
						"<span class='book_num'>"+status+"&nbsp;"+bookinfos.wordnum+"</span>"+
						"<div class='book_memo'>"+bookinfos.introduction+"</div>"+
					"</div>"+
				"</a>"+
				"<div class='diver'></div>"+
			"</div>"; 
}
function moreComment(){
	page=page+1;
	param.pageindex=page+"";
	doActionSer("getClassifyBook",param,1,true,classrecall);
}
doActionSer("getThirdClass",param,1,true,thirdclassrecall);
function thirdclassrecall(ref){
	var classlists=ref.result.classlist;
	if (classlists) {
		$("#reclassify").show();
		$("#reclassify").prev().show();
		for ( var j = 0; j < classlists.length; j++) {
			$("#reclassify").append(reclassify(classlists[j]));
		}
	}else {
		$("#reclassify").hide();
		$("#reclassify").prev().hide();
	}
	var uls = $("#screen ul li");
		uls.click(function(){
			page=0;
			var par = this.parentNode;   //得到s的父节点
			var chils= par.childNodes;  //得到s的全部子节点
			if($(this).hasClass("lis")){
				var key = $(par).attr("key");
				if (key=="classcode") {
				param[key]=classcode;
			}else {
				param[key]="";
			}
				$(this).removeClass("lis");
			}else{
				for(var i = chils.length - 1; i >= 0; i--) {
					if(chils[i]){$(chils[i]).removeClass("lis");}
				} 
				$(this).addClass("lis");
				var key = $(par).attr("key");
				var dat=$(this).attr("dat");
			param.pageindex="0";
				param[key]=dat;
			}
			//alert(JSON.stringify(param));
		});
}
function reclassify(classlist){
	return "<li dat='"+classlist.classcode+"'>"+classlist.classname+"</li>";
}


$("#select").click(function(){
	$("#selectAll").slideToggle("fast");
	var booklist = $(".booklist").html();
	if (booklist == null || booklist.length == 0) {
			$(".select1").css("color","#FD6974");
			$(".select2").css("color","#555555");
		$("#screen").hide();
		$(".booklist").hide();
	} else {
		$(".booklist").show();
		$("#screen").hide();
		$(".placeholder").hide();
			$(".select1").css("color","#FD6974");
			$(".select2").css("color","#555555");
	}
	});
function screen(screen){
		if ($("#screen").is(":visible") ) {
		$("#screen").hide();
		$(".booklist").show();
		$("body").css({"overflow-y":"auto","height":"100%"});
	}else{
		$("#screen").show();
			$(".placeholder").hide();
			$("#selectAll").hide();
		$(".booklist").hide();
		$(".select1").css("color","#555555");
			$(".select2").css("color","#FD6974");
			$("body").css({"overflow":"hidden","height":"500px"});
	}
	}
	var selects=$("#selectAll div");
	selects.click(function(){
		page=0;
	var select = this.parentNode;   //得到s的父节点
		var children= select.childNodes;  //得到s的全部子节点
		for(var i = children.length - 1; i >= 0; i--) {if(children[i]){$(children[i]).removeClass("selectCss");}} 
		$(this).addClass("selectCss");
		var key = $(select).attr("key");
		var dat=$(this).attr("dat");
		param[key]=dat;
		$(".select1").text($(this).text());
		$(".select1").css("color","#FD6974");
		param.pageindex="0";
		//alert(JSON.stringify(param));
	doActionSer("getClassifyBook",param,1,true,screenrecall);
		$("#selectAll").hide();
		
	});
	$("#ensure").click(function(){
	$("#screen").hide();
	$(".booklist").show();
	doActionSer("getClassifyBook",param,1,true,screenrecall);
	});
	function screenrecall(rep){
		//alert(JSON.stringify(rep));
		var book=rep.result.booklist;
		if (page==0&&book==null) {
			$(".booklist").html("");
		$(".placeholder").show();
		$(".bookload").hide();
	}else{
			if(book){
				$("body").css({"overflow-y":"auto","height":"100%"});
				$(".placeholder").hide();
				$(".booklist").show();
			$(".booklist").html("");
			for ( var k = 0; k < book.length; k++) {
				$(".booklist").append(booklists(book[k]));
				$(".bookload").show();
				$(".bookload").text("点击加载更多");
			}
		}else{
			$(".bookload").show();
			$(".bookload").text("已无更多");
		}
	}
		/*延迟加载书本图片*/
	lazy('.lazy_img');
	}
	
	
	//设置分享内容
    share ={"title":""+shareTitle+"",
			  "content":"品名著、看小说，读经典，听历史。把书本变薄，把书房变大。让一本书娱乐你的生活！",
		      "imgurl": getParam('img')+''};
    console.log(share);
    shareInfo.title=shareTitle;
    shareInfo.subtitle = "品名著、看小说，读经典，听历史。把书本变薄，把书房变大。让一本书娱乐你的生活！";
    shareInfo.icon = getParam('img');
    shareInfo.url = window.location.href;
    