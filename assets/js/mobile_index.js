~function(){
	var core = {};

	core.error = [];
	core.register = function(e, c) {
		var g = e.split(".");
		var f = core;
		var b = core.error;
		var d = null;
		while (d = g.shift()) {
			if (g.length) {
				if (f[d] === undefined) {
					f[d] = {}
				}
				f = f[d]
			} else {
				if (f[d] === undefined) {
					try {
						f[d] = c(core);
					} catch(h) {
						b.push(h)
					}
				}
			}
		}
	}

	core.register('delay', function(){
		return function(){
			return setTimeout(fn, delay || 0);
		}
	});

	core.register('random', function(){
		var round = Math.round, random = Math.random, pow = Math.pow;
		return function(count, start){
			count = count || 5;
			start = start || 1;
			return round( random() * pow( 10,count ) ) * start;
		}
	});

	core.register('go', function(){
		var local = location
		return function(url, isNewWindow){
			var href = '';
			if( url == 'me'){
				href = local.href;
			}else if( /^#/.test(url) ){
				href = local.origin + local.pathname + url;
			}else{
				href = url;
			}
			if( !isNewWindow ){
				local.href = href;
			}else{
				window.open(href)
			}
			return local;
		}
	});

	core.register('user.behaviorPost', function(){
		return function(id, index){
			var img = new Image();
			img.src = 'http://click.motieimg.com/m.gif?id='+id+'&index='+index+'&_='+core.random();
			img = null;
		}
	});

	core.register('user.behaviorAction', function(){
		return function(context){
			$(context || 'body').on('click', '[data-collect-id]', function(e){
				var section = $(this), anchor = $(e.target), id = section.data('collect-id'), 
					//如果自身没有属性，则只寻找父级元素，再没有则认为不是追踪链接
					//之所以没有持续查找是为了保证点击的元素确实是要追踪的链接
					index = anchor.data('collect-index') || anchor.parent().data('collect-index');
				
				if(index){
					core.user.behaviorPost(id, index);
					
					var a = anchor.is('a') ? anchor : anchor.parent();
					var href = a.attr('href');
					if(a.is('a') && a.attr('target') != '_blank'){
						core.delay(function(){
							core.go(href);
						}, 20);
						return false;
					}
				}
			});
		}
	});

	core.register('staff.collect', function(){
		var collect = {
			button: null,
			pageData: null,
			createOver: false,
			geting: false,
			collects: null,
			pv: [],
			ip: [],
			//插入数据
			insert: function(item, id, index, data){
				var tip = $('<a href="http://www.motie.com/click/result?pIds='+id+'" target="_blank" class="mo-ui-collect-tips" />').attr({
					"collect-id": id,
					"collect-index": index,
					"id": "mo-collect-id-"+id+'-'+index
				}).data('element', item);
				
				collect.position(item, tip);
				
				tip.html('<b>pv:</b>'+data.pv+' <b>ip:</b>'+data.ip+' <sub>id:'+id+' index:'+index+'</sub>');
				$('body').append(tip);
				return tip
			},
			position: function(item, tip){
				var top = item.offset().top+parseInt(item.css('padding-top'))-15,
					left = item.offset().left-parseInt(item.css('padding-left'));
				
				tip.css({
					top: top,
					left: left
				})
			},
			show: function(){
				//获取所有被追踪区域
				var collects = collect.collects;
				function create(storage){
					collects.each(function(){
						var area = $(this), id = area.data('collect-id'), data = storage[id];
						//如果存在数据并且不是空
						if(data && !$.isEmptyObject(data)){
							var indexs = area.find('[data-collect-index]');
							//如果区域下有追踪索引
							if(indexs.length){
								//遍历数据索引
								for(var i in data){
									var sdata = data[i];
									var item = indexs.filter('[data-collect-index='+i+']');
									//如果存在对应元素
									if(item.length){
										collect.insert(item.first(), id, i, sdata)
									}
								}
							}
						}
					});
					$('body').delegate('.mo-ui-collect-tips', 'mouseenter', function(){
						$(this)[0].style.zIndex = '1000'
						$(this).data('element').effect('highlight')
					}).delegate('.mo-ui-collect-tips','mouseleave',function(){
						$(this)[0].style.zIndex = '100'
					});
					collect.createOver = true
				}
				
				if(collect.pageData == null){
					collect.geting = true;
					var pids = [];
					collects.each(function(){
						pids.push( '&pIds='+$(this).data('collect-id') )
					});
					collect.button.addClass('icon-loading');
					$.getJSON('http://www.motie.com/click/ajax/result?callback=?'+pids.join(''), function(data){
						collect.geting = false;
						create(data);
						collect.pageData = data;
						collect.button.removeClass('icon-loading');
					})
				}else{
					$("body").toggleClass('mo-ui-collect-tips-toggle');
				}
			},
			setup: function(){
				collect.collects = $('body [data-collect-id]');
			}
		}

		return collect
	});

	window.motie = core;
	
}();

//function GetRTime(){
//    var t =$("#expand").val();
//    $("#expand").val(t-1000);
//    //alert(t);
//    var d=0;
//    var h=0;
//    var m=0;
//    var s=0;
//    if(t>=0){
//      d=Math.floor(t/1000/60/60/24);
//      h=Math.floor(t/1000/60/60%24);
//      m=Math.floor(t/1000/60%60);
//      s=Math.floor(t/1000%60);
//      $("#t_d").html(d+"天");
//      $("#t_h").html(h+"天");
//      $("#t_m").html(m+"分");
//      $("#t_s").html(s+"秒");
//    }x
//  }


function discoutBuy(bookId){
	var url="/book/buy/discount/"+bookId;
	$.ajax({
		url:url,
		type:"get",
		success:function(msg){
			if(msg!=null&&msg.code=="success"){
				console.log($(".alert").html());
				if($(".alert").html()!=null){
					$(".alert").html(msg.message);
				}
				else{
					$(".txtbox-item").before("<div class='alert'>"+msg.message+"</div>");
				}
				
			}
			else{
				$(".txtbox-item").before("<div class='alert'>"+msg.message+"</div>");
			}
		}
	})
}