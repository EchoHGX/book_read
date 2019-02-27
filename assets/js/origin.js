/*
 * 此处记录可以进入p-center个人中心页的页面
 * 需进行common.js
 * 需进行channelInit();
 * origin:
				1:个性主页 
				2:公共主页
				3:图书详情
				4:阅读界面
				5:最近阅读
				6:我的基因
				7:签到记录
				8:充值
				9:淘书
				10:评论详情
				11:付费章节用户未登录特殊处理，返回到书本详情页
				12:精彩抢书券周活动页
				13:整本
				14:兑换码
				15：漫画
				16:国庆活动
 * 
 */

/*
 * origin:来源
 * url：默认值
 * */
function getPageByOrigin(origin,url){
	switch(origin){
		case '1':
			url='index.html';
			break;
		case '2':
			url='index-comm.html';
			break;
		case '3':
			var bid =$.cookie('bid');
			url='b-detail.html?bid='+bid+'&channel='+channel+'&fromreview=1';
			break;
		case '4':
			var bid =$.cookie('bid');
			var cid =$.cookie('cid');
			url='b-read-new.html?channel='+channel+'&bid='+bid+'&cid='+cid;
			break;
		case '5':
			url='index.html';
			break;
		case '6':
			url='p-gene-choose.html';
			break;
		case '7':
			url='p-sign.html?flag=1';
			break;
		case '8':
			url='pay.html';
			break;
		case '9':
			url='t-index.html';
			break;
		case '10':
			var postid=$.cookie('postid');
			var bid =$.cookie('bid');
			var state =$.cookie('state');
			url='b-review-detail.html?postid='+postid+'&bid='+bid+'&state='+state;
			break;
		case '11':
			var bid =$.cookie('bid');
			url='b-detail.html?bid='+bid+'&channel='+channel+'&fromreview=1';
			break;
		case '12':
			url='act-week.html';
			break;
		case '13':
			var bid =$.cookie('bid');
			var cid =$.cookie('cid');
			url='b-buy-single.html?bid='+bid+'&cid='+cid;
			break;
		case '14':
			url='redeem-code-direct.html';
			break;
		case '15':
			var bid =$.cookie('bid');
			var cid =$.cookie('cid');
			url='comic.html?'+'bid='+bid+'&cid='+cid;
			break;
		case '16':
			url='a-nation.html';
			break;
	}
	return url;
}

function urlDispatch(origin,url){
	if(origin=='1'||origin=='2'||origin=='9'||origin=='5'||origin=='6'||origin=='7'||origin=='8'||origin=='12'||origin=='14'||origin=='16'){
		url+='?origin='+origin;
	}else if(origin=='3'){
		var bid = getParam('bid');
		url+='?origin='+origin+'&bid='+bid+'&channel='+channel;
	}else if(origin=='4'){
		var bid = getParam('bid');
		var cid = getParam('cid');
		url+='?origin='+origin+'&bid='+bid+'&cid='+cid+'&channel='+channel;
	}else if(origin=='10'){
		var postid=getParam('postid');
		var bid =getParam('bid');
		var state=getParam('state');
		url+='?origin='+origin+'&bid='+bid+'&postid='+postid+'&state='+state;
	}else if(origin=='13'){
		var bid =getParam('bid');
		var cid = getParam('cid');
		url+='?origin='+origin+'&bid='+bid+'&cid='+cid;
	}else if(origin=='15'){
		var bid = getParam('bid');
		var cid = getParam('cid');
		url+='?origin='+origin+'&bid='+bid+'&cid='+cid;
	}
	
	return url;
}

function setState(origin,url){
	if(Number(origin)<10){
		origin='0'+origin;
	}
	var state=setParam("p",origin);
	switch(origin){
	case '03':
		state+=setParam("b",getParam('bid'));
		state+=setParam("d",channel);
		break;
	case '04':
		state+=setParam("b",getParam('bid'));
		state+=setParam("c",getParam('cid'));
		state+=setParam("d",channel);
		break;
	case '10':
		state+=setParam("t",getParam('postid'));
		state+=setParam("b",getParam('bid'));
		state+=setParam("s",getParam('state'));
		break;
	case '13':
		state+=setParam("b",getParam('bid'));
		state+=setParam("c",getParam('cid'));
		break;
	case '15':
		state+=setParam("b",getParam('bid'));
		state+=setParam("c",getParam('cid'));
		state+=setParam("d",channel);
		break;
	}
	return url+state;
}
