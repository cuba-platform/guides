(function ($) {
  // Fixed right navbar
  var sidebar = $(".blog .region-sidebar > section");
  var wrapper = $(".blog .region-content");
  var topBorder = 180;
  var bottomBorder = topBorder + wrapper.height() - sidebar.height() - 100;
  var images_loading = true;
  var sidebar_width = sidebar.width();
  if(sidebar_width > 283) sidebar_width = 283;
  sidebar.css('width', sidebar_width + 'px');
  $(window).scroll(function(event){
    var st = $(this).scrollTop();
    if (st > topBorder && st < bottomBorder) {
      sidebar
        .css('position', 'fixed')
        .css('margin-top', 0);
    } else if(st >= bottomBorder) {
      sidebar
        .css('position', 'inherit')
        .css('margin-top', bottomBorder - topBorder);
    } else {
      sidebar
        .css('position', 'inherit')
        .css('margin-top', 0);
    }
  });

  $(window).resize(function() {
    //resizeNavbar();
  });

  // Waiting until all images is loaded
  $(window).on("load", function() {
    images_loading = false;
  });

  // Wait for all images loaded
  navbarWidthLoop();

  function navbarWidthLoop() {
    setTimeout(function() {
      bottomBorder = topBorder + wrapper.height() - sidebar.height() - 100;
      if(images_loading) navbarWidthLoop();
    }, 500);
  }

  function resizeNavbar() {
    sidebar_width = $(window).width() * 0.25;
    bottomBorder = topBorder + wrapper.height() - sidebar.height() - 100;
    if(sidebar_width > 283) {
      sidebar_width = 283;
    } else {
      sidebar_width = Math.floor(sidebar_width);
    }
  }
})(jQuery);

