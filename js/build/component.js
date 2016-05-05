function setComponentAttr(pid,component,params,type){

	if(type=="container"){
		component.attr("id",pid+"-c"+params.order);
		component.css({"background-color":"#000000","min-height":"40px","text-align":"center"});
		component.text(pid+"-c"+params.order);
		component.attr("class","span"+params.width);

	}
	else if(type=="shelf"){
		component.attr("id",pid+"-s"+params.order);
		component.css({"background-color":"#ffffff","min-height":"20px","text-align":"center"});
		component.text(pid+"-s"+params.order);
		component.attr("class","row");
	}
	else if(type=="widget"){

		currWidg = currShel+"-w"+params.order;
		$("#currWidg").children("span").text(currWidg);
		component.attr("id",currWidg);
		component.attr("class","span"+params.width);

	}
	else{}

	
	
}
function addComponentToModal(widgetType,componentType){
	var para = "type="+widgetType;
	if(paramsForCallback.picAmount){
		para = para+"&picAmount="+ paramsForCallback.picAmount;
	}
	$.ajax({
		 url:server+"index.php?r=build/getWidget&"+para,
		 type:"get",
		 //data:{"activeButton":"bodyButton"},
	     dataType:"html",
	     success:function(data){
	    	 var JQdom = $(data);    	
	    	 paramsForCallback.order = (new Date().getTime())+"";
	    	 setComponentAttr(currShel,JQdom,paramsForCallback,componentType);
	    	 
	    	 $("#myModal").children(".modal-body").children().remove();
	    	 $("#myModal").children(".modal-body").append(JQdom);
	    	 setModalHeader("编辑图片集信息");
	    	 $("#myModalCancel").css("display","inline-block");	
	    	 $("#myModalOK").css("display","inline-block");	
	    	 
	    	 $("#myModalOK").unbind("click");
	    	 $("#myModalOK").bind("click",function(){
	    		 hideModal();
	    		 var widget = $("#myModal").find("[data-myrole='widget']");
	    		 deleteDivider(widget);
	    		 processAndAppend(widget);
		    	 paramsForCallback = {};
	    	 });
	    	 $('#myModal').modal('show');
	     }
	});
}

function deleteDivider(widget){
	widget.find("[data-myrole='divider']").remove();
}

//widgetType:radio/picMsg/div...   componentType:widget/container/shelf
function addComponent(parent,widgetType,componentType){
	$.ajax({
		 url:server+"index.php?r=build/getWidget&type="+widgetType,
		 type:"get",
		 //data:{"activeButton":"bodyButton"},
	     dataType:"html",
	     success:function(data){
	    	 var JQdom = $($(data)[0]);    	
	    	 paramsForCallback.order = (new Date().getTime())+"";
	    	 setComponentAttr(parent.attr("id"),JQdom,paramsForCallback,componentType);

	    	 if(parent.children("[id]").length==0){
	    		 parent.text("");
	    	 }
	    	 parent.append(JQdom);
	    	 alertSuccess("增加"+componentType);
	    	 refreshCurrent();
	     }
	});
}


function addComponentBeforeSibling(parent,sibling,widgetType,componentType){
	$.ajax({
		 url:server+"index.php?r=build/getWidget&type="+widgetType,
		 type:"get",
		 //data:{"activeButton":"bodyButton"},
	     dataType:"html",
	     success:function(data){
	    	 var JQdom = $($(data)[0]);    	
	    	 paramsForCallback.order = (new Date().getTime())+"";
	    	 setComponentAttr(parent.attr("id"),JQdom,paramsForCallback,componentType);

	    	 sibling.before(JQdom);
	    	 alertSuccess("增加"+componentType);
	    	 refreshCurrent();
	     }
	});
}

function addComponentAndCloseModal(parent,widgetType,componentType){
	$.ajax({
		 url:server+"index.php?r=build/getWidget&type="+widgetType,
		 type:"get",
		 //data:{"activeButton":"bodyButton"},
	     dataType:"html",
	     success:function(data){
	    	 var JQdom = $($(data)[0]);    	
	    	 paramsForCallback.order = (new Date().getTime())+"";
	    	 setComponentAttr(parent.attr("id"),JQdom,paramsForCallback,componentType);
	    	 
	    	 if(parent.children("[id]").length==0){
	    		 parent.text("");
	    	 }
	    	 
	    	 parent.append(JQdom);
	    	 alertSuccess("增加"+componentType);
	    	 refreshCurrent();
	    	 $('#myModal').modal('hide');
	     }
	});
}

function addComponentBeforeSiblingAndCloseModal(parent,sibling,widgetType,componentType){
	$.ajax({
		 url:server+"index.php?r=build/getWidget&type="+widgetType,
		 type:"get",
		 //data:{"activeButton":"bodyButton"},
	     dataType:"html",
	     success:function(data){
	    	 var JQdom = $($(data)[0]);    	
	    	 paramsForCallback.order = (new Date().getTime())+"";
	    	 setComponentAttr(parent.attr("id"),JQdom,paramsForCallback,componentType);

	    	 sibling.before(JQdom);
	    	 alertSuccess("增加"+componentType);
	    	 refreshCurrent();
	    	 $('#myModal').modal('hide');
	     }
	});
}

function getWidth(container,shelf){
	var index = container.attr("class").search(/span[0-9]+/);
	var totalLength = parseInt(container.attr("class").substr(index+4,2));
	var siblings = shelf.children("[id]");
	var sLength = 0;
	for(var i=0;i<siblings.length;i++){
		index = $(siblings[i]).attr("class").search(/span[0-9]+/);
		sLength = sLength + parseInt($(siblings[i]).attr("class").substr(index+4,2));
	}
	return totalLength - sLength;
}

function getChildrenAmount(component){
	//alert(component.children().length);
	return component.children("[id]").length;
}

function getChildrenShelfAmount(componentContainer){
	//alert(component.children().length);
	return componentContainer.children(".row").length;
}

function getChildrenWidgetAmount(componentShelf){
	return componentShelf.children("[data-myrole='widget']").length;
}

function getChildrenContainerAmount(componentShelf){
	return componentShelf.children("[id][data-myrole!='widget']").length;
}
