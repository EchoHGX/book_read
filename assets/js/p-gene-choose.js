$(function(){
			/*用户信息初始化*/
			var user = userInit();
			
			/*用户未登录跳转至登陆页面*/
			if(!isLogin){
				urlTo('p-center.html?origin=6');
			}
			
			/*获取待选基因列表*/
			doActionSer("getGeneList",{},0,true,generecall);
			/*基因接口回调*/
			function generecall(res){
				var boylist = res.result.boylist;
				var girllist = res.result.girllist;
				/*绘制男生基因*/
				if(boylist.length>0){
					var html='';
					for(var i =0;i<boylist.length;i++){
						var gene = boylist[i];
						/*每三个换行*/
						if(i%3==0){
							html ='<div class="gene_list_row">';
						}
						html+='<div id="'+gene.geneid+'" class="gene_boy_not">'+gene.genename+'</div>';
						if((i+1)%3==0){
							html+='<div class="clear"></div></div>';
							$('.gene_boy_list').append(html);
						}
					}
				}
				/*绘制女生基因*/
				if(girllist.length>0){
					var html='';
					for(var i =0;i<girllist.length;i++){
						var gene = girllist[i];
						/*每三个换行*/
						if(i%3==0){
							html ='<div class="gene_list_row">';
						}
						html+='<div id="'+gene.geneid+'" class="gene_girl_not">'+gene.genename+'</div>';
						if((i+1)%3==0){
							html+='<div class="clear"></div></div>';
							$('.gene_girl_list').append(html);
						}
					}
				}
				/*绘制已选基因*/
				var gene = user.userinfo.genelist;
				if(gene!=null){
					for(var i=0;i<gene.length;i++){
						$('#'+gene[i].geneid).addClass('gene_choose');
					}
				}
				
				/*添加点击事件*/
				addClick(user);
			}
		});
		/*添加点击事件*/	
		function addClick(user){
			/*为基因选项添加点击事件*/	
			var genelist=new Array();
			$(".gene_list_row div").click(function(){  
				/*切换选中样式*/
				$(this).toggleClass("gene_choose");
			});
			/*为'开始私人定制'添加点击事件*/
			$(".button_content").click(function(){
				var geneChoose='';
				var genelist=new Array();
				/*获取用户选择的基因*/
			 	$('.gene_choose').each(function(i){
			 		geneChoose+=$(this).attr('id')+',';
			 		var geneC ={};
			 		geneC['geneid']=$(this).attr('id');
			 		geneC['genename']=$(this).text();
			 		genelist.push(geneC);
			 	});
			 	/*更改本地用户信息*/
			 	user.userinfo['genelist']=genelist;
			 	$.cookie("result",JSON.stringify(user), {path: "/", expires: 365 });
			 	/*将新的基因提交至服务器*/
				doActionSer("setUserGene",{"genelist":""+geneChoose,"sex":""+user.userinfo.sex,"pid":""+user.userinfo.pid},0,true,changerecall);
			});  
			
			/*跳转至个性主页*/
			function changerecall(res){
				urlTo('index.html');
			}
		} 