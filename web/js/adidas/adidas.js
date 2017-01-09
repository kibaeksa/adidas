var tabval=0;
var openMiPopup;

(function setApp(){
	var ua = navigator.userAgent;
	var isIE = ua.search(/MSIE/) > -1 ? true : false;
	
	if(!isIE){
		isIE = ua.search(/Trident/) > -1 ? true : false;
	}

	if(ua.search(/Chrome/) > -1){
		jQuery('html').addClass('chrome');
	}

	if(isIE){
		var isIEUnder9v = ua.match(/(?:MSIE\s)(\d+).\d/) && ua.match(/(?:MSIE\s)(\d+).\d/)[1] < 9;
		var ieVersion = isIEUnder9v != undefined ? ua.match(/(?:MSIE\s)(\d+).\d/)[1] : false;
		if(!ieVersion){
			ieVersion = 11;
		}
		jQuery('html').addClass('ie ie'+ieVersion);
		if(isIEUnder9v){
			jQuery('html').addClass('old_ie');
		}
	}
})();

function language_btn(){
	if(document.getElementById("language_layer").style.display=="none"){
	   document.getElementById("language_layer").style.display='block'
	}else{
		document.getElementById("language_layer").style.display='none'
	}
}


function fn_closeBanner(){
	fn_setCookie('top_bnn','close',1);
	jQuery('.top_bnn').animate({height:'0'});
}

function slideLeftAction(idx,preidx){
	var listObj=jQuery('ul li.lf_dep1');	
	jQuery(listObj[preidx]).children('a').removeClass('on');
	jQuery(listObj[preidx]).find('div.lfmenu_depth2').slideUp();
	jQuery(listObj[idx]).children('a').addClass('on');
	jQuery(listObj[idx]).find('div.lfmenu_depth2').slideDown();
}

function slideLeftMenu(obj,isCategory){
	var o=jQuery(obj);
	var idx=jQuery('li.lf_dep1').index(o.parent(".lf_dep1"));
	var curOn;
	var listObj=jQuery('ul li.lf_dep1');
	var ctgr_idx=0;

	if(isCategory){
		
		listObj.each(function(){
			if( jQuery(this).find('div.lfmenu_depth2').hasClass('category_depth2')){
				ctgr_idx=ctgr_idx+1;
				if(jQuery(this).children('a').hasClass('on')){
					curOn=jQuery(this).index();
				}
			}
		});

		if(curOn==idx){
			jQuery(listObj[idx]).children('a').removeClass('on');
			jQuery(listObj[idx]).children('div.lfmenu_depth2').slideUp();
		}else{
			slideLeftAction(idx,curOn);
		}


	}else{ 
		
		
		if(jQuery(listObj[idx]).children('a').hasClass('on')){
			jQuery(listObj[idx]).children('a').removeClass('on');
			jQuery(listObj[idx]).children('div.lfmenu_depth2').slideUp();
		}else{
			slideLeftAction(idx,curOn);
		}
	}
}

function sizeViewMore(obj){
	var o=jQuery(obj);
	if(o.parent('p').hasClass('open')){
		o.text('[View More]');
		o.parent('p').siblings('ul').css('height','48px');
		o.parent('p').removeClass('open');
	}else{
		o.text('[View Less]');
		o.parent('p').siblings('ul').css('height','auto');	
		o.parent('p').addClass('open');
	}
}

function layerOverNavi(o){
	jQuery(o).find('.depth2').show();
}

function layerOutNavi(o){
	jQuery(o).find('.depth2').hide();
}

var marketLoc=0;

function marketLayer(){
	var ht=parseInt( jQuery('.market_layer').css('display'));

	if(ht =='block'){
		jQuery('.market_layer').hide();
	}else{
		jQuery('.market_layer').show();
	}
	return false;
}

function quickLayerOpen(){
	jQuery('.layer_bg').css({
		height:jQuery(document).height()+'px',
		opacity:0.6		
	});
	jQuery('.layer_bg').fadeIn(200);
	setTimeout(function(){
		jQuery('.quickview_layer').fadeIn();
	},200);
}

function quickLayerClose(){
	jQuery('.quickview_layer').fadeOut();
	setTimeout(function(){
		jQuery('.layer_bg').fadeOut();			
	},100);				
}

function openLayer(oid,w,h){
	setTimeout(function(){
		jQuery('.layer_bg').css({
			height:jQuery(document).height()+'px',
			opacity:0.6		
		});
		jQuery('.layer_bg').fadeIn();
		
	},500);

	o=jQuery('#'+oid);
	o.css({
		width:w+'px',
		height:h+'px',
		marginLeft:-1*(w/2+15)+'px',
		marginTop:-1*(h/2+15)+'px'
	});
    setTimeout(function(){
        o.fadeIn();
    },500);
}

function closeLayer(o,t){
	jQuery('#'+o).fadeOut();
	if (t==1 && (o=='notice_layer_pop' || (o!='notice_layer_pop' && jQuery('#notice_layer_pop').css('display')!='block'))) {			
		setTimeout(function(){
			jQuery('.layer_bg').fadeOut();
		},100);
	}
	return false;
}

function sortOpenLayer(o,e){
	var event = e || window.event;

	if(event.stopPropagation) event.stopPropagation();
	else event.cancelBubble=true;

	var _obj=jQuery(o);
	var _layerArray=_obj.siblings('.sort_layer');
	var _nowOpenLayer;

	_layerArray.each(function(){
		if(jQuery(this).hasClass('on')){
			_nowOpenLayer=jQuery(this);
			if(_nowOpenLayer.index()==_obj.index()){
				_nowOpenLayer=false;
			}
		}
	});

	if(_obj.hasClass('on') && !_nowOpenLayer){
		_obj.find('ul').hide();
		_obj.removeClass('on');
	}else if(_nowOpenLayer){
		_nowOpenLayer.find('ul').hide();
		_nowOpenLayer.removeClass('on');
		_obj.find('ul').show();
		_obj.addClass('on');
	}else{
		_obj.find('ul').show();
		_obj.addClass('on');	
	}
	return false;
}

