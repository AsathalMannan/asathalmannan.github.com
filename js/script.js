/* Ajmal Hussain Portfolio site's JavaScript - 2018*/
/* Author: Ajmal Hussain, https://ajmalhussain.in */

$('body').scrollspy({ target: '#vertical-nav' })

// navbar menu smooth scroller
$('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});