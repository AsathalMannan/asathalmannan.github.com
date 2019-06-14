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

// // Tooltip activator
// $(function(){
//     $('[data-toggle="tooltip"]').tooltip();
//   });

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

$(".btn-myWorks").click(function(){
    console.log("btn myworks working");
    $('.myself').animate({
        left: '-50%'
    }, 500, function() {
        $('.myself').css('left', '150%');
        $('.myself').appendTo('body');
    });

    $('.myself').next().animate({
        left: '50%'
    }, 500);
    // $(".myworks").css("margin-left", "-100vw");
});