"use strict";var currentLocation="firstPage",autoScrolling=!1,firstHeight=$(".first").offset().top,secondHeight=$(".second").offset().top,thirdHeight=$(".third").offset().top;function moveCarusel(e){var t=$(document).width(),a=$(".carusel-items").css("left");"left"==e.target.classList[1]?"0px"!=a&&(a=="".concat(2*-t,"px")?$(".carusel-items").animate({left:"".concat(a.slice(0,-2)/2)},100):$(".carusel-items").animate({left:"".concat(0)},100)):"0px"==a?$(".carusel-items").animate({left:"".concat(-t)},100):$(".carusel-items").animate({left:"".concat(2*-t)},100)}function moveStars(e){var t=Math.floor((event.clientX-$(window).width()/2)/e)+"px",a=Math.floor((event.clientY-$(window).height()/2)/e)+"px";$(".second img").css("transform","translate(".concat(t,",").concat(a,")"))}$(document).scroll((function(e){var t=$(window).scrollTop();function a(e,t){currentLocation=t,autoScrolling=!0,$("body,html").animate({scrollTop:e},600,(function(){autoScrolling=!1}))}autoScrolling||(t>1&&"firstPage"==currentLocation?a(secondHeight,"secondPage"):t>secondHeight&&"secondPage"==currentLocation?a(thirdHeight,"thirdPage"):t<thirdHeight&&"thirdPage"==currentLocation?a(secondHeight,"secondPage"):t<secondHeight&&"secondPage"==currentLocation&&a(firstHeight,"firstPage"))})),$(".left").click((function(e){moveCarusel(e)})),$(".right").click((function(e){moveCarusel(e)})),$(".second").mousemove((function(){moveStars(15)}));var validationProgress={name:!1,email:!1,message:!1};function formRest(){validationProgress.name=!1,validationProgress.email=!1,validationProgress.message=!1,$("#name,#email,#message").css({border:"none"}),$("form")[0].reset()}$("#name").change((function(){$("#name").val().search(/[a-z]*[a-zA-Z][^\W*\d]{1,15}$/g)?(validationProgress.name=!1,$("#name").css({border:"1px solid crimson"})):(validationProgress.name=!0,$("#name").css({border:"1px solid green"}))})),$("#email").change((function(){$("#email").val().search(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/m)?(validationProgress.email=!1,$("#email").css({border:"1px solid crimson"})):(validationProgress.email=!0,$("#email").css({border:"1px solid green"}))})),$("#message").change((function(){""==$("#message").val().trim()?validationProgress.message=!1:validationProgress.message=!0})),$("#send").click((function(e){e.preventDefault();for(let val in validationProgress)if(0==validationProgress[val])return $("#".concat(val)).css("transform","translate(2%,0)"),setTimeout((function(){$("#".concat(val)).css("transform","translate(-2%,0)")}),200),void setTimeout((function(){$("#".concat(val)).css("transform","translate(0,0)")}),400);$(".form-wraper").css("transform","translate(0,100vh)"),$(".modal").css("transform","translate(0,0)")})),$(".modal button").click((function(){$(".form-wraper").css("transform","translate(0,0)"),$(".modal").css("transform","translate(0,-70vh)"),formRest()}));