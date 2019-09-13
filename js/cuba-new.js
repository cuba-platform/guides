+function ($) {
  'use strict';

  $(".header-support_toggle").click(function(e) {
    e.stopPropagation();

    $("body").toggleClass('-support-opened');
    $(".header-support").toggleClass('-open');
  });

  $(".footer-menu_label").click(function(e) {
    e.stopPropagation();

    $(this).parent().toggleClass('-expanded');
  });

    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1500);
        }
    });
}(jQuery);