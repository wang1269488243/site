// JavaScript Document
// 打开新页面
function showFullWin(sTitle){
	var sdialogWidth = screen.availWidth - 5;
	var sdialogHeight = screen.availHeight - 20;
	var hrefAddr = self.location.href;
	if(hrefAddr.indexOf("?") != -1){
		hrefAddr += "&showClose=1";
	}else{
		hrefAddr += "?showClose=1";
	}
	//alert(hrefAddr);
	var sFeatures;
	sFeatures = "dialogHeight:"+sdialogHeight+"px;dialogWidth:"+sdialogWidth+"px;";
	sFeatures += "center:yes;edge:raised;scroll:no;status:no;unadorned:yes;";
	//openwindow(hrefAddr, sTitle, sdialogHeight, sdialogWidth)
	window.open(hrefAddr,sTitle,'left=' + 2 +',top=' + 2 +',width='+sdialogWidth+',height='+sdialogHeight+',scrollbars=yes,resizable=yes');
}

function showFullWinByLink(sTitle, hrefAddr){
	var sdialogWidth = screen.availWidth - 5;
	var sdialogHeight = screen.availHeight - 60;

	if(hrefAddr.indexOf("?") != -1){
		hrefAddr += "&showClose=1";
	}else{
		hrefAddr += "?showClose=1";
	}
	//alert(hrefAddr);
	var sFeatures;
	sFeatures = "dialogHeight:"+sdialogHeight+"px;dialogWidth:"+sdialogWidth+"px;";
	sFeatures += "center:yes;edge:raised;scroll:no;status:no;unadorned:yes;";
	//openwindow(hrefAddr, sTitle, sdialogHeight, sdialogWidth)
	window.open(hrefAddr,sTitle,'left=' + 0 +',top=' + 0 +',width='+sdialogWidth+',height='+sdialogHeight+',scrollbars=yes,resizable=yes');
}

// 检查滚动条并设置标题宽度
function checkScroll(divTitle, divContent, tableContent){
	if($('#' + tableContent).height() > $('#' + divContent).height()){
		$('#' + divTitle).css('margin-right', '17px');
	}else{
		$('#' + divTitle).css('margin-right', '0');	
	}
}

// 刷新页面
function reloadPage(sReturn){
	if(sReturn){
		window.location.reload();
	}
}

// 刷新页面
function winReload(){
	window.location.reload();
}

// 页面跳转
function winGo(url){
	window.location.href = url;
}

// 设置窗口自动调整事件
function winSizeEvent(eventFunc){
	eventFunc();
	$(window).resize(function(){
			eventFunc();  // 调整窗口函数
	  });
}

// 更改  Radio 的值
function setRadioValue(obj, val){
	for(var i = 0; i < obj.length; i++){
		if(obj[i].value == val){
			obj[i].checked = true;
			break;
		}
	}
}

// 更改 checkbox 的值
function setCheckValue(obj, val){
	if(typeof val == 'string'){
		for(var i = 0; i < obj.length; i++){
			if(obj[i].value == val){
				obj[i].checked = true;
				break;
			}
		}
	}else{
		for(var j = 0; j < val.length; j++){
			for(var i = 0; i < obj.length; i++){
				if(obj[i].value == val[j]){
					obj[i].checked = true;
					break;
				}
			}
		}
	}
}

// 设置select 的值 
function setSelectValue(rName, rVal){
	$("#" + rName).attr("value", rVal);
}

// 给左边补位数
function padLeft(s, pad, count) 
{
	var str = s + "";
	while(str.length<count){
		str=pad+str;
	}
	return str;
}

//日期比较
function compareDate(startDate,endDate){
  var date11 = new Date(startDate.replace("-",",")).getTime();
  var date22 = new Date(endDate.replace("-",",")).getTime();
  //结束日期是否大于开始日期
  return (date22 >= date11)
}

// 计算过去时间, 返回格式 00:00:00
function getTimeGo(startTime){
	var endTime = new Date();
	var diffTime = endTime - startTime;
	var hh = Math.floor(diffTime/(60*60*1000));
	var mm = Math.floor((diffTime - hh*(60*60*1000))/(60*1000));
	var ss = Math.floor((diffTime - hh*(60*60*1000) - mm*(60*1000))/1000);
	var hms = padLeft(hh,"0",2)+":"+padLeft(mm,"0",2)+":"+padLeft(ss,"0",2);
	return hms;
}

