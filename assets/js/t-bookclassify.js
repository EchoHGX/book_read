		function linkAddFlag(classcode,classname,img){
			var url ='t-bookclassify-detial.html?classcode='+classcode+'&classname='+classname+'&img='+img;
			localSto.setLocalStorage('bookclassifyDetailFlag', 1);
			urlTo(url);
		}


		_auto();
		window.onresize = function () {
			_auto();
		};

		/*渠道Id初始化*/
		channelInit();
		
		/*用于统计访问次数，如果从首页进入，则上报访问，上报成功后，更改标识*/
		try{
			if(localSto.getLocalStorage('bookclassifyFlag')==1){
				console.log('上报');
				doActionSer("mainPageCount",{"channel":""+channel,"page_id":'3',"first_id":'0',"second_id":'0'},2,true,function(res){
					console.log('上报成功');
				});
				localSto.setLocalStorage('bookclassifyFlag',0);
			}
			
		}catch(e){
			
		}
		
		
		/*100224爱汇渠道转至爱汇页面*/
		if(channelTools.judgeChannel100224(channel)){
			channelTools.channel100224VerChange();
	  	}
		
		/*返回上一页特殊设置*/
		historyUtil.setBack($('.search-back'));
		
		
		var classcode = "802";
		
		/*sex:使用前先进行userInit
		0:未设置 1:男 2:女   */
		var user= userInit();
		function getUserSex(user){if(user==null)return '0';else return user.userinfo.sex;}
		var sex =getUserSex(user);
		if(sex=='1'){
			classcode="802";
		}else if(sex=='0'||sex=='2') {
			classcode="803";
		}
		$('#'+classcode).addClass('active');
		doActionSer("getBookClassify",{"classcode":""+classcode},1,true,subrecall);
		/*书籍分类回调*/
		function subrecall(res){
			/*绘制分类列表*/
			//console.info(JSON.stringify(res))
			var secondList=res.result.first.second;
			var second = {};
			second["secondlist"]=secondList;
			$("#classify_list").html("");
			var html = template('secondlist', second);
			$("#classify_list").append(html);
			/*绘制首页广告*/
			var advlist = {};
			advlist["topadvlist"]=res.result.advlist;
			advlist["channel"]=channel;
			$("#topAdv").html("");
			console.log(advlist);
			var html = template('banner', advlist);
			$("#topAdv").append(html);
			/*轮播广告添加特效*/
			TouchSlide({
				slideCell:"#ad_banner",
				titCell : ".hd ul",
				mainCell : ".bd ul",
				effect : "leftLoop",
				autoPage : true,
				autoPlay : true,
				interTime:3000
			});
		}
		
		/*标签切换*/
		$(".classify_tag a").click(function(){
		  $(".classify_tag a").removeClass('active');
		  $(this).addClass('active');
		  var id = $(this).attr('id');
		  classcode=id;
		  doActionSer("getBookClassify",{"classcode":""+classcode},1,true,subrecall);
		});