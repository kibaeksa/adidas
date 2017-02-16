window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
            function( callback ){
            	window.setTimeout(callback, 1000 / 60);
            };
	})();


;(function ($) {
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

	 $.fn.adislider=function(options){
		var obj=$(this);
		var config=$.extend(
			{
				slidewrap:null,
				useArrow:false,
				autoRolling:false,
				controlEle:null,
				moveValue:0,
				loopStyle:false
			},options);
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
						if(obj.hasClass('visual_inner_wrap')){
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
						if(obj.hasClass('visual_inner_wrap')){
							changeTitle(idx);
						}
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
							$(this).addClass('play');
							$(this).removeClass('pause');
							$(this).text('정지 상태');
						}else{
							_commonMethod.loopAutoSliding(5000);
							$(this).addClass('pause');
							$(this).removeClass('play');
							$(this).text('재생 상태');
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
							$(this).addClass('play');
							$(this).removeClass('pause');
						}else{
							_commonMethod.autoRolling(5000);
							$(this).addClass('pause');
							$(this).removeClass('play');
						}
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

				/* 맨 마지막 콘텐츠에서 첫번째 콘텐츠로 이동하려 할 때 */
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
				/* 첫번째 콘텐츠에서 마지막 콘텐츠로 이동하려 할 때 */
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
				/* 첫번째 콘텐츠에서 마지막 콘텐츠를 제외한 콘텐츠로 이동하려 할 때 */
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

			function changeTitle(idx){
				var _txt=obj.find(config.slideBox).eq(idx).find('.visual_title').text();
				obj.find('.visual_util h3').text(_txt);
			}

		});
	}

	$(document).ready(function(){

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

		$('#gnb_150930>ul>li').hover(function(){
			if(!$(this).find('a.depth1_btn').hasClass('dep2btn')){
				return false;
			}
			$(this).addClass('on');
		},function(){
			if(!$(this).find('a.depth1_btn').hasClass('dep2btn')){
				return false;
			}
			$(this).removeClass('on');
		});

		;(function(){
			var isEntered = false,
				layerTimer;
			$('#footer_wrap_160704 .sns .sns_box').bind('mouseenter',function(event){
				event.stopPropagation();
				if($(this).find('.layer').attr('class') !== undefined){
					var layerElem = $(this).find('.layer');
					clearTimeout(layerTimer);
					layerTimer = setTimeout(function(){
						layerElem.removeClass('active');
					},3000);

					$('#footer_wrap_160704 .sns .sns_box').each(function(){
						if($(this).find('.layer').attr('class') !== undefined){
							$(this).find('.layer').removeClass('active');
						}
					});

					if(isEntered){
						isEntered = false;
						layerElem.removeClass('active');
					}else{
						layerElem.addClass('active');
						layerElem.bind('mouseenter',function(event){
							event.stopPropagation()
							clearTimeout(layerTimer);
							isEntered = true;
						}).bind('mouseleave',function(event){
							event.stopPropagation()
							isEntered = false;
							$(this).removeClass('active');
							$(this).unbind('mouseleave');
						});
					}
				}
			});
		})();

		/* Custom form init */
		$.fn.cmtSelectInit();
		$.fn.cmtInputInit();
	});

	$.fn.Swipers = function(_options){
		/*
			options
			* width
			* loop
			* auto
			* dragable
			* duration
			* easing
		*/

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

}(jQuery));

var isRun=false;

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

function fn_inputFocus(){
	var obj=jQuery('div.search_area :text');
	if(obj.val()==obj.attr('defaultValue')){
		obj.val('')
	}
}

function fn_inputBlur(){
	var obj=jQuery('div.search_area :text');
	if(obj.val()==''){
		obj.val(obj.attr('defaultValue'));
	}
}



function fn_layerToggle(){

	var	arr=new Array();
	arr=jQuery('#open_layer').find('div')

	if(isRun){
		return false;
	}
	isRun=true;

	if(!parseInt(jQuery('div.layer_prod').css('height'))){

		jQuery(arr[0]).hide();
		jQuery(arr[1]).show();
		jQuery('div.layer_prod').css('margin-bottom','1px').animate({height:'501px'},500);

	}else{
		jQuery(arr[0]).show();
		jQuery(arr[1]).hide();
		jQuery('div.layer_prod').css('margin-bottom','0').animate({height:0},500);
	}

	setTimeout('isRun=false',500);


}




function isFloat(n) {
   return typeof n == 'number' && n % 1 == 0;
}




function fn_loadPage(){
	jQuery('input.search_box').css('border','none');

	if(jQuery(document).find('div').hasClass('visual') && jQuery(document).find('div').hasClass('banner_slide')){
		this.setInterval('fn_visualAction()',5000);
		this.setInterval('fn_bannerAction()',4000);
	}else if(jQuery(document).find('div').hasClass('visual') && !jQuery(document).find('div').hasClass('banner_slide')){
		this.setInterval('fn_visualAction()',5000);
	}else if(!jQuery(document).find('div').hasClass('visual') && jQuery(document).find('div').hasClass('banner_slide')){
		this.setInterval('fn_bannerAction()',4000);
	}

}


