$(document).ready(function(){
	init();
	
	//数据参数modalWidgetType，可以在点击时就设好，也可以在进入callmodal时通过判断当前按钮来设定
	//mark_sele
	
	$("#headButton").bind("click",{"container":"page","shelf":"head"},seleCurrentContainerAndShelfByButton);
	$("#footButton").bind("click",{"container":"page","shelf":"foot"},seleCurrentContainerAndShelfByButton);
	$("#bodyButton").bind("click",callModal);
	
	$("#savePage").bind("click",function(){
		confirmInModal("一旦存储到服务器，已生成部件将不可再编辑，您确定吗？ ",genePage,{});
	});
	
	$("#addShelSelePosi").bind("click",callModal);

	$("#deleShel").bind("click",callModal);
	$("#listShel").bind("click",callModal);
	
	$("#addContSeleWidt").bind("click",callModal);
	
	$("#deleContWidg").bind("click",callModal);
	$("#listContWidg").bind("click",callModal);
	
	$("#seleCurrShel").bind("click",callModal);
	$("#seleCurrCont").bind("click",callModal);
	
	$("#selePareCont").bind("click",seleParentContainerAsCurrent);
	
	//$("#addBody").bind("click",addBody);
	$("#addBodySelePosi").bind("click",callModal);
	//$("#deleBody").bind("click",deleteBodyModal);
	$("#deleBody").bind("click",callModal);
	
	$("#getPicsWidgWidt").bind("click",callModal);
	$("#getMsgWidgWidt").bind("click",callModal);
	
	$("#addWidg").bind("click",function(){
		 if(currShel==""){
			 alert("未选择当前容器架！");
			 return;
		 }
		$("#globalEditor").fadeOut();
		$("#containerEditor").fadeOut();
		$("#widgetEditor").fadeIn();

	});
	
	//$("#editWidg").bind("click",callModal);
	$("#cancWidgEdit").bind("click",function(){
		if(currWidg!=""){
			confirmInModal("该操作将删除您当前正在编辑的部件，您确定吗？ ",deleteSCW,{"scwId":currWidg});
			currWidg="";
			$("#currWidg").children("span").text("");
		}
		else{
			$("#widgetEditor").fadeOut();
			$("#containerEditor").fadeIn();
			$("#globalEditor").fadeIn();
		}
	})
	
	$("#confWidgEdit").bind("click",function(){
		$("#widgetEditor").fadeOut();
		$("#containerEditor").fadeIn();
		$("#globalEditor").fadeIn();
		currWidg="";
		$("#currWidg").children("span").text("");
	});
})

function init(){
	//$("#myModal").modal('show');
	currCont = "page";
	currShel = "head";
	currWidg = "";
	$("#currCont").children("span").text(currCont);
	$("#currShel").children("span").text(currShel);
}

function genePage(params){
	$("#myModalConfirm").children(".modal-body").text("");
	$("#myModalConfirm").modal("hide");
	$("#page").find("[data-myrole='thumbnaileditor']").remove();
	$("#page").find("[data-myrole='detaileditor']").remove();
	$("#page").find("[data-myrole='edit']").remove();
	$("#page").find("script").remove();
	$("body").find(".modal-backdrop").remove();
	$("#myModalConfirm").css("display","none");
	var bodyInner = $("body").html();
	$.ajax({
		url:server+"index.php?r=build/savePage",
		type:"post",
		data:{"bodyInner":bodyInner},
		dataType:"text",
		success:function(data){
			alert("存储成功！请刷新页面进行更新！");
			window.location.href=server+"created/"; 
		}
	});

}

function seleParentContainerAsCurrent(){
	var tempContainer = $("#"+currCont).parent().parent();
	if(!tempContainer.attr("id")){
		alert("没有上级容器！");
		return;
	}
	else{
		currCont = tempContainer.attr("id");
		$("#currCont").children("span").text(currCont);
		refreshCurrent();
		alert("操作成功！");
	}
}

