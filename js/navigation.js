(function ($) {

  $(function () {
    /**
     *  Expandable submenu between header and content
     */

    $(".lower-header .explore-button").on("click", function (e) {

      $(".lower-header .submenu-expandable .submenu-expandable-content").slideToggle(700);
      $(".lower-header .submenu-expandable .submenu-expandable-content").toggleClass("closed");
      $(".submenu-expandable").toggleClass("collapsed");

    });

    $(".header-menu").click(function (event) {

      if (window.innerWidth < 830) {
        if ($(event.target).hasClass("expanded")) {
          $(".header-menu").removeClass("expanded");
          $(".header-menu ul").hide();
        }
        else {
          $(".header-menu").addClass("expanded");
          $(".header-menu ul").show();
        }
      }

    });

    /**
     *  Inactive links behaviour
     */

    $('.inactive-link, .fs-root-link').on("click", function (e) {
      e.preventDefault();
    });

    /**
     *  collapsible footer for screen width lesser than 1280px
     */

    //enquire.register("screen and (max-width:1270px)", function () {
    if (window.innerWidth <= 1270) {

      $(".menu-footer-sitemap > ul.footer_links_menu-footer-sitemap > li > a").on("click", function (event) {

        var listItem = $(event.target).parent();

        if (!$(listItem).hasClass("fs-no-children")) {
          $(".menu-footer-sitemap > ul.footer_links_menu-footer-sitemap > li").removeClass("expanded");
          $(listItem).addClass("expanded");
          return false;
        }
      });
    }
  });

  /**
   *  Minimized menu button handler for screens < 830px
   */

  $(".header-menu").click(function (event) {

    if (window.innerWidth < 830) {
      if ($(event.target).hasClass("expanded")) {
        $(".header-menu").removeClass("expanded");
        $(".header-menu ul").hide();
      }
      else {
        $(".header-menu").addClass("expanded");
        $(".header-menu ul").show();
      }
    }

  });

  //close menu on click outside
  $("body").on("click", function (event) {
    if (window.innerWidth < 830) {
      if ($(event.target).closest(".header-menu.expanded").length < 1) {
        $(".header-menu").removeClass("expanded");
        $(".header-menu ul").hide();
      }
    }

  });

  //reset header menu state when window resized to 830+

  $(window).resize(function () {
    if (window.innerWidth > 830) {
      $(".header-menu").removeClass("expanded");
      $(".header-menu ul").hide();
      $(".header-menu ul li").removeClass('open');
      $('.header-menu ul li ul').css({"display": ""});
    }
  });

})(jQuery);