function dateText(){ 
	var r = "";
	var t = "";
	currentDate   =   new   Date() 
	with   (currentDate) { 
		day=getDay() 
		month=getMonth()+1 
		this.document.classname= "sj " 
		r = '  '+getFullYear()+ '年 '+month+ '月 '+getDate()+ '日 ';
	} 
	if   (day==1){t = '   星期一 ';} 
	if   (day==2){t = '   星期二 ';} 
	if   (day==3){t = '   星期三 ';} 
	if   (day==4){t = '   星期四 ';} 
	if   (day==5){t = '   星期五 ';} 
	if   (day==6){t = '   星期六 ';} 
	if   (day==0){t = '   星期日 ';} 
	return r + t;
	//document.write( ' <br/> ') 
} 

function dateTextTwo(){ 
	var r = "";
	var t = "";
	currentDate   =   new   Date() 
	with   (currentDate) { 
		day=getDay() 
		month=getMonth()+1 
		this.document.classname= "sj " 
		r = '  '+getFullYear()+ '年 '+month+ '月 '+getDate()+ '日 ';
	} 

	return r;
	//document.write( ' <br/> ') 
} 

// 关闭弹出 层
function closeWinByName(options){
	var defaults = {
		callbackAble: false,
		obj : window.frameElement,
		returnValue : null 
	}
	var config = $.extend(defaults,options);

	if(typeof($(config.obj).attr('winName')) != 'undefined' && $(config.obj).attr('winName') != ''){
		 eval("window.top." + $(config.obj).attr('winName') + ".yxDialog.closeWin({callbackAble:config.callbackAble,returnValue:config.returnValue, winName:$(config.obj).attr('winName')});");
   }else{
	   window.top.dialog.yxDialog.closeWin({callbackAble:config.callbackAble,returnValue:config.returnValue});
   }
}

// 取得对象
function getOpennerWin(){
	var obj = null;

	if(typeof($(window.frameElement).attr('winName')) != 'undefined' && $(window.frameElement).attr('winName') != ''){
		 eval("obj = window.top." + $(window.frameElement).attr('winName') + ".opennerWindow;");
   }else{
	   obj = window.top.dialog.opennerWindow;
   }
   return obj;
}

// 判断是否为空
function isNull(msg){
	if(msg == 0 || msg == '0'){ //  js 中 0 == ''
		return true;
	}
	if(msg == null || typeof(msg) == 'null' || typeof(msg) == "undefined" || msg == ''){
		return true;													  
	}else{
		return false;
	}
}

// 判断是否有值 （包括空值）
function isSet(msg){
	if(msg == null || typeof(msg) == 'null' || typeof(msg) == "undefined" || msg == "undefined"){
		return false;
	}else{
		return true;
	}
}

// 通过路径 取得文件名
function getFullFileName(str){  
	var p=str.lastIndexOf('\\');  
	return str.substr(++p,str.length-p);  
}
function getFileName(str){  
	var p=str.lastIndexOf('.');  
	return str.substr(0,p);  
}  
function getExtName(str){  
	var p=str.lastIndexOf('.');  
	return str.substr(++p,str.length-p);  
}

// 无提示关闭窗口，兼容 ie6~8; chrome,opera, 不兼容 firefox
function closeWin(){
	window.opener = null; //for Ie6
	window.open("","_self");  //for ie7-8 
	window.close();	
}

function isInt(s){
	var patrn=/^\d+$/; 
	if (!patrn.exec(s)){
		return false;
	}
	
	return true;
}

function getString(s, def){
	if(!isNull(s)){
		return s;
	}else{
		return def;
	}
}

function getSubString(s, len){
	s = getString(s, '');
	if(s.length > len){
		s = s.substring(0, len);	
	}
	return s;
}

function getSubStringDot(s, len, dot){
	s = getString(s, '');
	if(s.length > len){
		s = s.substring(0, len - 1) + getString(dot, '...');	
	}
	return s;
}

//===================================Form 的操作 ==================================

//结合 jquery.form.js 取得表单的 json 格式
function getFormArr(fromId){
	var jsonArr = $('#' + fromId).formToArray();

	// 格式为 [{name:value},[name:value]]
	return jsonArr;
    
}
function getFormJson(fromId){
	var jsonArr = $('#' + fromId).formToArray();
	
	var json = {};
    for(var i in  jsonArr){
      eval("json." + jsonArr[i].name + "='" + jsonArr[i].value + "'");
    }
    // 格式为 json.name = value; 
    return json;
}

//===================================设置iframe 的高度 ==================================
function setFrameHeight(){
	$(window.frameElement).height($(document).height());
}

function setFrameHeightAuto(iframeId){
	$('#' + iframeId).load(function(){
		$(this).height($(this).contents().find("body").attr('scrollHeight'));
	});
}

