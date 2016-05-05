function expandWidget(JQdom){
	//mark_sele
	 if(currButt == "bodyButton"){
		 for(var i = 0;i<$("#bodyCont").children(".row").length;i++){
			 var newJQdom = JQdom.children(":first").clone();
			 newJQdom.children("span").text($($("#bodyCont").children(".row")[i]).attr("id"))
    		 JQdom.append(newJQdom);
    	 }
		 JQdom.children(":first").remove();
		 
		 if(JQdom.children(":first").attr("class")=="radio"){
			 JQdom.children(":first").children(":first").attr("checked","checked");
		 }
	 }
	 else if(currButt == "addContSeleWidt" || currButt == "getPicsWidgWidt" || currButt == "getMsgWidgWidt"){
		 if(getWidth($("#"+currCont),$("#"+currShel))==0){
			 alert("该容器架上已没有多余空间！");
			 return false;
		 }
		 if(currShel!=""){
			 for(var i = 1;i<=getWidth($("#"+currCont),$("#"+currShel));i++){
				 var newJQdom = JQdom.children(":first").clone();
				 newJQdom.children("span").text(i+"")
	    		 JQdom.append(newJQdom);
	    	 }
			 JQdom.children(":first").remove();
			 if(JQdom.children(":first").attr("class")=="radio"){
				 JQdom.children(":first").children(":first").attr("checked","checked");
			 }
		 }
		 else{
			 alert("未选择当前容器架！");
			 return false;
		 }
	 }
	 else if(currButt == "getPicsWidgAmou"){
		 
		 for(var i = 1;i<=10;i++){
			 var newJQdom = JQdom.children(":first").clone();
			 newJQdom.children("span").text(i+"")
			 JQdom.append(newJQdom);
		 }
		 JQdom.children(":first").remove();
		 if(JQdom.children(":first").attr("class")=="radio"){
			 JQdom.children(":first").children(":first").attr("checked","checked");
		 }

	 }
	 else if(currButt == "deleShel"){
		 var childrenShelfAmount = getChildrenShelfAmount($("#"+currCont));
		 if(childrenShelfAmount==0){
			 alert("当前容器上没有容器架！")
			 return false;
		 }
		 for(var i = 0;i<childrenShelfAmount;i++){
			 var newJQdom = JQdom.children(":first").clone();
			 newJQdom.children("span").text($($("#"+currCont).children(".row")[i]).attr("id"));
    		 JQdom.append(newJQdom);
    	 }
		 JQdom.children(":first").remove();
		 if(JQdom.children(":first").attr("class")=="radio"){
			 JQdom.children(":last").children(":first").attr("checked","checked");
		 }
	 }
	 else if(currButt == "listShel"){
		 var childrenShelfAmount = getChildrenShelfAmount($("#"+currCont));
		 if(childrenShelfAmount==0){
			 alert("当前容器上没有容器架！")
			 return false;
		 }
		 for(var i = 0;i<childrenShelfAmount;i++){
			 var newJQdom = JQdom.children(":first").clone();
			 newJQdom.children("span").text($($("#"+currCont).children(".row")[i]).attr("id"));
			 newJQdom.children("input").attr("disabled","true");
			 JQdom.append(newJQdom);			 		
    	 }
		 JQdom.children(":first").remove();
	 }
	 else if(currButt == "deleContWidg"){
		 var childrenAmount = getChildrenAmount($("#"+currShel));
		 if(childrenAmount==0){
			 alert("当前容器架上没有东西！")
			 return false;
		 }
		 for(var i = 0;i<childrenAmount;i++){
			 var newJQdom = JQdom.children(":first").clone();
			 newJQdom.children("span").text($($("#"+currShel).children("[id]")[i]).attr("id"));
    		 JQdom.append(newJQdom);
    	 }
		 JQdom.children(":first").remove();
		 if(JQdom.children(":first").attr("class")=="radio"){
			 JQdom.children(":last").children(":first").attr("checked","checked");
		 }
	 }
	 else if(currButt == "deleBody"){
		 var childrenShelfAmount = getChildrenShelfAmount($("#bodyCont"));

		 for(var i = 0;i<childrenShelfAmount;i++){
			 var newJQdom = JQdom.children(":first").clone();
			 newJQdom.children("span").text($($("#bodyCont").children(".row")[i]).attr("id"));
    		 JQdom.append(newJQdom);
    	 }
		 JQdom.children(":first").remove();
		 if(JQdom.children(":first").attr("class")=="radio"){
			 JQdom.children(":last").children(":first").attr("checked","checked");
		 }
	 }
	 else if(currButt == "listContWidg"){
		 var childrenAmount = getChildrenAmount($("#"+currShel));
		 if(childrenAmount==0){
			 alert("当前容器架上没有东西！")
			 return false;
		 }
		 for(var i = 0;i<childrenAmount;i++){
			 var newJQdom = JQdom.children(":first").clone();
			 newJQdom.children("span").text($($("#"+currShel).children("[id]")[i]).attr("id"));
			 newJQdom.children("input").attr("disabled","true");
    		 JQdom.append(newJQdom);
    	 }
		 JQdom.children(":first").remove();
	 }
	 else if(currButt == "seleCurrShel"){
		 var childrenShelfAmount = getChildrenShelfAmount($("#"+currCont));
		 if(childrenShelfAmount==0){
			 alert("当前容器上没有容器架！")
			 return false;
		 }
		 for(var i = 0;i<childrenShelfAmount;i++){			 
			 var newJQdom = JQdom.children(":first").clone();
			 newJQdom.children("span").text($($("#"+currCont).children(".row")[i]).attr("id"))
			 JQdom.append(newJQdom);				 
    	 }
		 JQdom.children(":first").remove();
		 if(JQdom.children(":first").attr("class")=="radio"){
			 JQdom.children(":first").children(":first").attr("checked","checked");
		 }
	 }
	 else if(currButt == "seleCurrCont"){
		 if(currShel!=""){			 
			 var childrenContainerAmount = getChildrenContainerAmount($("#"+currShel));
			 if(childrenContainerAmount==0){
				 alert("当前容器架上没有容器！")
				 return false;
			 }
			 for(var i = 0;i<childrenContainerAmount;i++){
				 var newJQdom = JQdom.children(":first").clone();
				 newJQdom.children("span").text($($("#"+currShel).children("[data-myrole!='widget']")[i]).attr("id"))
	    		 JQdom.append(newJQdom);
	    	 }
			 JQdom.children(":first").remove();
			 if(JQdom.children(":first").attr("class")=="radio"){
				 JQdom.children(":first").children(":first").attr("checked","checked");
			 }
		 }
		 else{
			 alert("未选择当前容器架！");
			 return false;
		 }
	 }
	 else if(currButt == "addContSelePosi" || currButt == "getPicsWidgPosi" || currButt == "getMsgWidgPosi"){
		 if(currShel!=""){			 
			 var childrenAmount = getChildrenAmount($("#"+currShel));
			 for(var i = 0;i<childrenAmount;i++){
				 var newJQdom = JQdom.children(":first").clone();
				 newJQdom.children("span").text($($("#"+currShel).children("[id]")[i]).attr("id"))
	    		 JQdom.append(newJQdom);
	    	 }
			 var newJQdom = JQdom.children(":first").clone();
			 newJQdom.children("span").text("在末尾添加");
    		 JQdom.append(newJQdom);
    		 
			 JQdom.children(":first").remove();

			 if(JQdom.children(":first").attr("class")=="radio"){
				 JQdom.children(":last").children(":first").attr("checked","checked");
			 }
		 }
		 else{
			 alert("未选择当前容器架！");
			 return false;
		 }
	 }
	 else if(currButt == "addShelSelePosi"){
		 var childrenShelfAmount = getChildrenShelfAmount($("#"+currCont));
		 for(var i = 0;i<childrenShelfAmount;i++){			 
			 var newJQdom = JQdom.children(":first").clone();
			 newJQdom.children("span").text($($("#"+currCont).children(".row")[i]).attr("id"))
			 JQdom.append(newJQdom);				 
    	 }
		 var newJQdom = JQdom.children(":first").clone();
		 newJQdom.children("span").text("在末尾添加");
		 JQdom.append(newJQdom);
		 
		 JQdom.children(":first").remove();
		 
		 if(JQdom.children(":first").attr("class")=="radio"){
			 JQdom.children(":last").children(":first").attr("checked","checked");
		 }
	 }
	 else if(currButt == "addBodySelePosi"){
		 var childrenShelfAmount = getChildrenShelfAmount($("#bodyCont"));
		 for(var i = 0;i<childrenShelfAmount;i++){			 
			 var newJQdom = JQdom.children(":first").clone();
			 newJQdom.children("span").text($($("#bodyCont").children(".row")[i]).attr("id"))
			 JQdom.append(newJQdom);				 
    	 }
		 var newJQdom = JQdom.children(":first").clone();
		 newJQdom.children("span").text("在末尾添加");
		 JQdom.append(newJQdom);
		 
		 JQdom.children(":first").remove();
		 
		 if(JQdom.children(":first").attr("class")=="radio"){
			 JQdom.children(":last").children(":first").attr("checked","checked");
		 }
	 }
	 
	 else{
		 
	 }
}


