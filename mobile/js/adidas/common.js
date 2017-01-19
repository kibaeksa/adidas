var ua = window.navigator.userAgent;
var adiApp = adiApp || {};

(function($){
	$('.nav_main .btn_slide').bind('click',function(){
		if($(this).hasClass('open')){
			$(this).removeClass('open')

			$('html').removeClass('no_srl');
			$('#header .nav_menu').removeClass('slide-open').css({
				left : '-100%'
			});
			$('#header').removeClass('open-menu');

			$('html,body').animate({
				scrollTop : $('.nav_main').data('prevScrollTop').scrollTop
			},0);

		}else{
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var topBnnElem = $('.top_bnn').get(0)
			var offsetTop = !topBnnElem ? 61 : topBnnElem.getBoundingClientRect().bottom - topBnnElem.getBoundingClientRect().top + 61;
			var elemH = $(window).height() - document.getElementById('header').getBoundingClientRect().bottom;
			$('#header').addClass('open-menu');
			if($('.nav_main .btn_search').hasClass('open')){
				$('#S_PROD_NM').blur();
				$('#header .nav_search').removeClass('slide-open').css({
					right : '-100%'
				});
				$('.nav_main .btn_search').removeClass('open');
				setTimeout(function(){
					$('.nav_main .btn_slide').addClass('open');
					$('#header .nav_menu').addClass('slide-open').css({
						minHeight : elemH,
						height : elemH,
						left : 0
					});
				},100);
			}else{
				$('.nav_main').data('prevScrollTop',{
					scrollTop : scrollTop
				});
				$(this).addClass('open');
				$('#header .nav_menu').addClass('slide-open').css({
					minHeight : elemH,
					height : elemH,
					left : 0
				});
			}

			$('html').addClass('no_srl');

		}
		return false;
	});


	$('.nav_main .btn_search').bind('click',function(){
		if($(this).hasClass('open')){
			$(this).removeClass('open')

			$('html').removeClass('no_srl');
			$('#header .nav_search').removeClass('slide-open').css({
				right : '-100%'
			});

			$('html,body').animate({
				scrollTop : $('.nav_main').data('prevScrollTop').scrollTop
			},0);

		}else{
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var topBnnElem = $('.top_bnn').get(0)
			var offsetTop = !topBnnElem ? 61 : topBnnElem.getBoundingClientRect().bottom - topBnnElem.getBoundingClientRect().top + 61;
			var elemH = $(window).height() - document.getElementById('header').getBoundingClientRect().bottom;

			if($('.nav_main .btn_slide').hasClass('open')){
				$('#header .nav_menu').removeClass('slide-open').css({
					left : '-100%'
				});
				$('.nav_main .btn_slide').removeClass('open');
			}else{
				$('.nav_main').data('prevScrollTop',{
					scrollTop : scrollTop
				});
			}


			$(this).addClass('open');
			$('html').addClass('no_srl');
			$('#header .nav_search').addClass('slide-open').css({
				minHeight : elemH,
				height : elemH,
				right : 0
			});

			setTimeout(function(){
				$('#S_PROD_NM').focus();
			},600);
		}
		return false;
	});

	$('#header .nav_menu .gnb>li li').bind('click',function(event){
		event.stopPropagation()

		if($(this).hasClass('open')){
			$(this).removeClass('open');
		}else{
			$(this).addClass('open');
		}
		return false;
	});

	$('#header .nav_menu .gnb>li').bind('click',function(event){
		event.stopPropagation()

		if(!$(this).hasClass('open')){

			$('#header .nav_menu .gnb>li').removeClass('open');
			$(this).addClass('open');


			$('#header .nav_menu').data('prevGnbScroll',{
				scrollTop : $('#header .nav_menu').scrollTop()
			});

			var yVal = Math.abs(Math.abs($('#header .nav_menu').scrollTop()) + $(this).get(0).getBoundingClientRect().top) - 61;

			setTimeout(function(){
				$('#header .nav_menu').animate({
					scrollTop : yVal
				},250);
			},100);

		}else{
			$(this).removeClass('open');
			$('#header .nav_menu').animate({
				scrollTop : $('#header .nav_menu').data('prevGnbScroll').scrollTop
			},250);
		}
		return false;
	});

	$('#filterLayerBtn').bind('click',function(){
		if($(this).hasClass('on')){
			$('html').removeClass('no_srl');
			$('#filter_layer').removeClass('open');

			$('html,body').animate({
				scrollTop : $('#filterLayerBtn').data('prevScrollTop').scrollTop
			},0);
		}else{
			fnGetOptions();

			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			$('#filterLayerBtn').data('prevScrollTop',{
				scrollTop : scrollTop
			});

			$('html').addClass('no_srl');
			$('#filter_layer').addClass('open');

		}
	});

	$('#filter_layer .close_x_btn').bind('click',function(){
		$('html').removeClass('no_srl');
		$('#filter_layer').removeClass('open');
		$('#filterLayerBtn').removeClass('on');
		$('html,body').animate({
			scrollTop : $('#filterLayerBtn').data('prevScrollTop').scrollTop
		},0);
	});

	$('#filter_layer .toggle_arw').bind('click',function(){
		if($(this).hasClass('open')){
			$(this).removeClass('open');
		}else{
			$(this).addClass('open');
		}
	});

	if($('div').owlCarousel){
		$('.viewed_items .item_list .slider').owlCarousel({
			stagePadding:30,
			margin:15,
			items :3,
			merge: true,
		});
	}


	$('#header .nav_search .sch_tab>a').bind('click',function(){
		if($(this).hasClass('on')){
			return false;
		}

		if($(this).index() == 0){
			$('#header .nav_search .keyword_recent').show();
			$('#header .nav_search .sch_list').hide();
			$('#header .nav_search .sch_tab>a').eq(1).removeClass('on');
			$(this).addClass('on');
		}else{
			$('#header .nav_search .sch_list').show();
			$('#header .nav_search .keyword_recent').hide();
			$('#header .nav_search .sch_tab>a').eq(0).removeClass('on');
			$(this).addClass('on');
		}

		return false;
	});

	$('.top_bnn .top_bnn_close').bind('click',function(){
		var $this = $(this);
		$this.parent().remove();

		if($('.nav_menu').hasClass('slide-open')){
			$('.nav_menu').css({
				height:$(window).height() - document.getElementById('header').getBoundingClientRect().bottom,
				minHeight:$(window).height() - document.getElementById('header').getBoundingClientRect().bottom
			});
		}

		if($('.nav_search').hasClass('slide-open')){
			$('.nav_search').css({
				height:$(window).height() - document.getElementById('header').getBoundingClientRect().bottom,
				minHeight:$(window).height() - document.getElementById('header').getBoundingClientRect().bottom
			});
		}
	});



	adiApp.bindSelectBox = function(elemId){
		if(elemId != undefined){
			$('#'+elemId+'>select').bind('change',function(){
				$(this).siblings('a').find('span').text($(this).find('option:selected').text());
			});
		}else{
			$('.sel_design>select').bind('change',function(){
				$(this).siblings('a').find('span').text($(this).find('option:selected').text());
			});
		}

	};

	adiApp.openHotspot = function(elemId,obj){

		if(elemId != undefined){
			if($('#'+elemId).hasClass('active')){
				return false;
			}

			$('.hotspot_layer').removeClass('active');
			$('.'+elemId).addClass('active');
		}
		return false;
	};

	adiApp.closeHotspot = function(obj){
		$('.hotspot_layer').removeClass('active');
		return false;
	};

	adiApp.bindSelectBox();
	adiApp.bindHotspot = function(){
		if($('.hotspot').attr('data-hotspot-layer') !== undefined){
			$('.hotspot').bind('click',function(){

				adiApp.openHotspot($(this).attr('data-hotspot-layer'),$(this));

				// Binding click event to close button
				$('.'+$(this).attr('data-hotspot-layer')).find('.close').bind('click',function(){
					adiApp.closeHotspot($(this));
					$(this).unbind('click');
					$(document).unbind('click');
				});

			});
		}
	};

	if($('.top_bnn').length > 0){
		if($('.layerpop_wrap').length > 0){
			var topBi = 0;
			var topBL = $('.top_bnn').length;
			var topCount = 0;
			var topBImg;
			var topBHeight = 0;
			for(; topBi < topBL; topBi++){
				topBImg = new Image();
				topBImg.onload = function(){
					var ratioImg = this.height / this.width;
					++topCount;
					topBHeight += window.innerWidth * ratioImg;
					if(topCount == topBL){
						$('.layerpop_wrap').find('.inner').css({
							marginTop : topBHeight + 75
						});
					}
				};
				topBImg.src = $('.top_bnn').eq(topBi).find('img').attr('src');
			}
		}
	}

	(function(){
		var offsetTop,
			offsetBottom,
			checkVib,
			pastTime = new Date().getTime(),
			changeTime = new Date().getTime(),
			headerElem = document.getElementById('header'),
			containerElem = document.getElementById('container'),
			elemTopbnn = document.getElementsByClassName('top_bnn'),
			topBnnH = 0;

			// Detect Topbanners height and add all
			for(var i = 0; elemTopbnn.length > i; i++){
				var imgSrc = (function(index){
					var iSrc = '';
					for(var i = 0; i < elemTopbnn[index].children.length; i++){
						if(elemTopbnn[index].children[i].nodeName.toLowerCase() == 'img'){
							iSrc = elemTopbnn[index].children[i].src;
							break;
						}
					}
					return iSrc;
				})(i);


				var image = new Image();
				image.onload = function(){
					var ratio = this.height / this.width;
					topBnnH += window.innerWidth * ratio;
				};
				image.src = imgSrc;
			}

			prevScroll = document.documentElement.scrollTop || document.body.scrollTop;

		(function headerSticky(){

			if($('#header>*').hasClass('slide-open')){
				requestAnimationFrame(headerSticky);
				return;
			}

			var sTop = document.documentElement.scrollTop || document.body.scrollTop;
			offsetTop = 61 + topBnnH;

			if(sTop < offsetTop-50){
				$(headerElem).addClass('unfixed hide');
				containerElem.style.marginTop = '0';
				prevScroll = sTop;
			}else if(sTop > offsetTop){
				$(headerElem).removeClass('unfixed');
				containerElem.style.marginTop = '61px';
				offsetTop = 61 + topBnnH;

				if(prevScroll - sTop > 3){
					$(headerElem).removeClass('hide');
				}else if(prevScroll - sTop < -3){
					$(headerElem).addClass('hide');
				}

				offsetTop = headerElem.getBoundingClientRect().top;
				offsetBottom = headerElem.getBoundingClientRect().bottom;

				prevScroll = sTop;
			}


			requestAnimationFrame(headerSticky);
		})();

	})();



})(jQuery);
