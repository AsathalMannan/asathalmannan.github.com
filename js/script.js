/* Ajmal Hussain Portfolio site's JavaScript - 2018*/
/* Author: Ajmal Hussain, https://ajmalhussain.in */

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
  setTimeout(function() {
    $(".alert").alert('close');
  }, 1500);

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
    loadContent('english');
  };

  function loadTamil(){
    $(".langSwitch").attr("name", "english");
    $(".langSwitch").html("English");
    $("html").attr("lang", "ta");
    $("body, .greet, .myname, .position, .btn-myWorks-text, .btn-scrollDown-text").addClass("tamil");
    loadContent('tamil');    
    $('[data-toggle="tooltip"]').tooltip();
  };

  function loadContent(lang){
    var content = fullContent[lang];
    $(".greet").text(content['greet']);
    $(".myname").text(content['name']);
    $(".position").html(content['position']);
    $(".btn-myWorks-text").html(content['rightarrow']);
    $(".btn-scrollDown-text").html(content['downarrow']);
    $(".btn-mySelf-text").html(content['leftarrow']);
    $(".aboutme").html(content['aboutme']);
    // myworks
    $(".pageTitle").html(content['myworks']);

    $(".myworksCategories").empty();
    content['myworks-categories'].forEach(function(e){
      $(".myworksCategories").append('<a class="nav-link" href="#!">'+ e +'</a>')
    });

    $(".myworksCategories > .nav-link:first-child").addClass("active");

    $(".myworksCards").empty();
    $.each( content['myworks-webdesigns'], function( i, val ) {
      $(".myworksCards").append('<div id="no'+ i +'" class="card">'+
      '<img class="card-img-top shadow" src="img/works/thumb/'+ val['imgFile'] +'" alt="'+ val['title'] +'">'+
      '<div class="card-body d-flex flex-row aling-items-center justify-content-between">'+
        '<div class="d-inline-flex flex-column">'+
          '<h4 class="card-title">'+ val['title'] +'</h4>'+
          '<p class="card-text">'+ val['description'] +'</p>'+
        '</div>'+
        '<div class="d-inline-flex align-items-center">'+
            '<a href="'+ val['web'] +'" class="nav-link m-2 liveLink" target="_blank"></a>'+
            '<a href="'+ val['repo'] +'" class="nav-link ml-2 mt-2 mb-2 mr-0 codeFork" target="_blank"></a>'+
        '</div>'+
      '</div>'+
    '</div>');
    });
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