function showResult(){
	var editor = getContainerEditorOrContent($(this));
	var content = editor.prev();
	valueContent(editor,content);
	editor.css("display","none");
	content.css("display","block");
}

function showEditor(){
	var content = getContainerEditorOrContent($(this));
	var editor = content.next();
	content.css("display","none");
	editor.css("display","block");
}

function valueContent(editor,content){
	var es = editor.find("[data-order]");
	for(var i=0;i<es.length;i++){
		valueItem($(es[i]),content.find("[data-order='"+$(es[i]).attr("data-order")+"']"));
	}
}

function valueItem(iteme,itemc){
	if(iteme.attr("type")=="file"){
	}
	else if(iteme.attr("type")=="text" || iteme.prop("tagName")=="TEXTAREA"){
		itemc.text(iteme.val());
	}
	else{
		
	}
	return;
}

function getContainerEditorOrContent(JQdom){
	var ec = JQdom.parent();
	while(1){
		if(ec.attr("data-myrole")){
			if(ec.attr("data-myrole").indexOf("editor")==-1 && ec.attr("data-myrole").indexOf("content")==-1){
				ec = ec.parent();
				continue;
			}
			break;
		}
		else{
			ec = ec.parent();
		}
	}
	
	
	return ec;
}

function getContainerThumbnailOrDetail(JQdom){

	var td = JQdom.parent();
	
	while(1){
		if(td.attr("data-myrole")){
			if(td.attr("data-myrole")!="thumbnail" && td.attr("data-myrole")!="detail"){
				td = td.parent();
				continue;
			}
			break;
		}
		else{
			td = td.parent();
		}
	}
	
	return td;
}

