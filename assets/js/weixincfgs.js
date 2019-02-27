var cfg = {};
var share = {"title":"朵拉小说—做你的移动图书馆","content":"品名著、看小说，读经典，听历史。把书本变薄，把书房变大。让一本书娱乐你的生活！",
    	"imgurl": "http://zmring.oss-cn-hangzhou.aliyuncs.com/book/novel/icon.png"};
cfg.debug = false;
cfg.jsApiList = ['checkJsApi',
       'onMenuShareTimeline',
       'onMenuShareAppMessage',
       'onMenuShareQQ',
       'onMenuShareWeibo',
       'onMenuShareQZone'];

$.ajax({
	type: 'POST',
	url: '/dispatcher',
	dataType: "json",
	async: false,
	timeout : 10000,
	data:JSON.stringify({
		s:"jssdkser",
		a:"exec",
		url: window.location.href
	}),
	contentType: 'application/json',
	success: function (data) {
//		alert(JSON.stringify(data));
		if (data.ret && data.ret==200) {
			cfg.timestamp = data.jssdk.timestamp;
			cfg.nonceStr = data.jssdk.nonceStr;
			cfg.signature = data.jssdk.signature;
			cfg.appId =  data.jssdk.appId;
			wx.config(cfg);
		}
	}
});
wx.ready(function(){
    setShareData(share);
});
function setShareData(result) {
	wx.onMenuShareTimeline({
		title: result.title, // 分享标题
		link: window.location.href,// 分享链接
		imgUrl: result.imgurl, // 分享图标
		success: function () {
			if(wxcfg.backcode)
				wxcfg.backcode();
			//alert(1);
			// 用户确认分享后执行的回调函数
		},
		cancel: function () { 
			//alert(2);
			// 用户取消分享后执行的回调函数
		}
	});

	wx.onMenuShareAppMessage({
		title: result.title, // 分享标题
		desc: result.content, // 分享描述
		link: window.location.href, // 分享链接
		imgUrl: result.imgurl, // 分享图标
		type: 'link', // 分享类型,music、video或link，不填默认为link
		dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function () { 
			// 用户确认分享后执行的回调函数
		},
		cancel: function () { 
			// 用户取消分享后执行的回调函数
		}
	});
	
	wx.onMenuShareQQ({
		title: result.title, // 分享标题
		desc: result.content, // 分享描述
		link: window.location.href, // 分享链接
		imgUrl: result.imgurl, // 分享图标
		type: 'link', // 分享类型,music、video或link，不填默认为link
		dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function () { 
			// 用户确认分享后执行的回调函数
		},
		cancel: function () { 
			// 用户取消分享后执行的回调函数
		}
	});
	
	wx.onMenuShareWeibo({
		title: result.title, // 分享标题
		desc: result.content, // 分享描述
		link: window.location.href, // 分享链接
		imgUrl: result.imgurl, // 分享图标
		type: 'link', // 分享类型,music、video或link，不填默认为link
		dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function () { 
			// 用户确认分享后执行的回调函数
		},
		cancel: function () { 
			// 用户取消分享后执行的回调函数
		}
	});
	
	wx.onMenuShareQZone({
		title: result.title, // 分享标题
		desc: result.content, // 分享描述
		link: window.location.href, // 分享链接
		imgUrl: result.imgurl, // 分享图标
		type: 'link', // 分享类型,music、video或link，不填默认为link
		dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function () { 
			// 用户确认分享后执行的回调函数
		},
		cancel: function () { 
			// 用户取消分享后执行的回调函数
		}
	});
}