function addBody(params){
	if(params.sibling){
		var newId = "body"+(new Date().getTime());
		
		var newJQdom = $('<li><a data-toggle="tab"></a></li>');
		newJQdom.children("a").attr("href","#"+newId);
		newJQdom.children("a").text(newId);
		newJQdom.attr("data-mylink",newId);
		$("#nav").find("[data-mylink='"+params.sibling+"']").before(newJQdom);
		
		newJQdom = $("<div></div>");
		newJQdom.attr({"class" : "tab-pane row","style":"min-height: 20px;background-color:#ffffff;text-align:center","id":newId})
		newJQdom.text(newId);
		$("#"+params.sibling).before(newJQdom);
		alertSuccess("增加内容页");
		hideModal();
	}
	else{
		var newId = "body"+(new Date().getTime());
		
		var newJQdom = $('<li><a data-toggle="tab"></a></li>');
		newJQdom.children("a").attr("href","#"+newId);
		newJQdom.children("a").text(newId);
		newJQdom.attr("data-mylink",newId);
		$("#nav").children("ul").append(newJQdom);
		
		newJQdom = $("<div></div>");
		newJQdom.attr({"class" : "tab-pane row","style":"min-height: 20px;background-color:#ffffff;text-align:center","id":newId})
		newJQdom.text(newId);
		$("#bodyCont").append(newJQdom);
		alertSuccess("增加内容页");
		hideModal();
	}
	
}

function deleteBody(e){
	if(e.data.bodyId=="body0"){
		alert("不能删除原始内容块body0！");
		return;
	}
	$("#nav").find("[data-mylink='"+e.data.bodyId+"']").remove();
	$("#"+e.data.bodyId).remove();
	alertSuccess("删除内容块"+e.data.bodyId+"及其子对象");
	refreshCurrent();
	$("#myModalConfirm").children(".modal-body").text("");
	$("#myModalConfirm").modal("hide");	
}

function deleteSCW(e){
	var parent = $("#"+e.data.scwId).parent();
	$("#"+e.data.scwId).remove();	
	if(parent.children("[id]").length==0){
		parent.text(parent.attr("id"));
	}
	
	alertSuccess("删除对象"+e.data.scwId+"及其子对象");
	refreshCurrent();
	$("#myModalConfirm").children(".modal-body").text("");
	$("#myModalConfirm").modal("hide");
}
/*
function deleteShelf(e){
	var parent = $("#"+e.data.shelfId).parent();
	$("#"+e.data.shelfId).remove();	
	if(parent.children("[id]").length==0){
		parent.text(parent.attr("id"));
	}
	
	alertSuccess("删除容器架"+e.data.shelfId+"及其子对象");
	refreshCurrent();
	$("#myModalConfirm").children(".modal-body").text("");
	$("#myModalConfirm").modal("hide");	
}

function deleteContWidg(e){
	var parent = $("#"+e.data.contWidgId).parent();
	$("#"+e.data.contWidgId).remove();	
	if(parent.children("[id]").length==0){
		parent.text(parent.attr("id"));
	}
	
	alertSuccess("删除容器（部件）"+e.data.contWidgId+"及其子对象");
	refreshCurrent();
	$("#myModalConfirm").children(".modal-body").text("");
	$("#myModalConfirm").modal("hide");	
}
*/
function confirmInModal(str,fun,params){
	$("#myModalConfirmOK").unbind("click");
	$("#myModalConfirmOK").bind("click",params,fun);

	$("#myModalConfirm").children(".modal-body").text(str);
	$("#myModalConfirm").modal("show");
}

function refreshCurrent(){
	if(currCont=="page"){
		currShel = "head";
		$("#currShel").children("span").text(currShel);
	}
	else{
		if($("#"+currCont).children().length!=0){
			currShel = $("#"+currCont).children(":first").attr("id");
			$("#currShel").children("span").text(currShel);
		}
		else{
			currShel = "";
			$("#currShel").children("span").text("");
		}
	}
}

