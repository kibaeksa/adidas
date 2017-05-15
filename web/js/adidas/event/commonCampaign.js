!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.raf=e()}}(function(){return function e(n,t,r){function o(u,c){if(!t[u]){if(!n[u]){var f="function"==typeof require&&require;if(!c&&f)return f(u,!0);if(i)return i(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var l=t[u]={exports:{}};n[u][0].call(l.exports,function(e){var t=n[u][1][e];return o(t?t:e)},l,l.exports,e,n,t,r)}return t[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,n,t){function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(s===setTimeout)return setTimeout(e,0);if((s===r||!s)&&setTimeout)return s=setTimeout,setTimeout(e,0);try{return s(e,0)}catch(n){try{return s.call(null,e,0)}catch(n){return s.call(this,e,0)}}}function u(e){if(d===clearTimeout)return clearTimeout(e);if((d===o||!d)&&clearTimeout)return d=clearTimeout,clearTimeout(e);try{return d(e)}catch(n){try{return d.call(null,e)}catch(n){return d.call(this,e)}}}function c(){w&&h&&(w=!1,h.length?m=h.concat(m):y=-1,m.length&&f())}function f(){if(!w){var e=i(c);w=!0;for(var n=m.length;n;){for(h=m,m=[];++y<n;)h&&h[y].run();y=-1,n=m.length}h=null,w=!1,u(e)}}function a(e,n){this.fun=e,this.array=n}function l(){}var s,d,p=n.exports={};!function(){try{s="function"==typeof setTimeout?setTimeout:r}catch(e){s=r}try{d="function"==typeof clearTimeout?clearTimeout:o}catch(e){d=o}}();var h,m=[],w=!1,y=-1;p.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)n[t-1]=arguments[t];m.push(new a(e,n)),1!==m.length||w||i(f)},a.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=l,p.addListener=l,p.once=l,p.off=l,p.removeListener=l,p.removeAllListeners=l,p.emit=l,p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},{}],2:[function(e,n,t){(function(t){for(var r=e("performance-now"),o="undefined"==typeof window?t:window,i=["moz","webkit"],u="AnimationFrame",c=o["request"+u],f=o["cancel"+u]||o["cancelRequest"+u],a=0;!c&&a<i.length;a++)c=o[i[a]+"Request"+u],f=o[i[a]+"Cancel"+u]||o[i[a]+"CancelRequest"+u];if(!c||!f){var l=0,s=0,d=[],p=1e3/60;c=function(e){if(0===d.length){var n=r(),t=Math.max(0,p-(n-l));l=t+n,setTimeout(function(){var e=d.slice(0);d.length=0;for(var n=0;n<e.length;n++)if(!e[n].cancelled)try{e[n].callback(l)}catch(e){setTimeout(function(){throw e},0)}},Math.round(t))}return d.push({handle:++s,callback:e,cancelled:!1}),s},f=function(e){for(var n=0;n<d.length;n++)d[n].handle===e&&(d[n].cancelled=!0)}}n.exports=function(e){return c.call(o,e)},n.exports.cancel=function(){f.apply(o,arguments)},n.exports.polyfill=function(){o.requestAnimationFrame=c,o.cancelAnimationFrame=f}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"performance-now":3}],3:[function(e,n,t){(function(e){(function(){var t,r,o;"undefined"!=typeof performance&&null!==performance&&performance.now?n.exports=function(){return performance.now()}:"undefined"!=typeof e&&null!==e&&e.hrtime?(n.exports=function(){return(t()-o)/1e6},r=e.hrtime,t=function(){var e;return e=r(),1e9*e[0]+e[1]},o=t()):Date.now?(n.exports=function(){return Date.now()-o},o=Date.now()):(n.exports=function(){return(new Date).getTime()-o},o=(new Date).getTime())}).call(this)}).call(this,e("_process"))},{_process:1}]},{},[2])(2)});

var initCampaign = function(options){
    var rafId;

    function getParallax(){
        var elements = $('*[data-cparallax=""]');
        var arr = [];

        elements.each(function(){
            arr.push({
                element : $(this),
                delay : $(this).attr('data-cparallax-delay') || 0
            });
        });

        return arr;
    }

    function initSliderType1(elemSelector){
        var index = 0;
        var elemWrapper = $(elemSelector);
        var elemSlider = elemWrapper.find('ul');
        var elemNumSlider = elemWrapper.find('.num_wrap');
        var length = elemNumSlider.find('a').length;

        var animate = function(){
            elemSlider.stop().animate({
                left : (-950 * index) + (- 250 * index)
            });

            elemNumSlider.stop().animate({
                left : (-320 * index ) + 300
            });
            setNum();
        }

        var setNum = function(){
            elemNumSlider.find('a').removeClass('on').eq(index).addClass('on');
        }

        elemNumSlider.find('a').each(function(){
            if($(this).hasClass('on')){
                index = $(this).index();

                elemSlider.css({
                    left : (-950 * index) + (- 250 * index)
                });

                elemNumSlider.css({
                    left : (-320 * index ) + 320
                });

                if(index == length-1){
                    elemWrapper.find('.next').addClass('disabled');
                }else if(index == 0){
                    elemWrapper.find('.prev').addClass('disabled');
                }

            }
        });

        elemNumSlider.find('a').bind('click',function(){
            if($(this).index() == index){
                return;
            }

            index = $(this).index();
            animate();

            if(index == length-1){
                elemWrapper.find('.prev').removeClass('disabled');
                elemWrapper.find('.next').addClass('disabled');
            }else if(index == 0){
                elemWrapper.find('.next').removeClass('disabled');
                elemWrapper.find('.prev').addClass('disabled');
            }else{
                elemWrapper.find('.next').removeClass('disabled');
                elemWrapper.find('.prev').removeClass('disabled');
            }
        });

        elemWrapper.find('.prev').bind('click',function(){
            if($(this).hasClass('disabled')){
                return;
            }

            index -= 1;
            animate();
            elemWrapper.find('.next').removeClass('disabled');
            if(index == 0){
                $(this).addClass('disabled');
            }

        });

        elemWrapper.find('.next').bind('click',function(){
            if($(this).hasClass('disabled')){
                return;
            }

            index += 1;
            animate();
            elemWrapper.find('.prev').removeClass('disabled');
            if(index == length-1){
                $(this).addClass('disabled');
            }
        });
    }

    function handleParallax(){
        var i = 0;
        var curWindowTop = $(window).scrollTop();
        for(; i < parallaxElements.length; i++){
            if(parallaxElements[i].isDone){
                continue;
            }

            if(curWindowTop > parallaxElements[i].element.offset().top - $(window).height()*0.9){
                parallaxElements[i].element.addClass('loaded');
                parallaxElements[i].isDone = true;
            }
        }

        rafId = raf(handleParallax);
    }

    if(options && options.parallax){
        $('.campaign-content').addClass('parallax');

        var i = 0,
            parallaxElements = getParallax();
        for(;i < parallaxElements.length; i++){
            parallaxElements[i].element.addClass('init-parallax');
        }

        console.log(parallaxElements);

        handleParallax();
    }

    /* Init all sliders */
    $('.slider-type1').each(function(){
        var $this = this;
        (function(){
            initSliderType1($this);
        })();
    });

};
