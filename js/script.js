/* Ajmal Hussain Portfolio site's JavaScript - 2018*/
/* Author: Ajmal Hussain, https://ajmalhussain.in */

// $('body').scrollspy({ target: '#vertical-nav' })

// // navbar menu smooth scroller
// $('a[href^="#"]').on('click', function(event) {
//     var target = $(this.getAttribute('href'));
//     if( target.length ) {
//         event.preventDefault();
//         $('html, body').stop().animate({
//             scrollTop: target.offset().top
//         }, 1000);
//     }
// });


// // expand section
// $('.expand-btn').click(function(){
//     if ($(".collapsing-row").height() != "51vh") {
//         console.log("entered if");
//         $('.collapsing-row').animate({height:'90vh'}, 500);
        
//     }
//     else if ($(".collapsing-row").height() != "90vh"){
//         console.log("entered else");
//         $('.collapsing-row').animate({height:'51vh'}, 500);
//     }
// });

function whichAnimationEvent(){
  var t, el = document.createElement("fakeelement");

  var animations = {
    "animation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "WebkitAnimation": "webkitAnimationEnd"
  }

  for (t in animations){
    if (el.style[t] !== undefined){
      return animations[t];
    }
  }
}

var animationEvent = whichAnimationEvent();

$(".btn-myWorks").click(function(e){
  e.preventDefault();
  revealMyWorks();
});

function revealMyWorks(){
  $('.myself').addClass('slide-out-left').css('z-index', '-1');
  $('.myworks').addClass('slide-in-right').css('z-index', '1');
  $('.myself').on(animationEvent, function(e) {
    $(this).removeClass('slide-out-left');
    $('.myworks').removeClass('slide-in-right');
  });
}

$(".btn-mySelf").click(function(e){
  e.preventDefault();
  revealMySelf();
});

function revealMySelf(){
  $('.myworks').addClass('slide-out-right').css('z-index', '-1');
  $('.myself').addClass('slide-in-left').css('z-index', '1');
  $('.myworks').on(animationEvent, function(e) {
    $(this).removeClass('slide-out-right');
    $('.myself').removeClass('slide-in-left');
  });
}

$(document).ready(function(){
  setColorScheme();

  var fullContent = null;
  var requestURL = '../content.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    fullContent = request.response;
    loadEnglish();
  }

  $(".langSwitch").on("click", function(e){
    e.preventDefault();
    var switchTo = $(".langSwitch").attr("name");
    switch (switchTo){
      case "english":
        loadEnglish();
        break;
      case "tamil":
        loadTamil();
        break;
    }
  });

  function loadEnglish(){
    $(".langSwitch").attr("name", "tamil");
    $(".langSwitch").html("தமிழ்");
    $("html").attr("lang", "en");

    $("body, .greet, .myname, .position, .btn-myWorks-text, .btn-scrollDown-text").removeClass("tamil");

    var engContent = fullContent['english'];
    $(".greet").text(engContent['greet']);
    $(".myname").text(engContent['name']);
    $(".position").html(engContent['position']);
    $(".btn-myWorks-text").html(engContent['rightarrow']);
    $(".btn-scrollDown-text").html(engContent['downarrow']);
    $(".btn-mySelf-text").html(engContent['leftarrow']);
    $(".aboutme").html(engContent['aboutme']);
    // myworks
    $(".pageTitle").html(engContent['myworks']);

    $(".myworksCategories").empty();
    engContent['myworks-categories'].forEach(function(e){
      $(".myworksCategories").append('<a class="nav-link" href="#!">'+ e +'</a>')
    });

    $(".myworksCategories > .nav-link:first-child").addClass("active");

    $(".myworksCards").empty();
    $.each( engContent['myworks-webdesigns'], function( i, val ) {
      $(".myworksCards").append('<div id="no'+ i +'" class="card">'+
      '<img class="card-img-top shadow" src="img/works/thumb/'+ val['imgFile'] +'" alt="'+ val['title'] +'">'+
      '<div class="card-body">'+
        '<h4 class="card-title">'+ val['title'] +'</h4>'+
        '<p class="card-text">'+ val['description'] +'</p>'+
      '</div>'+
    '</div>');

    });
  };

  function loadTamil(){
    $(".langSwitch").attr("name", "english");
    $(".langSwitch").html("English");
    $("html").attr("lang", "ta");

    $("body, .greet, .myname, .position, .btn-myWorks-text, .btn-scrollDown-text").addClass("tamil");

    var tamilContent = fullContent['tamil'];
    $(".greet").text(tamilContent['greet']);
    $(".myname").text(tamilContent['name']);
    $(".position").html(tamilContent['position']);
    $(".btn-myWorks-text").html(tamilContent['rightarrow']);
    $(".btn-scrollDown-text").html(tamilContent['downarrow']);
    $(".btn-mySelf-text").html(tamilContent['leftarrow']);
    $(".aboutme").html(tamilContent['aboutme']);
    // myworks
    $(".pageTitle").html(tamilContent['myworks']);

    $(".myworksCategories").empty();
    tamilContent['myworks-categories'].forEach(function(e){
      $(".myworksCategories").append('<a class="nav-link" href="#!">'+ e +'</a>')
    });

    $(".myworksCategories > .nav-link:first-child").addClass("active");

    $(".myworksCards").empty();
    $.each( tamilContent['myworks-webdesigns'], function( i, val ) {
      $(".myworksCards").append('<div id=#"'+ i +'" class="card">'+
      '<img class="card-img-top shadow" src="img/works/thumb/'+ val['imgFile'] +'" alt="'+ val['title'] +'">'+
      '<div class="card-body">'+
        '<h4 class="card-title">'+ val['title'] +'</h4>'+
        '<p class="card-text">'+ val['description'] +'</p>'+
      '</div>'+
    '</div>');
    });

    $('[data-toggle="tooltip"]').tooltip();
  };
});

$(".themeSwitch").on("click", function(e){
  e.preventDefault();
  var switchTo = $(".themeSwitch").attr("name");
  switch (switchTo){
    case "dark":
      activateDarkMode();
      break;
    case "light":
      activateLightMode();
      break;
  }
});

var e = $('.myself');
e.touch();
e.on("swipeLeft", function(){
  revealMyWorks();
});

var f = $('.myworks');
f.touch();
f.on("swipeRight", function(){
  revealMySelf();
});

$(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

$('.myself, .scrollable').overlayScrollbars({ 
  resize               : "none",
  sizeAutoCapable      : true,
  clipAlways           : true,
  normalizeRTL         : true,
  paddingAbsolute      : false,
  autoUpdate           : true,
  autoUpdateInterval   : 33, 
  nativeScrollbarsOverlaid : {
      showNativeScrollbars   : false,
      initialize             : true 
  },
  overflowBehavior : {
      x : "hidden",
      y : "scroll"
  },
  scrollbars : {
      visibility       : "hidden",
      autoHide         : "leave",
      autoHideDelay    : 800,
      dragScrolling    : true,
      clickScrolling   : false,
      touchSupport     : true
  }
});

