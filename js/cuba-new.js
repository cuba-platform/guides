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

}(jQuery);