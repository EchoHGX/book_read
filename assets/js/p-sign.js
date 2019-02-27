$(function(){ 
	_auto();
	window.onresize=function(){_auto();};
		
	/*渠道Id初始化*/
	channelInit();
	/*爱汇版本切换*/
	if(channelTools.judgeChannel100224(channel)){
		channelTools.channel100224VerChange();
	}
	
	/*用户信息初始化*/
	var user = userInit();
	var pid =null;
	
	var dateCur = new Date();
	var yearCur=dateCur.getFullYear();
	var monthCur=dateCur.getMonth()+1;
	var dayCur = dateCur.getDate();
	$('.cur-date').html(yearCur+'-'+monthCur+'-'+dayCur);
	
	var calUtil = {
		    getDaysInmonth : function(iMonth, iYear){
		      var dPrevDate = new Date(iYear, iMonth, 0);
		      return dPrevDate.getDate();
		    },
		    bulidCal : function(iYear, iMonth) {
		      var aMonth = new Array();
		      aMonth[0] = new Array(7);
		      aMonth[1] = new Array(7);
		      aMonth[2] = new Array(7);
		      aMonth[3] = new Array(7);
		      aMonth[4] = new Array(7);
		      aMonth[5] = new Array(7);
		      aMonth[6] = new Array(7);
		      var dCalDate = new Date(iYear, iMonth - 1, 1);
		      var iDayOfFirst = dCalDate.getDay();
		      var iDaysInMonth = calUtil.getDaysInmonth(iMonth, iYear);
		      var iVarDate = 1;
		      var d, w;
		      aMonth[0][0] = "日";
		      aMonth[0][1] = "一";
		      aMonth[0][2] = "二";
		      aMonth[0][3] = "三";
		      aMonth[0][4] = "四";
		      aMonth[0][5] = "五";
		      aMonth[0][6] = "六";
		      for (d = iDayOfFirst; d < 7; d++) {
		        aMonth[1][d] = iVarDate;
		        iVarDate++;
		      }
		      for (w = 2; w < 7; w++) {
		        for (d = 0; d < 7; d++) {
		          if (iVarDate <= iDaysInMonth) {
		            aMonth[w][d] = iVarDate;
		            iVarDate++;
		          }
		        }
		      }
		      return aMonth;
		    },
		    drawCal : function(iYear, iMonth ,signStr) {
		      var myMonth = calUtil.bulidCal(iYear, iMonth);
		      var htmls = new Array();
		      htmls.push("<table>");
		      htmls.push("<thead><tr>");
		      htmls.push("<th>" + myMonth[0][0] + "</th>");
		      htmls.push("<th>" + myMonth[0][1] + "</th>");
		      htmls.push("<th>" + myMonth[0][2] + "</th>");
		      htmls.push("<th>" + myMonth[0][3] + "</th>");
		      htmls.push("<th>" + myMonth[0][4] + "</th>");
		      htmls.push("<th>" + myMonth[0][5] + "</th>");
		      htmls.push("<th>" + myMonth[0][6] + "</th>");
		      htmls.push("</tr></thead>");
		      var d, w;
		      for (w = 1; w < 7; w++) {
		        htmls.push("<tr>");
		        for (d = 0; d < 7; d++) {
		            htmls.push("<td id='day"+myMonth[w][d]+"'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
		        }
		        htmls.push("</tr>");
		      }
		      htmls.push("</table>");
		      return htmls.join('');
		    }
		};
		
		var date=new Date();
		var iYear=date.getFullYear();
		var iMonth=date.getMonth()+1;
		$(".calender").html(calUtil.drawCal(iYear,iMonth,""));
	
	
	if(isLogin){
    	pid = user.userinfo.pid;
    }else{
    	urlTo('p-center.html?origin=7') ;
    }
	
	doActionSer("userSign",{"pid":""+pid},0,true,function(res){
		doActionSer("getSignedDays",{"pid":""+pid},0,true,function(res){
			console.log(res);
			var signdays=res.result.signdays;
			var num =0;
			var length = signdays.length;
			for ( var i = 0; i < length; i++) {
				var day = signdays.charAt(i);
				var x =i+1;
				if(day==1){
					$("#day"+x+"").addClass("signed");
					num++;
				}else {
					num=0;
				}
			}
			if(num<3){
				$('#day'+(length-num+3)).addClass('gift');
				$('#day'+(length-num+3)).html('');
			}else if(num<7){
				$('#day'+(length-num+7)).addClass('gift');
				$('#day'+(length-num+7)).html('');
			}else if(num<15){
				$('#day'+(length-num+15)).addClass('gift');
				$('#day'+(length-num+15)).html('');
			}else if(num<25){
				$('#day'+(length-num+25)).addClass('gift');
				$('#day'+(length-num+25)).html('');
			}
			$('.sign-info .day').html(num);
			$('.sign-info .ticket').html(res.result.total);
		});
	});
	
	
	
	doActionSer("getUserReadLog",{"pid":"000000000000000"},2,true,function(res){
		if(res.result.retcode==1){
			var list = res.result.loglist;
			var showList =[];
			var length = list.length;
			if(length>=3){
				for(var i=0;i<3;i++){
					var random =Math.floor(Math.random()*length);
					showList.push(list[random]);
					list.splice(random,1);
					length = list.length;
				}
				var info = {'info':showList};
				var html = template('book', info);
				$(".book-recomm").append(html);
			}
		}
	});
});