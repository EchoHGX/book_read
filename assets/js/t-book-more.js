$(function(){
			/*state:
				0:小编推荐(个性主页)
				1:小编推荐(公共主页)
				2:基因
				3:免费折扣
				4:精选首页				
			*/
			var state =getParam('state');
			var recommlist=null;
			
			var pageindex =0;
			/*渠道Id初始化*/
			channelInit();
			/*100224爱汇渠道转至爱汇页面*/
			if(channelTools.judgeChannel100224(channel)){
				channelTools.channel100224VerChange();
		  	}
			
			var shareTitle;
			if(state=='1'||state=='0'){
				document.title="小编推荐"; 
				$('#headerLogo').html("小编推荐");
				shareTitle="小编推荐";
				if(state=='0'){
					recommlist = JSON.parse(sessionStorage.getItem('recommlist'));
					if(recommlist!=null&&recommlist.length!=0){
						for(var i=0;i<recommlist.length;i++){
							recommlist[i]['channel']=channel;
							var html = template('book', recommlist[i]);
							$(".booklist").append(html);
						}
					}else{
						/*获取更多小编推荐*/
						doActionSer("getLastRec",{},0,true,recall);
					}
				}else{
					/*获取更多小编推荐*/
					doActionSer("getLastRec",{},0,true,recall);
				}
				/*延迟加载书本图片*/
				lazy('.lazy_img');
				
			}else if(state=='2'){
				var geneId = getParam('geneid');
				var genename = getParam('genename');
				document.title=genename; 
				$('#headerLogo').html(genename);
				shareTitle=genename;
				doActionSer("getGeneBookList",{"geneid":""+geneId},1,true,recall);
			}else if(state=='3'){
				var id = getParam('id');
				var name = getParam('name');
				document.title=name; 
				$('#headerLogo').html(name);
				shareTitle=name;
				doActionSer("getFreeBookList",{"listid":""+id,"pageindex":""+pageindex},1,true,recall);
			}else if(state=='4'){
				var mid = getParam('mid');
				var name = getParam('name');
				document.title=name; 
				$('#headerLogo').html(name);
				shareTitle=name;
				doActionSer("getModuList",{"mid":""+mid,"pageindex":""+pageindex},2,true,recall);
			}
			
			
			//设置分享内容
		    share ={"title":""+shareTitle+"",
					  "content":"品名著、看小说，读经典，听历史。把书本变薄，把书房变大。让一本书娱乐你的生活！",
				      "imgurl": "http://zmring.oss-cn-hangzhou.aliyuncs.com/book/novel/icon.png"};
			function recall(res){
				console.log(res);
				$('.bookload').html('没有更多了');
				var list=null;
				if(state=='1'||state=='0'){
					list = res.result.lastRecList;	
				}else if(state=='2'){
					list = res.result.booklist;	
				}else if(state=='3'){
					pageindex++;
					list = res.result.itemlist;
				}else if(state=='4'){
					pageindex++;
					list = res.result.loglist;
				}
				
				if(list!=null){
					if(state=='3'){
						if(list.length==26){
							$('.bookload').html("点击加载更多");
							$(".bookload").click(function(){
								doActionSer("getFreeBookList",{"listid":""+id,"pageindex":""+pageindex},1,true,recall);
							});
						}
					}
					
					if(state=='4'){
						if(list.length==26){
							$('.bookload').html("点击加载更多");
							$(".bookload").click(function(){
								doActionSer("getModuList",{"mid":""+mid,"pageindex":""+pageindex},2,true,recall);
							});
						}
					}
					
				}
				
				if(state=='4'){
					for(var i=0;i<list.length;i++){
						list[i]['channel']=channel;
						var html = template('book1', list[i]);
						$(".booklist").append(html);
					}
					
				}else{
					for(var i=0;i<list.length;i++){
						list[i]['channel']=channel;
						var html = template('book', list[i]);
						$(".booklist").append(html);
					}
				}
				
				/*延迟加载书本图片*/
				lazy('.lazy_img');
			}
			
		});