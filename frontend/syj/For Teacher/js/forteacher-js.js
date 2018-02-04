$(function(){
	var $menu = $('.menu-list ul');
	init();
	function init(){
		$menu.each(function(){
			$(this).removeClass('backcolor-after');
			$(this).addClass('backcolor-before');
			$(this).children('li').hide();
		})
	}
	$menu.each(function(){
		$(this).click(function(){
			init();
			$(this).removeClass('backcolor-before');
			$(this).addClass('backcolor-after');
			$(this).children('li').show();
		})
	})
});