var isTechRolling=false;

function techLayerOpen(num){
	var _techImg=jQuery('.technology_layer .layer_body .techbox');
	if(_techImg.length == 1){
		jQuery('.technology_layer .arrow_r').addClass('disable');
		jQuery('.technology_layer .arrow_l').addClass('disable');	
	}
	if(isTechRolling) return false;
	isTechRolling=true;
	if(!num){
		if(jQuery('.technology_layer').css('display')=='block') jQuery('.technology_layer').slideUp();
		else jQuery('.technology_layer').slideDown();
		isTechRolling=false;
	}else{
		setTechBanner(num-1);
		setTimeout('isTechRolling=false',500);
	}
}

function setTechBanner(num){
	var _nowidx;
	var _idx=num;

	var _techImg=jQuery('.technology_layer .layer_body .techbox');
	_techImg.each(function(){
		if(jQuery(this).css('display')=='block' || jQuery(this).css('display')=='inline') _nowidx=jQuery(this).index();
	});
	if(_nowidx == _idx){
		jQuery('.technology_layer').slideDown();
		return false;
	}
	_techImg.each(function(){
		jQuery(this).hide();
	});
	_techImg.eq(_idx).fadeIn(500);
	jQuery('.technology_layer').slideDown();
	if(_techImg.length>1){
		if(_idx==0){
			jQuery('.technology_layer .arrow_l').addClass('disable');
			jQuery('.technology_layer .arrow_r').removeClass('disable');
		}else if(_idx==_techImg.length-1){
			jQuery('.technology_layer .arrow_r').addClass('disable');
			jQuery('.technology_layer .arrow_l').removeClass('disable');	
		}else{
			jQuery('.technology_layer .arrow_r').removeClass('disable');
			jQuery('.technology_layer .arrow_l').removeClass('disable');		
		}
	}

}

function techLayerClose(){
	jQuery('.technology_layer').slideUp();
}

function techLayerLeft(){
	if(isTechRolling) return false;
	isTechRolling=true;
	if(jQuery('.technology_layer .arrow_l').hasClass('disable')){
		isTechRolling=false;
		return false;
	}
	var _techImg=jQuery('.technology_layer .layer_body .techbox');
	var _viewidx;
	_techImg.each(function(){
		if(jQuery(this).css('display')=='block' || jQuery(this).css('display')=='inline') _viewidx=jQuery(this).index();
	});

	setTechBanner(_viewidx-1);
	setTimeout('isTechRolling=false',500);
	return false;
}

function techLayerRight(){
	if(isTechRolling) return false;
	isTechRolling=true;
	if(jQuery('.technology_layer .arrow_r').hasClass('disable')){
		isTechRolling=false;
		return false;
	} 
	var _techImg=jQuery('.technology_layer .layer_body .techbox');
	var _viewidx;
	_techImg.each(function(){
		if(jQuery(this).css('display')=='block' || jQuery(this).css('display')=='inline') _viewidx=jQuery(this).index();
	});

	setTechBanner(_viewidx+1);
	setTimeout('isTechRolling=false',500);
	return false;
}

function techBoxOpen(o){
	
	var _obj=jQuery(o).parent();
	var moveval=338;
	var _obj_moveval=_obj.parent('li').index()+1;
	_obj_moveval=169*_obj_moveval;
	
	var _cssVal=_obj.siblings('.techlist_cont').css('display');

	if(_cssVal=='block' ||_cssVal=='inline'){
		_obj.siblings('.techlist_cont').slideUp();
	}else{
		jQuery('.techlist li div.techlist_cont').slideUp();
		_obj.siblings('.techlist_cont').slideDown();
	}
	var mv=(moveval+_obj_moveval)-50;
	jQuery("html, body").animate({scrollTop:mv+'px'},300);
	

}
							
function techBoxClose(){
	jQuery('.techlist li div.techlist_cont').slideUp();
}

function blurAction(obj,moveId,dir,obj2){
	if(dir == 0){ /* just use the tab key */
		if(tabval == 1){
			jQuery(obj).attr('tabIndex','0');
			return;
		}else{
			jQuery('#'+moveId).attr('tabIndex','-1');
			jQuery('#'+moveId).focus();
			if(obj2){;
				jQuery(obj).attr('tabIndex','0');
			} 
			return false;
		}		
	}else{ /* just use the tab key */
		if(tabval == 0){
			jQuery(obj).attr('tabIndex','0');
			return;
		}else{
			jQuery('#'+moveId).attr('tabIndex','-1');
			jQuery('#'+moveId).focus();
			if(obj2){
				jQuery(obj).attr('tabIndex','0');
			} 
			return false;
		}	
	}

}


function openReviewBox(o){
	var _obj=jQuery(o);
	if(_obj.hasClass('open')){
		_obj.removeClass('open');
		_obj.parent().siblings('.review_box_body').css('height','0');
		_obj.parent().siblings('.review_box_body').find('.review_left').hide();
		_obj.parent().siblings('.review_box_body').find('.review_right').hide();
	}else{
		jQuery('.review_list .review_box').each(function(){
			_obj.find('.review_box_head a').removeClass('open');
			_obj.find('.review_box_body').css('height','0');
			_obj.find('.review_box_body').find('.review_left').hide();
			_obj.find('.review_box_body').find('.review_right').hide();
		});
		_obj.addClass('open');
		_obj.parent().siblings('.review_box_body').css('height','auto');		
		_obj.parent().siblings('.review_box_body').find('.review_left').fadeIn();
		_obj.parent().siblings('.review_box_body').find('.review_right').fadeIn();
	} 

	return false;			
}