//mark_sele
function checkValidate(buttId){
	if(buttId=="getPicsWidgWidt"){
		if(currWidg != ""){
			alert("请先确认或取消本次操作！");
			return false;
		}
	}
	else if(buttId=="addShelSelePosi"){
		if(currCont == "page"){
			alert("page上不能新增容器架");
			return false;
		}
		if(currCont == "bodyCont"){
			alert("bodyCont上不能新增容器架，请通过导航条设置添加！");
			return false;
		}
	}
	else if(buttId=="deleShel"){
		if(currCont == "page"){
			alert("page上不能删除容器架");
			return false;
		}
		if(currCont == "bodyCont"){
			alert("bodyCont上不能删除容器架，请通过导航条设置删除！");
			return false;
		}
	}
	else if(buttId=="listShel"){
		if(currCont == "page"){
			alert("page上拥有特殊容器架：head,body,foot三个模块！");
			return false;
		}
		if(currCont == "bodyCont"){
			alert("bodyCont上不能列出容器架，请通过页面视图查看！");
			return false;
		}
	}
	else if(buttId=="seleCurrShel"){
		if(currCont == "page"){
			alert("page上不能列出容器架，请通过选择模块进行选择！");
			return false;
		}
	}
	else{
		
	}
	return true;
}

function addComponentMain(jData){
	if(currButt=="addShelSelePosi"){
		if(jData.sibling){
			addComponentBeforeSiblingAndCloseModal($("#"+currCont),$("#"+jData.sibling),"div","shelf");
		}
		else{
			addComponentAndCloseModal($("#"+currCont),"div","shelf");
		}

	}
	else if(currButt =="addContSelePosi"){
		if(jData.sibling){
			addComponentBeforeSiblingAndCloseModal($("#"+currShel),$("#"+jData.sibling),"div","container");
		}
		else{
			addComponentAndCloseModal($("#"+currShel),"div","container");
		}
	}
	else if(currButt =="getPicsWidgPosi"){
		if(jData.sibling){
			paramsForCallback.posi = jData.sibling;
		}		
		addComponentToModal("pics","widget");
	}
	else if(currButt =="getMsgWidgPosi"){
		if(jData.sibling){
			paramsForCallback.posi = jData.sibling;
		}		
		addComponentToModal("msg","widget");
	}
	else{
		alert("unkonw component to add through button OK!");
	}
	
}

function seleCurrentContainerAndShelfByButton(e){
	currCont = e.data.container;
	currShel = e.data.shelf;
	$("#currCont").children("span").text(currCont);
	$("#currShel").children("span").text(currShel);
}

function seleCurrentContainer(containerId){
	currCont = containerId;
	$("#currCont").children("span").text(currCont);
	refreshCurrent();
}

function seleCurrentShelf(shelfId){
	currShel = shelfId;
	$("#currShel").children("span").text(currShel);
}

function seleCurrentWidget(widgetId){
	currWidg = widgetId;
	$("#currWidg").children("span").text(currWidg);
}

//mark_sele
function getWidgetType(buttId){
	 if(currButt == "bodyButton"){
		 return "radio";
	 }
	 else if(currButt == "addContSelePosi"){
		 return "radio";
	 }
	 else if(currButt == "addBodySelePosi"){
		 return "radio";
	 }
	 else if(currButt == "getPicsWidgWidt"){
		 return "radio";
	 }
	 else if(currButt == "getMsgWidgWidt"){
		 return "radio";
	 }
	 else if(currButt == "getPicsWidgPosi"){
		 return "radio";
	 }
	 else if(currButt == "getMsgWidgPosi"){
		 return "radio";
	 }
	 else if(currButt == "deleBody"){
		 return "radio";
	 }
	 else if(currButt == "addShelSelePosi"){
		 return "radio";
	 }
	 else if(currButt == "addContSeleWidt"){
		 return "radio";
	 }
	 else if(currButt == "seleCurrCont"){
		 return "radio";
	 }
	 else if(currButt == "seleCurrShel"){
		 return "radio";
	 }
	 else if(currButt == "deleShel"){
		 return "radio";
	 }
	 else if(currButt == "listShel"){
		 return "radio";
	 }
	 else if(currButt == "deleContWidg"){
		 return "radio";
	 }
	 else if(currButt == "listContWidg"){
		 return "radio";
	 }
	 else if(currButt == "getPicsWidgAmou"){
		 return "radio";
	 }
	 /*
	 else if(currButt == "editWidg"){
		 return "radio";
	 }
	 */
	 else if(currButt == "getPicsWidg"){
		 return "pics";
	 }
	 else{
		 alert("unknown button type!");
		 return "";
	 }
}

