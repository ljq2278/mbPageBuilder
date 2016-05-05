<?php

class BuildController extends Controller
{

	public function actionSavePage(){
		$temp = file_get_contents("created/temp.html");
		$temp = str_replace($this->makeTag("bodyInner"),$_POST["bodyInner"],$temp);
		$temp = str_replace("\n\n","\n",$temp);
		if(isset($_POST["script"])){
			$temp = str_replace($this->makeJsTag("script"),$_POST["script"].$this->makeJsTag("script"),$temp);
		}		
		file_put_contents("created/index.html",$temp,null,null);		
	}
	
	public function actionGetWidget(){
		echo($this->getWidgetByType($_GET["type"]));
	}
	
	private function getWidgetByType($type){
		$widget =  file_get_contents('widget/'.$type.".html");
		$widget = $this->expandWidget($widget);
		
		return $this->setComponentAttr($widget,array("id"=>time()));
	}
	
	private function setComponentAttr($comp,$params){
		foreach($params as $key=>$value){
			$comp = str_replace( $this->makeTag($key),$value,$comp);
		}

		return $comp;
	}
	
	private function makeTag($str){
		return "<!--[".$str."]-->";
	}
	
	private function makeJsTag($str){
		return "/*[".$str."]*/";
	}
	
	private function expandWidget($widget){
		if($_GET["type"]=="pics"){
			$picEditCoverNew = file_get_contents('widget/picEditCover.html');
			$picDisplayCoverNew = file_get_contents('widget/picDisplayCover.html');
			
			$valueOrder = time()-1;
			$picEditCoverNew = str_replace($this->makeTag("dataOrderText"),$valueOrder,$picEditCoverNew);
			$picDisplayCoverNew = str_replace($this->makeTag("dataOrderText"),$valueOrder,$picDisplayCoverNew);
				
			$valueOrder = time()-1+20;
			$picEditCoverNew = str_replace($this->makeTag("dataOrderFile"),$valueOrder,$picEditCoverNew);
			$picDisplayCoverNew = str_replace($this->makeTag("dataOrderFile"),$valueOrder,$picDisplayCoverNew);
			
			$tagPicDisplayCover = $this->makeTag("picDisplayCover");
			$tagPicEditCover = $this->makeTag("picEditCover");
			$widget = str_replace($tagPicEditCover,$picEditCoverNew,$widget);
			$widget = str_replace($tagPicDisplayCover,$picDisplayCoverNew,$widget);
			
			if(isset($_GET["picAmount"])){
				$amount = intval($_GET["picAmount"]);
				$insertEidt = "";
				$insertDisplay = "";
				//$picEditItem = file_get_contents('widget/picEdit.html');
				//$picDisplayItem = file_get_contents('widget/picDisplay.html');
				for($i=0;$i<$amount;$i++){
					$picEditItemNew = file_get_contents('widget/picEdit.html');
					$picDisplayItemNew = file_get_contents('widget/picDisplay.html');
			
					$picDisplayItemNew = $this->setComponentAttr($picDisplayItemNew,array("class"=>"item"));
			
					$picEditItemNew = str_replace($this->makeTag("order"),strval($i+1),$picEditItemNew);
			
					$valueOrder = time()+$i;
					$picEditItemNew = str_replace($this->makeTag("dataOrderText"),$valueOrder,$picEditItemNew);
					$picDisplayItemNew = str_replace($this->makeTag("dataOrderText"),$valueOrder,$picDisplayItemNew);
			
					$valueOrder = time()+$i+20;
					$picEditItemNew = str_replace($this->makeTag("dataOrderFile"),$valueOrder,$picEditItemNew);
					$picDisplayItemNew = str_replace($this->makeTag("dataOrderFile"),$valueOrder,$picDisplayItemNew);
			
					$insertEidt = $insertEidt.$picEditItemNew;
					$insertDisplay = $insertDisplay.$picDisplayItemNew;
				}
				$tagPicDisplayArray = $this->makeTag("picDisplayArray");
				$tagPicEditArray = $this->makeTag("picEditArray");
				$widget = str_replace($tagPicEditArray,$insertEidt,$widget);
				$widget = str_replace($tagPicDisplayArray,$insertDisplay,$widget);
				return $widget;
			}
			else{
				return $widget;
			}
		}
		else if($_GET["type"]=="msg"){
			$msgEditNew = file_get_contents('widget/msgEdit.html');
			$msgDisplayNew = file_get_contents('widget/msgDisplay.html');
				
			$valueOrder = time()-1;
			$msgEditNew = str_replace($this->makeTag("dataOrderText"),$valueOrder,$msgEditNew);
			$msgDisplayNew = str_replace($this->makeTag("dataOrderText"),$valueOrder,$msgDisplayNew);
				
			$tagMsgDisplay = $this->makeTag("msgDisplay");
			$tagMsgEdit = $this->makeTag("msgEdit");
			$widget = str_replace($tagMsgEdit,$msgEditNew,$widget);
			$widget = str_replace($tagMsgDisplay,$msgDisplayNew,$widget);
			return $widget;
		}
		else{
			return $widget;
		}
		
	}
	
}