function openReviewBoxAll(){
	jQuery('.review_list .review_box').each(function(){
		if(!jQuery(this).find('.review_box_head a').hasClass('open')){
			jQuery(this).find('.review_box_head a').addClass('open');
			jQuery(this).find('.review_box_body').css('height','auto');		
			jQuery(this).find('.review_box_body').find('.review_left').fadeIn();
			jQuery(this).find('.review_box_body').find('.review_right').fadeIn();
		}
	});
	return false;			
}

function closeReviewBoxAll(){
	var idx=0;
	jQuery('.review_list .review_box').each(function(){
		if(jQuery(this).find('.review_box_head a').hasClass('open')){
			jQuery(this).find('.review_box_head a').removeClass('open');
			jQuery(this).find('.review_box_body').css('height','0');
			jQuery(this).find('.review_box_body').find('.review_left').hide();
			jQuery(this).find('.review_box_body').find('.review_right').hide();
		}
	});
	return false;			
}

(function($){
	$.fn.adislider=function(options){
		var obj=$(this);
		var config=$.extend({
			slidewrap:null,
			useArrow:false,
			autoRolling:false,
			controlEle:null,
			moveValue:0,
			loopStyle:false
		},options);

		if($(this).find(options.slidewrap).find(options.slideBox).length <= 1){
			return false;
		}

		this.each(function(){
			var _setTimeId;
			var _commonMethod={
				loopActionInit:
					function(){
						var clone_box=obj.find(config.slidewrap).find(config.slideBox).eq(0).clone();
						obj.find(config.slidewrap).append(clone_box);
					},

				actionSliding:
					function(o,idx,val){
						o.stop();
						if($(config.titleElement).attr('id')!=undefined ){
							changeTitle(idx);
						}					
						o.animate({left:(-1*val*idx)+'px'},config.speed,config.easing);
					},
				changeCtrl:
					function(idx){
						_sliderObj.controller.find(config.controlObj).each(function(){
							$(this).removeClass('on');
						});
						_sliderObj.controller.find(config.controlObj).eq(idx).addClass('on');
					},
				autoRolling:
					function(time){
						_setTimeId=setInterval(function(){

							if(_sliderObj.nowidx == _sliderObj.contentsLength-1){
								if(config.useArrow){
									$(_sliderObj.leftBtn).addClass('disable');
									$(_sliderObj.rightBtn).removeClass('disable');
								}
								_sliderObj.nowidx=0;
								_commonMethod.changeCtrl(_sliderObj.nowidx);
								_commonMethod.actionSliding(_sliderObj.slider,_sliderObj.nowidx,config.moveValue);
							}else{

								_sliderObj.nowidx=_sliderObj.nowidx+1;

								if(config.useArrow){
									if(_sliderObj.nowidx==_sliderObj.contentsLength-1){
										$(_sliderObj.rightBtn).addClass('disable');
									}else{
										$(_sliderObj.leftBtn).removeClass('disable');
										$(_sliderObj.rightBtn).removeClass('disable');
									}
								}
								
								_commonMethod.changeCtrl(_sliderObj.nowidx);
								_commonMethod.actionSliding(_sliderObj.slider,_sliderObj.nowidx,config.moveValue);						
							}
						},time);
					},
				autoRollingStop:
					function(){
						clearInterval(_setTimeId);	
					},
				loopActionSliding:
					function(o,idx,fakeidx,val){
						o.stop();
						if(!fakeidx) o.css({left:0});
						if($(config.titleElement).attr('id')!=undefined ) changeTitle(idx);
						
						if(idx==_sliderObj.controller.find(config.controlObj).length-1){
							o.css({left:(-1*val*fakeidx)+'px'}).animate({left:(-1*val*idx)+'px'},config.speed,config.easing);
						}else if(idx==0){
							o.animate({left:(-1*val*fakeidx)+'px'},config.speed,config.easing);
						}else{
							o.animate({left:(-1*val*idx)+'px'},config.speed,config.easing);
						}
					},
				loopAutoSliding:
					function(time){
						_setTimeId=setInterval(function(){
							var fakeidx=_sliderObj.contentsLength-1;
							if(_sliderObj.nowidx==fakeidx-1){
								_sliderObj.nowidx=0;
								_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,_sliderObj.controller.find(config.controlObj).length,config.moveValue);
								_commonMethod.changeCtrl(_sliderObj.nowidx);
							}else if(_sliderObj.nowidx==0){
								_sliderObj.nowidx=_sliderObj.nowidx+1;
								_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,null,config.moveValue);	
								_commonMethod.changeCtrl(_sliderObj.nowidx);
							}else{
								_sliderObj.nowidx=_sliderObj.nowidx+1;
								_commonMethod.changeCtrl(_sliderObj.nowidx);
								_commonMethod.actionSliding(_sliderObj.slider,_sliderObj.nowidx,config.moveValue);	
							}

						},time);
					}
			}
			/* __commonMethod Object */

			if(config.loopStyle) _commonMethod.loopActionInit();

			var _sliderObj={
				slider:obj.find(config.slidewrap),
				controller:obj.find(config.controlWrap),
				nowidx:0,
				leftBtn:config.useArrow ? obj.find(config.leftMove) : false,
				rightBtn:config.useArrow ? obj.find(config.rightMove) : false,
				contentsLength:obj.find(config.slideBox).length
			}
			/* _sliderObj Object */
	 
			/* loopstyle initial */

			if(config.autoRolling && config.loopStyle){
				_commonMethod.loopAutoSliding(5000);
				if(config.autoControl){
					obj.find(config.autoControl).bind('click',function(){
						if($(this).hasClass('pause')){
							_commonMethod.autoRollingStop();
							$(this).attr('class','play');
						}else{
							_commonMethod.loopAutoSliding(5000);
							$(this).attr('class','pause');					
						}
						return false;
					});
				}else{
					obj.hover(function(){
						_commonMethod.autoRollingStop();				
					},function(){
						_commonMethod.loopAutoSliding(5000);
					});
				}
			}
			/* ------------------------------- loopstyle and auto rolling -------------------------------*/


			if(config.autoRolling && !config.loopStyle){
				_commonMethod.autoRolling(5000);
				if(config.autoControl){
					obj.find(config.autoControl).bind('click',function(){
						if($(this).hasClass('pause')){
							_commonMethod.autoRollingStop();
							$(this).attr('class','play');
						}else{
							_commonMethod.autoRolling(5000);
							$(this).attr('class','pause');					
						}
						return false;
					});
				}else{
					obj.hover(function(){
						_commonMethod.autoRollingStop();				
					},function(){
						_commonMethod.autoRolling(5000);				
					});
				}

			}
			/* ------------------------------- not loopstyle and auto rolling -------------------------------*/

			$(_sliderObj.leftBtn).bind('click',function(){
				if(config.loopStyle){
					var fakeidx=_sliderObj.contentsLength-1;
					if(_sliderObj.nowidx==0){
						_sliderObj.nowidx=_sliderObj.controller.find(config.controlObj).length-1;
						_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,fakeidx,config.moveValue);
						_commonMethod.changeCtrl(_sliderObj.nowidx);
					}else if(_sliderObj.nowidx==0){
						_sliderObj.nowidx=_sliderObj.nowidx-1;
						_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,null,config.moveValue);	
						_commonMethod.changeCtrl(_sliderObj.nowidx);
					}else{
						_sliderObj.nowidx=_sliderObj.nowidx-1;
						_commonMethod.changeCtrl(_sliderObj.nowidx);
						_commonMethod.actionSliding(_sliderObj.slider,_sliderObj.nowidx,config.moveValue);	
					}
				}else{
					if(_sliderObj.nowidx == 0) return false;
					if(_sliderObj.nowidx == 1) $(this).addClass('disable');	
					$(_sliderObj.rightBtn).removeClass('disable');
					_sliderObj.nowidx=_sliderObj.nowidx-1;
					_commonMethod.changeCtrl(_sliderObj.nowidx);
					_commonMethod.actionSliding(_sliderObj.slider,_sliderObj.nowidx,config.moveValue);	
				}
				return false;
			});

			$(_sliderObj.rightBtn).bind('click',function(){
				if(config.loopStyle){
					var fakeidx=_sliderObj.contentsLength-1;
					if(_sliderObj.nowidx==fakeidx-1){
						_sliderObj.nowidx=0;
						_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,_sliderObj.controller.find(config.controlObj).length,config.moveValue);
						_commonMethod.changeCtrl(_sliderObj.nowidx);
					}else if(_sliderObj.nowidx==0){
						_sliderObj.nowidx=_sliderObj.nowidx+1;
						_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,null,config.moveValue);	
						_commonMethod.changeCtrl(_sliderObj.nowidx);
					}else{
						_sliderObj.nowidx=_sliderObj.nowidx+1;
						_commonMethod.changeCtrl(_sliderObj.nowidx);
						_commonMethod.actionSliding(_sliderObj.slider,_sliderObj.nowidx,config.moveValue);	
					}
				}else{
					if(_sliderObj.nowidx == _sliderObj.contentsLength-1) return false;
					if(_sliderObj.nowidx == _sliderObj.contentsLength-2) $(this).addClass('disable');
					$(_sliderObj.leftBtn).removeClass('disable');
					_sliderObj.nowidx=_sliderObj.nowidx+1;
					_commonMethod.changeCtrl(_sliderObj.nowidx);
					_commonMethod.actionSliding(_sliderObj.slider,_sliderObj.nowidx,config.moveValue);	
				}
				return false;
			});
		
			$(obj.find(config.controlWrap).find(config.controlObj)).bind('click',function(){
				if(_sliderObj.nowidx == $(this).index()) return false;

				if(config.loopStyle && _sliderObj.nowidx==_sliderObj.controller.find(config.controlObj).length-1 && $(this).index()==0){
					_sliderObj.nowidx=$(this).index();
					_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,_sliderObj.controller.find(config.controlObj).length,config.moveValue);
					_commonMethod.changeCtrl(_sliderObj.nowidx);
					if(config.autoRolling){
						if(obj.find(config.autoControl).hasClass('play')){
						
						}else{
							obj.find(config.autoControl).trigger('click');
						}				
					}

				}else if(config.loopStyle && _sliderObj.nowidx==0 && $(this).index()==_sliderObj.controller.find(config.controlObj).length-1){
					_sliderObj.nowidx=$(this).index();
					_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,_sliderObj.controller.find(config.controlObj).length,config.moveValue);
					_commonMethod.changeCtrl(_sliderObj.nowidx);
					if(config.autoRolling){
						if(obj.find(config.autoControl).hasClass('play')){
						
						}else{
							obj.find(config.autoControl).trigger('click');
						}				
					}

				}else if(config.loopStyle && _sliderObj.nowidx==0){
					_sliderObj.nowidx=$(this).index();			
					_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,null,config.moveValue);
					_commonMethod.changeCtrl(_sliderObj.nowidx);
					if(config.autoRolling){
						if(obj.find(config.autoControl).hasClass('play')){
						
						}else{
							obj.find(config.autoControl).trigger('click');
						}				
					}
				}else{
					_sliderObj.nowidx=$(this).index();
					_commonMethod.changeCtrl(_sliderObj.nowidx);
					if(config.autoRolling){
						if(obj.find(config.autoControl).hasClass('play')){
						
						}else{
							obj.find(config.autoControl).trigger('click');
						}				
					}
					if(!config.loopStyle){
						if(_sliderObj.nowidx == 0 && config.useArrow){	
							$(_sliderObj.leftBtn).addClass('disable');
							$(_sliderObj.rightBtn).removeClass('disable');	
						}else if(_sliderObj.nowidx == _sliderObj.contentsLength-1 && config.useArrow){
							$(_sliderObj.rightBtn).addClass('disable');
							$(_sliderObj.leftBtn).removeClass('disable');	
						}else if(_sliderObj.contentsLength-1>_sliderObj.nowidx>0 && config.useArrow){
							$(_sliderObj.leftBtn).removeClass('disable');
							$(_sliderObj.rightBtn).removeClass('disable');	
						}				
					}
					_commonMethod.actionSliding(_sliderObj.slider,_sliderObj.nowidx,config.moveValue);
				}
				return false;
			});

			$(obj.find(config.controlWrap).find(config.controlObj)).bind('mousedown',function(){
				if(_sliderObj.nowidx == $(this).index()) return false;
				$(this).css({marginTop:'1px'});
			}).bind('mouseup',function(){
				$(this).css({marginTop:'0px'});
			});

			function changeTitle(idx){
				$(config.titleElement).text(config.titleList[idx]);
				//var _txt=obj.find(config.slideBox).eq(idx).find('.visual_title').text();
				//obj.find('.visual_util h3').text(_txt);
			}

		});
	}
	openMiPopup = function(popData){
		var html = '<div id="overlay" style="height:'+$(window).height()+'px;"></div>';
		html += '<div id="mi_adidas_pop">';
		html += '	<a href="#" class="close"></a>';
		html += '	<h1>'+popData.title+'</h1>';
		html += '	<div class="desc">'+popData.desc+'</div>';
		html += '	<div class="btn_area">';
		html += '		<a href="#"><span>'+popData.btnText+'</span></a>	';
		html += '	</div>';
		html += '</div>';
		$('body').prepend(html);			

		var popWidth = popData.width !== undefined ? popData.width : 350;
		var popHeight = popData.height !== undefined ? popData.height : 220;

		$('#mi_adidas_pop').css({
			width : popWidth,
			height : popHeight,
			marginTop : (popHeight+100)/2*-1+'px',
			marginLeft :(popWidth+90)/2*-1+'px'
		});

		setTimeout(function(){
			$('#mi_adidas_pop').show();
		},10);

		$('#mi_adidas_pop .close').bind('click',closeMiPop);
		$('#overlay').bind('click',closeMiPop);
		$('#mi_adidas_pop .btn_area a').bind('click',closeMiPop);

		function closeMiPop(){
			$('#mi_adidas_pop').remove();
			$('#overlay').remove();			
			return false;
		}
	};	

	/**
	* Swiper
	* 이미지 슬라이드 함수
	* @param {Object} options
			 width : 가로값
			 loop : 반복 여부
			 auto : 자동롤링 여부
			 dragable : 드래그 기능 여부 (추후 개발예정)
			 duration :  속도
			 easing : easing 추가 시 
	
	*/
	$.fn.Swipers = function(_options){		
		
		var wrapperElem = $(this);
		var sliderElem = wrapperElem.children();
		var itemElems = sliderElem.children();

		var defaultOptions = {
			width : $(itemElems[0]).get(0).clientWidth,
			height : $(itemElems[0]).get(0).clientHeight,
			loop : false,
			auto : false,
			autoTime : _options.auto ? 3000 : false,
			dragable : false,
			easing : false,
			duration : 800
		};
		var options = $.extend(defaultOptions,_options);

		var index = 0;
		var prevIdx = -1;
		var length = itemElems.length;
		var moveValue = !!options.moveValue ? options.moveValue : options.width;

		var autoTimer;
		var isClone = false;
		var isAnimating = false;

		function init(){

			if(options.loop){
				sliderElem.prepend($(itemElems[itemElems.length-1]).clone());
				sliderElem.append($(itemElems[0]).clone());
				itemElems =  sliderElem.children();
			}

			if(options.easing && !$.easing[options.easing]){
				options.easing = false;
			}

			wrapperElem.css({
				width : options.width,
				height : options.height,
				position : 'relative',
				overflow : 'hidden'
			});

			sliderElem.css({
				width : options.loop ? (itemElems.length + 2) * moveValue : itemElems.length * moveValue,
				height : options.height,
				position : 'absolute',
				overflow : 'hidden',
				left : options.loop ? options.width * -1 : 0
			});

			itemElems.css({
				width : options.width,
				height : options.height,
				float : 'left'
			});

			if(options.auto){
				autoTimer = setInterval(function(){
					checkAnimate(index+1,true);
				},options.autoTime);
			}
		}

		function setIndex(idx){
			prevIdx = index;
			index = idx;
		}

		function checkAnimate(num,isAuto){	
			if(isAnimating){
				return false;
			}

			var cb;
			isClone = false;

			if(options.loop){				
				if(num < 0){					
					isClone = true;
					setIndex(length-1);
					cb =function(){
						sliderElem.stop().css({
							left : (length) * -moveValue
						});
					};

				}else if(num >= length){
					isClone = true;
					setIndex(0);
					cb = function(){
						sliderElem.stop().css({
							left : -moveValue
						});
					};
				}else{
					setIndex(num);
				}
				animate(num+1 , cb);
			}else{
				if(isAuto){
					if(num < 0){
						num = length-1;
					}else if(num > length-1){
						num = 0;
					}
				}else{
					if(num < 0 || num > length-1){
						return false;
					}
				}

				setIndex(num);
				animate(num);
			}

		}

		function animate(num , cb){
			if(isAnimating){
				return false;
			}

			isAnimating = true;

			if(options.autoTime){
				clearInterval(autoTimer);
			}

			sliderElem.animate({
				left : moveValue * num * -1
			},options.duration,options.easing);

			if(!!options.callback){
				options.callback.call($(itemElems[index]),index,prevIdx);
			}

			setTimeout(function(){
				isAnimating = false;
				if(!!cb){
					cb();
				}	

				if(options.autoTime){
					autoTimer = setInterval(function(){
						checkAnimate(index+1,true);
					},options.autoTime);
				}
			},options.duration);
		}		

		init();

		return {
			prev : function(){
				checkAnimate(index-1);	
				return false;
			},
			next : function(){
				checkAnimate(index+1);	
				return false;
			},
			move : function(_index){
				if(_index !== index){
					checkAnimate(_index);
				}
				return false;
			}
		}
	}

	/**
	* $.fn.cmtSelectInit
	* 커스텀 셀렉트박스 활성화 함수 (즁복으로 이벤트가 적용되지 않기 때문에 스크립트로 HTML 생성 시 사용가능 )
	*/
	$.fn.cmtSelectInit = function(){
		$('.selectbox-ctm').each(function(){
			var elemContainer = $(this);
			var elemOpions = elemContainer.find('.select-contents').find('*[data-option-value],[data-option-value=""]');
			
			elemOpions.each(function(){
				var $this = $(this);				
				var optionText = (function(){
					if($this.attr('data-option-text') == undefined){
						return $this.find('*').text()
					}else{
						return $this.attr('data-option-text');
					}
				})();

				var optionValue = $(this).attr('data-option-value');

				if($this.hasClass('selected')){
					elemContainer.find('>a').text(optionText);
					elemContainer.attr('data-value',optionValue);
				}
			});

			if(!$(this).data('events')){
				elemContainer.bind('click',toggleSelecbox);		
			}

			
			if(!elemOpions.eq(0).data('events')){				

				elemOpions.bind('click',function(){
					var $this = $(this);
					if($(this).hasClass('disable')){
						return false;
					}


					if(!!elemContainer.data('callback') && !!elemContainer.data('callback').before){
						var beforeCallbackResult = elemContainer.data('callback').before.call($(this),$this.attr('data-option-value'),$this.index());
						if(beforeCallbackResult === false){
							return;
						}
					}

					var optionText = (function(){
						if($this.attr('data-option-text') == undefined){
							return $this.find('*').text()
						}else{
							return $this.attr('data-option-text');
						}
						
					})();
					
					elemOpions.removeClass('selected');
					$this.addClass('selected');
					elemContainer.find('>a').text(optionText);
					elemContainer.attr('data-value',$this.attr('data-option-value'));

					if(!!elemContainer.data('callback') && !!elemContainer.data('callback').after){
						elemContainer.data('callback').after.call($this,$this.attr('data-option-value'),$this.index());
					}
				});
			}
			

			function toggleSelecbox(event){
				event.stopPropagation();
				if($(this).hasClass('open')){
					$('.selectbox-ctm').removeClass('open');
					$(this).removeClass('open');
				}else{
					$('.selectbox-ctm').removeClass('open');
					$(this).addClass('open');
				}
			}
		});
	};	

	/**
	* $.fn.ctmSelectSetCallback
	* 커스텀 셀렉트 박스에 callback(before , after) 함수 추가 (최소 1개)
	* @param {Object} callback     
	*        before : function,
	*        after : function
	*/
	$.fn.ctmSelectSetCallback = function(callback){
		$(this).data('callback',callback);
	}

	/**
	* $.fn.cmtInputInit
	* 커스텀 인풋박스 활성화 함수 (즁복으로 이벤트가 적용되지 않기 때문에 스크립트로 HTML 생성 시 사용가능 )
	*/
	$.fn.cmtInputInit = function(){			

		$this = $(this);
		$('.input-ctm').each(function(){
			if(!!$(this).data('events')){
				return;
			}

			if($(this).find('input').is(':checked')){
				$(this).addClass('checked');
			}

			$(this).bind('click',function(event){

				event.preventDefault();
				event.stopPropagation();
				
				var inputElem = $(this).find('input');

				if(!!$(this).data('callback') && !!$(this).data('callback').before){
					var beforeCallbackResult = $(this).data('callback').before.call($(this));
					if(beforeCallbackResult === false){
						return;
					}
				}


				if($(this).find('input').is(':checked') && $(this).hasClass('checked')){

					if($(this).hasClass('input-check-ctm')){							
						$(this).removeClass('checked').find('input').attr('checked',false);
					}

				}else{						
					if($(this).hasClass('input-radio-ctm')){
						$('input[type="radio"][name="'+$(this).find('input[type="radio"]').attr('name')+'"]').attr('checked',false).parent().removeClass('checked');
					}

					$(this).addClass('checked').find('input').attr('checked',true);
				}

				

				if(!!$(this).data('callback') && !!$(this).data('callback').after){
					$(this).data('callback').after.call($(this));
				}

				
				return false;
			});
		});			
	};

	/**
	* $.fn.ctmInputSetCallback
	* 커스텀 인풋박스에 callback(before , after) 함수 추가 (최소 1개)
	* @param {Object} callback     
	*        before : function,
	*        after : function
	*/
	$.fn.ctmInputSetCallback = function(callback){
		$(this).data('callback',callback);
	}	

	$(document).ready(function(){

		$.fn.cmtSelectInit();
		$.fn.cmtInputInit();

		/* accessibility */
		$(document).bind('keydown',function(e){
			var keycode=e.keyCode || e.which;

			if(keycode == 9 && e.shiftKey) {
				tabval=1;
			}else{
				tabval=0;
			}
		});

		$('.sort_layer>p>a').bind('click',function(e){
			e.preventDefault();
		});

		$('a').focus(function(){
			$(this).addClass('focus_obj');
		});
		$('a').blur(function(){
			$(this).removeClass('focus_obj');
		});		

		$('.country_selector>.btn').focus(function(){
			$(this).addClass('focus_obj');
			$('.country_selector').addClass('open');
		});

		$('.country_selector>.btn').blur(function(){
			setTimeout(function(){
				if($('#header_r h1 a').hasClass('focus_obj')){
					$('.country_selector').removeClass('open');
				}			
			},10);
		});


		$('.country_selector>ul>li>a').each(function(){
			$(this).focus(function(){	
				$(this).parent('li').addClass('focus_obj');
			});
			$(this).blur(function(){
				$(this).parent('li').removeClass('focus_obj');
				setTimeout(function(){
					if(!$('.country_selector>ul>li').hasClass('focus_obj')){
						$('.country_selector>.btn').removeClass('open');
					}			
				},50)

			});
		});
	
		/* //accessibility */

		$(document).click(function(event){ 
			$('.sort_layer').find('ul').hide();
			$('.sort_layer').removeClass('on');

			$('.selectbox-ctm').removeClass('open');		
		});

		$('.topbnn_toggle').click(function(){

			var heightVal = 0;
			if($(this).hasClass('open')){
				$(this).removeClass('open');
				fn_closeBanner();
			}else{
				$(this).addClass('open');
				var imgSrc=$('.top_bnn').find('img').attr('src');		
				var imgObj = new Image();
				imgObj.onload = function(){
					heightVal = this.height;
					fn_setCookie('top_bnn','open',1);
					$('.top_bnn').animate({height:heightVal});
				}	
				imgObj.src=imgSrc;	
			}				

			return false;
		});

		$('.country_selector>.btn').bind('click',function(event){
			if(!$('.country_selector').hasClass('open')){
				$('.country_selector').addClass('open');
			}
		});

		$('.country_selector>ul').bind('mouseout',function(){
			$(this).parent().removeClass('open');
		});

		$('.country_selector>ul').bind('mouseover',function(){
			$(this).parent().addClass('open');
		});

		(function(){
			var timer,
				index = false,
				prevIdx = false,
				liElems = $('#header-20160315 .gnb_menu>ul>li'),
				layerElems = $('#header-20160315 .gnb_menu>ul>li .depth2_contents');

			$('#header-20160315 .gnb_menu>ul>li').hover(function(){

				clearTimeout(timer);

				if(prevIdx && prevIdx == $(this).index()){

				}else{
					liElems.removeClass('on');
					layerElems.hide();
				}

				index = $(this).index();

				$(this).addClass('on');				
				$(this).find('.depth2_contents').show();
			},function(){
				var liE = $(this);
				var layerE = $(this).find('.depth2_contents');
				timer = setTimeout(function(){
					liE.removeClass('on');
					layerE.hide();
				},500);

				prevIdx = index;
				index = false;

			});
		})();

		$('#header-20160315 .gnb_menu .depth3_wrapper').hover(function(){
			$(this).addClass('on');
		},function(){
			$(this).removeClass('on');
		});
		
		$('#header-20160315 .market_layer .close').bind('click',function(){
			$('#header-20160315 .market>a').removeClass('on');
			$('.market_layer').hide();
			return false;
		});

		$('.selectbox_layer').bind('click',function(){
			if( $(this).hasClass('open') ){
				$(this).removeClass('open');
			}else{
				$(this).addClass('open');
			}

			return false;
		});

		$('.selectbox_layer li').bind('click',function(){
			if($(this).hasClass('on')){
				$(this).parent().parent().removeClass('open');
				return false;
			}

			var text = $(this).text();
			var parentObj = $(this).parent();
			parentObj.siblings('a').html(text+'<span class="spt_bg btn"></span>');
			parentObj.parent().removeClass('open');

			parentObj.find('li').removeClass('on');
			$(this).addClass('on');
			return false;
		});

		$('.modal_pop_layer').each(function(){
			var obj = $(this);
			obj.find('.popup .close , .overlay').bind('click',function(){
				obj.hide();
				$('body').css({
					overflow:'',
					paddingRight : 0
				});
				return false;
			});
		});	

		$.fn.openModalPopup = function(){
			$('body').css({
				overflow:'hidden',
				paddingRight : 20
			});			

			$(this).show();

			if($(this).data('events') && $(this).data('events').scroll){
				return;
			}

			$(this).bind('scroll',function(event){
				$this = $(this);

				if($this.offset().top >= $this.find('.popup').offset().top){
					$this.find('.close').css({
						left : $this.find('.popup').offset().left + $this.find('.popup').width()
					}).addClass('fixed');
				}else{
					$this.find('.close').css({
						right : '-50px',
						left  : 'auto'
					}).removeClass('fixed');
				}				
			});
		};

		$.fn.initPhotoReviews = function(){

			$('.reviews_list .box .photos>a').each(function(){
				if(!!$(this).data('events')){
					if(!!$(this).data('events').click){
						return;	
					}
				}

				$(this).bind('click',function(){
					var $this = $(this);
					var x = $this.offset().left+10;
					var y = $this.offset().top+10;
					var img = new Image();
					img.onload = function(){
						var isHeight;
						var width;

						if(this.height - this.width > 0){
							width = 538 * (this.width/this.height);
						}else{
							width = 538;
						}

						$('body').find('.photo_review_layer').remove();

						$('body').append('<div class="photo_review_layer" style="top:'+y+'px;left:'+(x+width+40)+'px;"><a href="javascript:void(0)" class="close spt_bg"></a><div class="cont"><img src="'+this.src+'" alt="" style="width:'+width+'px;"/></div></div>');
						$('body').find('.photo_review_layer>.close').bind('click',function(){
							$(this).parent().remove();
						});
						
						
					};
					img.src = $(this).find('img').attr('src');
				});
			});

		};		
	
		$('.product-review-write .rating_star a').bind('mouseover',function(){
			var index = $(this).index();
			var i = 0;

			$('.product-review-write .tr_stars .status').text($(this).attr('title'));
			
			for(;i < 5; i++){
				if(index >= i){
					$('.product-review-write .rating_star a').eq(i).addClass('on');
				}else{
					$('.product-review-write .rating_star a').eq(i).removeClass('on');	
				}
				
			}
		});
	
		$('.product-review-write .rating_radio').each(function(){
			$(this).find('.radio_container>a').bind('click',function(){
				if($(this).hasClass('on')){
					return;
				}
				$(this).parent().find('a').removeClass('on');
				$(this).parent().siblings('.status').text($(this).attr('title'));
				$(this).addClass('on');
			});
		});


		$.fn.cutString = function(options){
			
			var elemObj = $(this);
			var elem = $(this);
			var tempText = options.text;
			var isOverLine = false;
			var contentArray = options.text.split('<br/>');
			var textLength = 0;


			for(var i = 0; i<contentArray.length; i++){
				if(contentArray[i] !== ''){
					textLength += contentArray[i].length;
				}
			}

			if(textLength >= options.cutLength){
				isOverLine = true;
				tempText = options.text.substring(0,options.cutLength);				
				tempText += '...'
			}

			if(!isOverLine){
				$(this).html(options.text);
				return;
			}

			var aElem = $('<a href="javascript:void(0)" class="more_read">'+(options.buttonName != undefined ? options.buttonName.open : '더보기') +'</a>');
			aElem.bind('click',toggleContent);

			elemObj.html(tempText);
			elemObj.append(aElem);

			function toggleContent(){
				if($(this).hasClass('shortened')){
					elemObj.html(tempText);
					$(this).text((!!options.buttonName ? options.buttonName.open : '더보기')).removeClass('shortened');
					elemObj.append(this);
				}else{
					elemObj.html(options.text);
					$(this).text((!!options.buttonName ? options.buttonName.close : '줄이기')).addClass('shortened');
					elemObj.append(this);
				}
				aElem.bind('click',toggleContent);
			}			
		};

		(function(){
			$('.cont758 .prodlist>ul>li').each(function(){
				if($(this).find('.othercolor-products-list').length > 0){
					var $this = $(this);
					var timer;					
					var sliderContainerElem = $(this).find('.othercolor-products-list');

					sliderContainerElem.find('.slider_wrap li').bind('click',function(){						
						return false;
					});

					sliderContainerElem.find('.slider_wrap li').bind('mouseover',function(){
						var img170 = $(this).find('a').attr('data-170');
						$this.find('.img>a>img').attr('src',img170);
					});

					sliderContainerElem.bind('mouseleave',function(){
						var img170 = $(this).find('a').attr('data-170');
						$this.find('.img>a>img').attr('src',sliderContainerElem.find('.slider_wrap li').eq(0).find('a').attr('data-170'));
					});

					if(sliderContainerElem.find('.slider_wrap li').length > 4){
						var prevBtn = sliderContainerElem.find('.prev');
						var nextBtn = sliderContainerElem.find('.next');
						var sliderElem = sliderContainerElem.find('.slider_wrap ul');

						var index = 0;
						var viewStep = 0;
						var viewLength = 4;
						var length = sliderElem.find('li').length;
						var moveVal = 38;

						prevBtn.bind('click',function(){
							if($(this).hasClass('disable')){
								return false;
							}
							nextBtn.removeClass('disable');

							viewStep -= 1;

							sliderElem.animate({
								left : viewStep*moveVal*-1
							},300);

							if(viewStep <= 0){
								$(this).addClass('disable');
							}
							return false;
						});

						nextBtn.bind('click',function(){
							if($(this).hasClass('disable')){
								return false;
							}

							prevBtn.removeClass('disable');

							viewStep += 1;

							sliderElem.animate({
								left : viewStep*moveVal*-1
							},300);

							if(length <= viewStep + viewLength){
								$(this).addClass('disable');
							}

							return false;
						});

					}


					$(this).bind('mouseenter',function(){						
						timer = setTimeout(function(){
							sliderContainerElem.fadeIn(100);
						},100);
					});

					$(this).bind('mouseleave',function(){
						sliderContainerElem.fadeOut(200);
						clearTimeout(timer);
						$this.find('.img>a>img').attr('src',sliderContainerElem.find('.slider_wrap li').eq(0).find('a').attr('data-170'));
					});
				}
			});
		})();	
	});

})(jQuery);