$(function(){
	var $menu = $('.menu-list ul');
	var $content = $('.content-list ul');
	init();
	//页面初始化
	function init(){
		$menu.each(function(){
			$(this).removeClass('backcolor-after');
			$(this).addClass('backcolor-before');
			$(this).children('li').hide();
		})
	}
	$content.each(function(){$(this).hide();})
	$('.content-list ul:eq(0)').show();
	//menu点击响应
	$menu.each(function(){
		$(this).click(function(){
			init();
			$(this).removeClass('backcolor-before');
			$(this).addClass('backcolor-after');
			$(this).children('li').show();
		})
	})
	//menu与content绑定
	var $event = [
		$('.menu-list ul:first'),
		$('.menu-list ul:eq(1) li:eq(0)'),
		$('.menu-list ul:eq(1) li:eq(1)'),
		$('.menu-list ul:eq(2) li:eq(0)'),
		$('.menu-list ul:eq(2) li:eq(1)'),
		$('.menu-list ul:eq(3)'),
		$('.menu-list ul:eq(4)'),
		$('.menu-list ul:eq(5)'),
		$('.menu-list ul:eq(6)'),
		$('.menu-list ul:last')
	]
	for (let i = 0; i < $event.length; i++) {
		$event[i].click(function(){
			var idx = i+1;
			$content.each(function(){$(this).hide();})
			$('.content-list ul:eq('+idx+')').show();
		})
	}
	//menu位置与隐藏
	var $toleft = $('.menu-toleft');
	var $toright = $('.menu-toright');
	$toleft.click(function(){
		if($('.menu').css('float')=='right')
			$('.menu').css('float','left');
		else{
			$('.menu').hide();
			$('.content').css('float','none');
			$('.btn:eq(0)').show();
			$('.btn:eq(0)').click(function(){
				$('.menu').show();$(this).hide();
				$('.content').css('float','right');
			})
		}
	})
	$toright.click(function(){
		if($('.menu').css('float')=='left')
			$('.menu').css('float','right');
		else{
			$('.menu').hide();
			$('.content').css('float','none');
			$('.btn:eq(1)').show();
			$('.btn:eq(1)').click(function(){
				$('.menu').show();$(this).hide();
				$('.content').css('float','left');
			})
		}
	})
	//
	var time = new Date().getFullYear();
	$('.lesson-term').append('<option>'+time+'-'+(time+1)+'第二学期</option>'
							+'<option>'+time+'-'+(time+1)+'第一学期</option>'
							+'<option>'+(time+1)+'-'+(time+2)+'第二学期</option>'
		)
});