function isNeedToExpand(widgetType){
	if(widgetType == "radio"){
		 return true;
	 }
	else{
		return false;
	}
}

//如果要通过ajax传递widget回来，就要设置currButt，以便在回调success函数时判定调用者
function callModal(params){
	/*
	currButt = $(this).attr("id");
	if(!currButt){
		currButt = params.currButt;
	}
	*/
	if(!params.currButt){
		currButt = $(this).attr("id");
	}
	else{
		currButt = params.currButt;
	}
	if(!checkValidate(currButt)){
		return;
	}
	//$('#myModal').children(".modal-body").text("");
	var widgetType = getWidgetType(currButt);
	if(widgetType==""){
		return;
	}
	$.ajax({
		 url:server+"index.php?r=build/getWidget&type="+widgetType,
		 type:"get",
		 //data:{"activeButton":"bodyButton"},
	     dataType:"html",
	     success:function(data){
	    	 //vardata.split("|")
	    	 var JQdom = $(data);
	    	 if(isNeedToExpand(widgetType)){
		    	 var ret = expandWidget(JQdom);
		    	 if(ret==false){
		    		 hideModal();
		    		 return;
		    	 }
	    	 }

	    	 //根据点击的按键不同区分不同处理方法
	    	
	    	 //更新对话框内容
	    	 $("#myModal").children(".modal-body").children().remove();
	    	 $("#myModal").children(".modal-body").append(JQdom);
	    	 
	    	//mark_sele	 
	    	 if(currButt == "bodyButton"){
	    		 setModalHeader("选择内容页面号");
	    		 $("#myModalCancel").css("display","none");	
	    		 $("#myModalOK").css("display","inline-block");	
	    		 
	    		 currCont = "bodyCont";
	    		 $("#currCont").children("span").text(currCont);

	    		 currShel = JQdom.children(":first").children("span").text();
	    		 $("#currShel").children("span").text(currShel);
    			 
	    		 $("#myModal").find("input").bind("change",function(){
	    			 currShel = $(this).next().text();	
	    			 $("#currShel").children("span").text(currShel);

	    		 })
	    		 $("#myModalOK").unbind("click");
	    		 $("#myModalOK").bind("click", hideModal);
		    	 $('#myModal').modal('show');
	    	 }
	    	 else if(currButt == "addContSeleWidt" || currButt == "getPicsWidgWidt" || currButt == "getMsgWidgWidt"){
	    		 setModalHeader("选择宽度");
	    		 $("#myModalCancel").css("display","inline-block");	
	    		 $("#myModalOK").css("display","inline-block");	
	    		 
	    		 paramsForCallback = {};
    			 paramsForCallback.width = "1";
    			 
	    		 $("#myModal").find("input").bind("change",function(){
	    			 
	    			 paramsForCallback = {};
	    			 paramsForCallback.width = $(this).next().text();	    		

	    		 });

	    		 $("#myModalOK").unbind("click");
	    		 if(currButt == "addContSeleWidt"){
	    			 $("#myModalOK").bind("click",function(){
	    				 //hideModal();
	    				 callModal({"currButt":"addContSelePosi"});
	    			 });
	    		 }
	    		 else if(currButt == "getPicsWidgWidt"){
	    			 $("#myModalOK").bind("click",function(){
	    				 //hideModal();
	    				 callModal({"currButt":"getPicsWidgAmou"});
	    			 });
	    		 }
	    		 else if(currButt == "getMsgWidgWidt"){
	    			 $("#myModalOK").bind("click",function(){
	    				 //hideModal();
	    				 callModal({"currButt":"getMsgWidgPosi"});
	    			 });
	    		 }
	    		 else{}
    	    	 $('#myModal').modal('show');
	    	 }
	    	 
	    	 else if(currButt == "getPicsWidgAmou"){
	    		 setModalHeader("选择图片数量");
	    		 $("#myModalCancel").css("display","inline-block");	
	    		 $("#myModalOK").css("display","inline-block");	
	    		 
    			 paramsForCallback.picAmount = "1";
    			 
	    		 $("#myModal").find("input").bind("change",function(){
	    			 
	    			 paramsForCallback.picAmount = $(this).next().text();	    		

	    		 });

	    		 $("#myModalOK").unbind("click");
    			 $("#myModalOK").bind("click",function(){
    				 //hideModal();
    				 callModal({"currButt":"getPicsWidgPosi"});
    			 });
    	    	 $('#myModal').modal('show');
	    	 }
	    	 else if(currButt == "addShelSelePosi" || currButt == "getPicsWidgPosi" || currButt == "addContSelePosi" || currButt == "getMsgWidgPosi"){	    		 
	    		 setModalHeader("选择插入位置");
	    		 $("#myModalCancel").css("display","inline-block");	
	    		 $("#myModalOK").css("display","inline-block");	
	    		 
	    		 var cwId = JQdom.children(":last").children("span").text(); 	
    			 
	    		 $("#myModal").find("input").bind("change",function(){
	    			 cwId = $(this).next().text();		

	    		 });
    			 $("#myModalOK").unbind("click");
    			 $("#myModalOK").bind("click",function(){
    				 if(cwId!="在末尾添加"){
    					 addComponentMain({"sibling":cwId});
    				 }
    				 else{
    					 addComponentMain({});
    				 }
    			 });
    			 if(currButt == "addShelSelePosi"){
    				 $('#myModal').modal('show');
    			 }
    			 
	    	 }
	    	 
	    	 else if(currButt == "addBodySelePosi"){    		 
	    		 setModalHeader("选择插入位置");   		 
	    		 $("#myModalCancel").css("display","none");	
	    		 $("#myModalOK").css("display","inline-block");	
	    		 
	    		 var shelfId = JQdom.children(":last").children("span").text(); 	
    			 
	    		 $("#myModal").find("input").bind("change",function(){
	    			 shelfId = $(this).next().text();		

	    		 });
    			 $("#myModalOK").unbind("click");
    			 $("#myModalOK").bind("click",function(){
    				 if(shelfId!="在末尾添加"){
    					 addBody({"sibling":shelfId});
    				 }
    				 else{
    					 addBody({});
    				 }
    			 });
    	    	 $('#myModal').modal('show');
	    	 }
	    	 /*
	    	 else if(currButt == "deleShel"){
	    		 setModalHeader("选择要删除的容器架");
	    		 $("#myModalCancel").css("display","inline-block");    
	    		 $("#myModalOK").css("display","inline-block");	
	    		 
	    		 var shelfId = JQdom.children(":last").children("span").text();
	    		 //seleCurrentContainerAndShelf(containerId,shelfId); 	
    			 
	    		 $("#myModal").find("input").bind("change",function(){	
	    			 shelfId=$(this).next().text();
	    			 	
	    		 });
    			 $("#myModalOK").unbind("click");
    			 $("#myModalOK").bind("click",function(){
    				 hideModal();
    				 confirmInModal("该操作将删除您选择的容器架及其下面的所有子对象，您确定吗？",deleteShelf,{"shelfId":shelfId});
    			 });
    	    	 $('#myModal').modal('show');
	    	 }
	    	 */
	    	 else if(currButt == "deleBody"){
	    		 setModalHeader("选择要删除的内容块");
	    		 $("#myModalCancel").css("display","inline-block");    
	    		 $("#myModalOK").css("display","inline-block");	
	    		 
	    		 var bodyId = JQdom.children(":last").children("span").text();
	    		 //seleCurrentContainerAndShelf(containerId,shelfId); 	
    			 
	    		 $("#myModal").find("input").bind("change",function(){	
	    			 bodyId=$(this).next().text();
	    			 	
	    		 });
    			 $("#myModalOK").unbind("click");
    			 $("#myModalOK").bind("click",function(){
    				 hideModal();
    				 confirmInModal("该操作将删除您选择的内容块及其所有内容，您确定吗？",deleteBody,{"bodyId":bodyId});
    			 });
    	    	 $('#myModal').modal('show');
	    	 }
	    	 else if(currButt == "listShel"){
	    		 setModalHeader("子容器架列表");
	    		 $("#myModalCancel").css("display","none");    
	    		 $("#myModalOK").css("display","inline-block");	

    			 $("#myModalOK").unbind("click");
    			 $("#myModalOK").bind("click",function(){
    				 hideModal();
       			 });
    	    	 $('#myModal').modal('show');
	    	 }
	    	 
	    	 else if(currButt == "deleContWidg" || currButt == "deleShel"){
	    		 setModalHeader("选择要删除的对象");
	    		 $("#myModalCancel").css("display","inline-block");    
	    		 $("#myModalOK").css("display","inline-block");	
	    		 
	    		 var scwId = JQdom.children(":last").children("span").text();
	    		 //seleCurrentContainerAndShelf(containerId,shelfId); 	
    			 
	    		 $("#myModal").find("input").bind("change",function(){	
	    			 scwId = $(this).next().text();
	    			 	
	    		 });
    			 $("#myModalOK").unbind("click");
    			 $("#myModalOK").bind("click",function(){
    				 hideModal();
    				 confirmInModal("该操作将删除您选择的对象及其下面的所有子对象，您确定吗？",deleteSCW,{"scwId":scwId});
    			 });
    	    	 $('#myModal').modal('show');
	    	 }
	    	 else if(currButt == "listContWidg"){
	    		 setModalHeader("子容器（部件）列表");
	    		 $("#myModalCancel").css("display","none");
	    		 $("#myModalOK").css("display","inline-block");	
	    		 
    			 $("#myModalOK").unbind("click");
    			 $("#myModalOK").bind("click",function(){
    				 hideModal();
    			 });
    	    	 $('#myModal').modal('show');
	    	 }
	    	 else if(currButt == "seleCurrCont"){
	    		 setModalHeader("选择当前容器");
	    		 $("#myModalCancel").css("display","none");	
	    		 $("#myModalOK").css("display","inline-block");	
	    		 
	    		 var containerId = JQdom.children(":first").children("span").text();
    			 seleCurrentContainer(containerId);   	
    			 
	    		 $("#myModal").find("input").bind("change",function(){
	    			 var containerId = $(this).next().text();
	    			 seleCurrentContainer(containerId);   		

	    		 });
    			 $("#myModalOK").unbind("click");
    			 $("#myModalOK").bind("click",hideModal);
    	    	 $('#myModal').modal('show');
	    	 }

	    	 else if(currButt == "seleCurrShel"){
	    		 setModalHeader("选择当前容器架");
	    		 $("#myModalCancel").css("display","none");	
	    		 $("#myModalOK").css("display","inline-block");	
	    		 
	    		 var containerId = currCont;
	    		 var shelfId = JQdom.children(":first").children("span").text();
	    		 seleCurrentShelf(shelfId); 	
    			 
	    		 $("#myModal").find("input").bind("change",function(){	
	    			 var containerId = currCont;
	    			 var shelfId=$(this).next().text();
	    			 seleCurrentShelf(shelfId);   		

	    		 });
    			 $("#myModalOK").unbind("click");
    			 $("#myModalOK").bind("click",hideModal);
    	    	 $('#myModal').modal('show');
	    	 }
	    	
	    	 else{
	    		 alert("unknown currButt id!");
	    	 }
	    	 	    	 

	     }
	})
	
}

function inseCont(e){
	if(e.data.containerId=="在末尾添加"){
		
	}
	else{
		
	}
}

function setModalHeader(str){
	$("#myModal").children(".modal-header").children("h3").text(str);
}

function hideModal(){
	 $('#myModal').modal('hide');
}