function fn_inputDesign(id){
	var design=jQuery('a.'+id);

	if(!design.hasClass('on')){
		design.addClass('on');
		document.getElementById(id).setAttribute('checked','checked')
	}else{
		design.removeClass('on');
		jQuery('#'+id).removeAttr('checked');
	}

}

function fn_inputDesignR(id){
	var obj_a=jQuery('li.'+id);
	var alist=new Array();
	var radiolist=new Array();
	alist=jQuery('div.search_price ul li');
	radiolist=jQuery('div.radio_box input');

	alist.each(function(){

		if(jQuery(this).find('a').hasClass('on')){
			jQuery(this).find('a').removeClass('on');
		}

	});

	radiolist.each(function(){
		jQuery(this).removeAttr('checked');
	});

	obj_a.find('a').addClass('on');
    document.getElementById(id).setAttribute('checked','checked');

}


function fn_inputR_left(){
	var chk_num=0;
	var alist=new Array();
	var radiolist=new Array();
	alist=jQuery('div.search_price ul li');
	radiolist=jQuery('div.radio_box input');

	alist.each(function(){
		if(jQuery(this).find('a').hasClass('on')){
			chk_num=jQuery(this).index();
			jQuery(this).find('a').removeClass('on');
		}
	});

	radiolist.each(function(){
		jQuery(this).removeAttr('checked');
	});

	if(chk_num==0){
		jQuery(alist[4]).find('a').addClass('on');
		document.getElementById('price5').setAttribute('checked','checked');
	}else{
		jQuery(alist[chk_num-1]).find('a').addClass('on');
		document.getElementById('price'+(chk_num)).setAttribute('checked','checked');
	}
}

function fn_inputR_right(){
	var chk_num=0;
	var alist=new Array();
	var radiolist=new Array();
	alist=jQuery('div.search_price ul li');
	radiolist=jQuery('div.radio_box input');

	alist.each(function(){
		if(jQuery(this).find('a').hasClass('on')){
			chk_num=jQuery(this).index();
			jQuery(this).find('a').removeClass('on');
		}
	});

	radiolist.each(function(){
		jQuery(this).removeAttr('checked');
	});

	if(chk_num==alist.length-1){
		jQuery(alist[0]).find('a').addClass('on');
		document.getElementById('price1').setAttribute('checked','checked');
	}else{
		jQuery(alist[chk_num+1]).find('a').addClass('on');
		document.getElementById('price'+(chk_num+2)).setAttribute('checked','checked');
	}
}


function fn_searchToggle(){
	var ico=jQuery('div.search_btn').find('a').find('img');
	var txt=jQuery('div.search_btn').find('span').find('img');
	var icoPath=ico.attr('src');
	var txtPath=txt.attr('src');
	var box1=jQuery('div.smart_search div.search_box3');
	var box2=jQuery('div.smart_search div.search_box4');

	if(box1.css('display')=='block'){
		box1.hide();
		box2.hide();
		icoPath=icoPath.replace(/ico_close_search\.gif$/,'ico_open_search.gif');
		txtPath=txtPath.replace(/txt_close_search\.gif$/,'txt_open_search.gif');
		ico.attr('src',icoPath);
		txt.attr('src',txtPath);
	}else{
		box1.show();
		box2.show();
		icoPath=icoPath.replace(/ico_open_search\.gif$/,'ico_close_search.gif');
		txtPath=txtPath.replace(/txt_open_search\.gif$/,'txt_close_search.gif');
		ico.attr('src',icoPath);
		txt.attr('src',txtPath);
	}
}


function clubList(obj){
	var array=jQuery('div.list_box li');
	var idx=jQuery(obj).parent('strong').parent('div.list_tit').parent('li').index();
	var viewing_idx=-1;

	jQuery('div.list_box li').each(function(){
		if( jQuery(this).find('div.list_cont').css('display')=='block') {
			viewing_idx=jQuery(this).index();
		}
	});

	if(viewing_idx==idx){ /* 펼쳐져있는 리스트를 눌렀을때 */
		jQuery(array[idx]).find('div.list_cont').hide();
		jQuery(array[idx]).removeClass('now');
	}else{

		if(viewing_idx<0){
			jQuery(array[idx]).find('div.list_cont').slideDown(200);
			jQuery(array[idx]).addClass('now');
		}else{
			jQuery(array[viewing_idx]).find('div.list_cont').hide();
			jQuery(array[idx]).find('div.list_cont').slideDown(200);
			jQuery(array[viewing_idx]).removeClass('now');
			jQuery(array[idx]).addClass('now');
		}

	}
}

function topBnnAction(){
	var ht=parseInt( jQuery('.top_bnn').css('height'));
	var imght=jQuery('.top_bnn').find('img').height();

	if(ht < imght){
		//jQuery('.top_bnn').animate({height:imght+'px'});
		jQuery('.top_bnn').animate({height:imght+'px'});
	}else{
		jQuery('.top_bnn').animate({height:'0'});
	}
	return false;
}
