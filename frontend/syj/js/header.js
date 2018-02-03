$(document).ready(function(){
	$logout = $('.logout');
	$logout.click(function(){
		$('#hint-back').show();
		$('#hint').show();
	});
	$('#hint-back,.cancle').click(function(){
		$('#hint-back').hide();
		$('#hint').hide();
	});
});
