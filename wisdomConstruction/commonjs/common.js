//初始化layui
//layui.use(['layer', 'form'], function(){
//var layer = layui.layer
//,form = layui.form;
//
//layer.msg('Hello World');
//});

//菜单切换页面内容逻辑
$('.menu-left ul li').on('click',function(){
	$(this).addClass('menu-choose').siblings().removeClass('menu-choose');
	$('.menu-right ul li').removeClass('menu-choose');
	var index = $(this).index();
	if(index == 0){
		$('.contentbody').load('./index.html');
	}else if(index == 1){
		$('.contentbody').load('./projectMemorabilia.html');
	}else if(index == 2){
		$('.contentbody').load('./videoSurveillance.html');
	}else if(index == 3){
		$('.contentbody').load('./peopleManagement.html');
	}else if(index == 4){
		$('.contentbody').load('./greenConstruction.html');
	}
})
$('.menu-right ul li').on('click',function(){
	$(this).addClass('menu-choose').siblings().removeClass('menu-choose');
	$('.menu-left ul li').removeClass('menu-choose');
	var index = $(this).index();
	if(index == 0){
		$('.contentbody').load('pages/intelligentHardware/index.html');
	}else if(index == 1){
		$('.contentbody').load('pages/intelligenceApplications/index.html');
	}else if(index == 2){
		$('.contentbody').load('pages/dataManagement/index.html');
	}else if(index == 3){
		$('.contentbody').load('pages/nodeAcceptance/index.html');
	}else if(index == 4){
		$('.contentbody').load('./mySite.html');
	}
})
