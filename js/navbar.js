(function ($) {
  // Fixed right navbar
  var sidebar = $(".blog .region-sidebar > section");
  var wrapper = $(".blog .region-content");
  var sidebar_width = sidebar.width();
  var topBorder = 180;
  var bottomBorder = topBorder + wrapper.height() - sidebar.height() - 100;
  var images_loading = true;
  $(window).scroll(function(event){
    var st = $(this).scrollTop();
    if (st > topBorder && st < bottomBorder) {
      sidebar
        .css('position', 'fixed')
        .css('width', sidebar_width + 'px')
        .css('margin-top', 0);
    } else if(st >= bottomBorder) {
      sidebar.css('position', 'inherit');
      sidebar.css('margin-top', bottomBorder - topBorder);
    } else {
      sidebar.css('position', 'inherit');
      sidebar.css('margin-top', 0);
    }
  });

  $(window).resize(function() {
    resizeNavbar();
  });

  // Waiting until all images is loaded
  $(window).on("load", function() {
    images_loading = false;
  });

  // Wait for all images loaded
  resizeNavbarLoop();

  function resizeNavbarLoop() {
    setTimeout(function() {
      resizeNavbar();
      if(images_loading) resizeNavbarLoop();
    }, 1000);
  }

  function resizeNavbar() {
    sidebar_width = $(window).width() * 0.25;
    bottomBorder = topBorder + wrapper.height() - sidebar.height() - 100;
    if(sidebar_width > 284) {
      sidebar_width = 284;
    } else {
      sidebar_width = Math.round(sidebar_width);
    }
  }
})(jQuery);