function getContainerWidget(JQdom){
	var widget = JQdom.parent();
	
	while(1){
		if(widget.attr("data-myrole")){
			if(widget.attr("data-myrole")!="widget"){
				widget = widget.parent();
				continue;
			}
			break;
		}
		else{
			widget = widget.parent();
		}
	}
	
	return widget;
}

function getUnitOrder(JQdom){
	return JQdom.attr("data-order");
}

function findUnitByOrder(order,JQdom){
	return JQdom.find("[data-order='"+order+"']");
}

function createPic(e){
	if(!e.currentTarget.files || !e.currentTarget.files[0]){
		return;
	 };
	$(this).attr("id","choPicTemp");
	  var reader = new FileReader();
	  $(reader).bind("load",onloadFuntion);
	  
	  function onloadFuntion(evt){
		  var iteme = $("#choPicTemp");
		  var order = getUnitOrder(iteme);
		  var content = getContainerEditorOrContent(iteme).prev();
		  var itemc = findUnitByOrder(order,content);
		  
	  itemc.attr('src',evt.target.result);
	  $("#choPicTemp").removeAttr("id");
	 };
	 reader.readAsDataURL(e.currentTarget.files[0]);
}


function processAndAppend(widget){
	var detailFlag = true;
	var detail = widget.find("[data-myrole='detail']");
	if(detail.length==0){
		detailFlag = false;
	}
	
	widget.find("[data-myrole='thumbnaileditor']").css("display","none");
	widget.find("[data-myrole='thumbnailcontent']").css("display","block");
	
	if(detailFlag){
		widget.find("[data-myrole='detaileditor']").css("display","none");
		widget.find("[data-myrole='detailcontent']").css("display","none");
	}
	if(paramsForCallback.posi){
		$("#"+paramsForCallback.posi).before(widget);	
	}
	else{
	   	 if($("#"+currShel).children("[id]").length==0){
	   		$("#"+currShel).text("");
		 }
		$("#"+currShel).append(widget);	
	}
	
	if(detailFlag){
		bindDetailCaller(widget);
		//activeDetailCallerOnInit(widget.attr("id"));
	}
}

//function activeDetailCallerOnInit(widgetId){
//	var str = $("#script").text();
//	str = str.replace(/\/\*\[script\]\*\//g,"bindDetailCaller($('#"+widgetId+"'));removeEditButton($('#"+widgetId+"'));/*[script]*/");
//	$("#script").text(str);
//}

//function removeEditButton(widget){
//	widget.find("[data-myrole='edit']").remove();
//}

function bindDetailCaller(widget){
	var modalCaller = widget.find("[href='#myModalDetail']");
	modalCaller.unbind("click");
	modalCaller.bind("click",function(){
		var detail = widget.find("[data-myrole='detail']");
		detail.css("display","block");
		detail.find("[data-myrole='detailcontent']").css("display","block");
		detail.find("[data-myrole='detaileditor']").css("display","none");

		detail.prev().attr("id","currentDisplayDetailPrev");
		detail.attr("id","currentDisplayDetail");
		$("#myModalDetail").children(".modal-body").text("");
		$("#myModalDetail").children(".modal-body").append(detail);
		
		detail.find(".carousel").carousel("next");
		
		$("#myModalDetailOK").unbind("click");
		$("#myModalDetailOK").bind("click",function(){
			$("#currentDisplayDetailPrev").after($("#currentDisplayDetail"));
			$("#currentDisplayDetailPrev").removeAttr("id");
			$("#currentDisplayDetail").css("display","none");
			$("#currentDisplayDetail").removeAttr("id");
		});
		
		$("#myModalDetail").modal("show");
	})
}
