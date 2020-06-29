

function initHFForm(formSelector){
  $(formSelector).validate();
}

//调用的时候， button 必须设置为 type="button" ， 否则会多次提交表单
function HFFormSubmit(formSelector, callback, perProcessFunc,noCheck){
  
  var checkResult ;

  if(noCheck){
      checkResult=true;
  }else{
      checkResult = $(formSelector).valid();
  }

	if(checkResult){	//表单验证通过
		if(perProcessFunc != null){
      		if(perProcessFunc()){
      			HFFormSubmitProcess(formSelector, callback);
        		return false;
      		}
			return false;
      	}else{
      		HFFormSubmitProcess(formSelector, callback);
        	return false;
      	}
	}
}

function HFFormSubmitProcess(formSelector, callback){
	if(isSet(top.showHFLoading)){
		top.showHFLoading();
	}else{
		showHFLoading();
	}
	
    $.ajax({
       url: $(formSelector).attr('action'),
       async: false,
       type: 'POST',
       data: $(formSelector).serialize(),
       complete:function(XMLHttpRequest, textStatus){
          	// alert(XMLHttpRequest.responseText); 
          
          	if(isSet(top.hideHFLoading)){
				top.hideHFLoading();
			}else{
				hideHFLoading();
			}
        },
       success: function(msg){
       		if(isSet(top.hideHFLoading)){
				top.hideHFLoading();
			}else{
				hideHFLoading();
			}
			
		   //alert(JSON.stringify(msg));

       	if(callback != null){
        	callback(msg);
        }else{
        	if(msg.ok){
            	HFToastr('操作成功');
        	}else{
        		HFToastrError('操作失败');
        	}
        }
        
      }
	  
    });
}

//把form表单的字段转化为 {key:value, key2:value2} 这种格式
$.fn.serializeObject = function()    
{    
   var o = {};    
   var a = this.serializeArray();    
   $.each(a, function() {    
       if (o[this.name]) {    
           if (!o[this.name].push) {    
               o[this.name] = [o[this.name]];    
           }    
           o[this.name].push(this.value || '');    
       } else {    
           o[this.name] = this.value || '';    
       }    
   });    
   return o;    
};  




function HFAjax(url, data, callback){
  if(isSet(top.showHFLoading)){
    top.showHFLoading();
  }else{
    if (typeof showHFLoading === "function") {
      showHFLoading();
    }
  }

  
  $.ajax({
       url: url,
       async: false,
       type: 'POST',
       data: data,
       complete:function(XMLHttpRequest, textStatus){
            // alert(XMLHttpRequest.responseText); 
          
            if(isSet(top.hideHFLoading)){
        top.hideHFLoading();
      }else{
        if (typeof hideHFLoading === "function") {
          hideHFLoading();
        }
      }
        },
       success: function(msg){
          if(isSet(top.hideHFLoading)){
        top.hideHFLoading();
      }else{
        if (typeof hideHFLoading === "function") {
          hideHFLoading();
        }
      }
      
       //alert(JSON.stringify(msg));

        if(callback != null){
          callback(msg);
        }else{
          if(msg.ok){
              HFToastr('操作成功');
          }else{
            HFToastrError('操作失败');
          }
        }
        
      }
    
    });
}