// 兼容性更强，不需要 jquery 支持, 设置本页 iframe 高度自适应
function setFrameHeightInterval(iframeId){
	setInterval("setFrameHeightBase('" + iframeId + "')", 2000);
}
function setFrameHeightBase(iframeId){
	var iframeObj = document.getElementById(iframeId);

	try{
		var bHeight = iframeObj.contentWindow.document.body.scrollHeight;
		var dHeight = iframeObj.contentWindow.document.documentElement.scrollHeight;
		var height = Math.max(bHeight, dHeight);
		
		//iframeObj.height =  height;
		$(iframeObj).height(height)
	}catch (ex){}
}
//===================================设置iframe 的高度 END==================================


//===================================浏览器判断==================================
//JS判断访问设备(userAgent)加载不同页面。代码如下：
function detectOS() {
    var sUserAgent = navigator.userAgent;

    var isWin = (navigator.platform === "Win32") || (navigator.platform === "Windows");
    var isMac = (navigator.platform === "Mac68K") || (navigator.platform === "MacPPC") || (navigator.platform === "Macintosh") || (navigator.platform === "MacIntel");
    var bIsIpad = sUserAgent.match(/ipad/i) === "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) === "iphone os";
    var isUnix = (navigator.platform === "X11") && !isWin && !isMac;
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) === "android";
    var bIsCE = sUserAgent.match(/windows ce/i) === "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) === "windows mobile";
    if (isMac)
        return "Mac";
    if (isUnix)
        return "Unix";
    if (isLinux) {
        if (bIsAndroid)
            return "Android";
        else
            return "Linux";
    }
    if(bIsCE || bIsWM){
        return 'wm';
    }
    
    if (isWin) {
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K)
            return "Win2000";
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 ||
                sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP)
            return "WinXP";
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003)
            return "Win2003";
        var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista)
            return "WinVista";
        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7)
            return "Win7";
        var isWin8 = sUserAgent.indexOf("Windows NT 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
        if (isWin8)
            return "Win8";
    }
    return "other";
}
//console.log("您的操作系统是：" + detectOS());
//alert(detectOS());

//===================================浏览器判断 END==================================

//到后台打印出来日志
function adminLog(content){
  $.ajax({
		   url: "/ncsearch/index/log.do",
		   async: true,
		   type: 'GET',
		   data: {'log': content},
		   complete:function(XMLHttpRequest, textStatus){
			   hideLoading();
            // alert(XMLHttpRequest.responseText); 
        	},
		   success: function(msg){
        
			}
	   });
}



//=================================== artDialog 操作 ==================================

function openDialog(id, title, url, data, w, h, onclose){
    top.dialog({
        id: id,
        title: title,
        url: url,
        data: data,
        width: w,
        height: h,
        //quickClose: true,
        onshow: function () {
            // console.log('onshow');
        },
        oniframeload: function () {
            // console.log('oniframeload');
        },
        onclose: onclose,
        // function () {
            // if (this.returnValue) {
            //     $('#value').html(this.returnValue);
            // }
            // console.log('onclose');
        // },
        onremove: function () {
            // console.log('onremove');
        }
    }).showModal(this);
    return false;
}

//取得传给弹窗的值
function getDialogData(){
    var dialog = top.dialog.get(window);
    var data = dialog.data; // 获取对话框传递过来的数据
    return data;
}

function closeDialog(returnVal){
    var dialog = top.dialog.get(window);
    dialog.close(returnVal);         // 关闭（隐藏）对话框
    dialog.remove();                 // 主动销毁对话框
    return false;
}

//通用的弹窗处理
function dialogCallback(){
    var returnVal = this.returnValue;
    if(returnVal == 'reload'){
    	winReload();
    }
    return false;
}

//确认弹窗
function HFConfirm(title, text, type, callbackFunc) {
    
    //warning 警告
	//success 成功
	//error 错误
	//空即为提示

	if(!isSet(type)){
		type = "";
	}

	top.swal({
		title: title,
		text: text,
		type: type,
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "确 定",
		cancelButtonText: "取 消",
		closeOnConfirm: true,
		closeOnCancel: true
	}, callbackFunc);
    return false;
}

//友好提示框
function HFAlert(title, text, type, callbackFunc){
	//warning 警告
	//success 成功
	//error 错误
	//空即为提示

	if(!isSet(type)){
		type = "";
	}

	top.swal({
		title: title,
		text: text,
		type: type
	}, callbackFunc);

}


//广播提示(成功)
function HFToastr(title, desc){
	top.toastr.success(title, desc)
}
//广播提示(错误)
function HFToastrError(title, desc){
	top.toastr.error(title, desc)
}
function HFToastrTipResult(res){
	if(res.state == 0){
		HFToastr("操作成功");
	}else{
		HFToastrError("操作失败", res.message);
	}
}


//=================================== artDialog 操作 END==================================


