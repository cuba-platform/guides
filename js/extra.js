(function ($) {

  $(function () {

    /**
     *  Remove lang prefix function
     */

    function removeLangPrefix(path) {
      if (!path) {
        return path;
      }
      if (path.match("^/ru") || path.match("^/en")) {
        return path.slice(3);
      } else {
        return path;
      }
    }

    /**
     *  Expandable submenu between header and content
     */

    $(".lower-header .explore-button").on("click", function (e) {

      $(".lower-header .submenu-expandable .submenu-expandable-content").slideToggle(700);
      $(".lower-header .submenu-expandable .submenu-expandable-content").toggleClass("closed");
      $(".submenu-expandable").toggleClass("collapsed");

    });

    /**
     * Expandable list items on features page
     */
    $('.collapse').collapse({toggle: false});

    $('.collapse').on('show.bs.collapse', function (e) {

      //$('.lined-list li').find('.collapse.in').collapse('hide');
      $(e.target).parents('.lined-list').find('.collapse.in').collapse('hide');
    });

    $(".item-heading").on("click", function (e) {

        if (!$(e.target).hasClass("collapsed")) {
          $(e.target).next(".item-body").collapse('show');
          e.preventDefault();
          e.stopPropagation();
        }
      }
    );

    /**
     * Collapse faq answers
     */
    $('.collapse.faq-answer').on('show.bs.collapse', function (e) {
      $(e.target).parents('.faq-container').find('.collapse.in').collapse('hide');
    });

    $('.faq-question').click(function (e) {
      e.preventDefault();

      if ($(e.target).hasClass("collapsed")) {
        var currentQuestion = $(e.target).attr('href');
        window.location.hash = currentQuestion;
      }
      else {
        /*window.location.hash = '';*/
      }
    });
    /**
     * Hash navigation on faq page
     */
    if ($(".faq-tabs").length > 0) {
      if (window.location.hash != "") {
        var hash = window.location.hash;
        var tabName = $("a[href='" + hash + "']").parents('.item.tab-pane').attr("id");
        $("a[href='#" + tabName + "']").click();
        $("a[href='" + hash + "']").click();
        $('html,body').animate({scrollTop: $(hash).offset().top - 170}, 'slow');
      }
    }

    /**
     *  billing address email field input type TEMPORARY
     *  TODO: move to cuba js module
     */

    $('#edit-panes-billing-address-billing-ucxf-custom-field-email').attr('type', 'email');


    /**
     *  display total price with vat (uk only) TEMPORARY
     *  TODO: move to cuba js module
     *
     */
    if ($("#billing-pane").length > 0) {
      var billingAddressCountryField = $("select[id^=edit-panes-billing-address-billing-country]");
      var deliveryAddressCountryField = $("select[id^=edit-panes-delivery-delivery-country]");

      var country = billingAddressCountryField.length > 0 ? billingAddressCountryField.val() : deliveryAddressCountryField.val();
      var totalField = $(".total-price #subtotal-title + .uc-price");
      var totalWithoutVat = totalField.html().substring(1);
      totalWithoutVat = totalWithoutVat.replace(',', '');
      totalWithoutVat = parseFloat(totalWithoutVat);

      if (country == 826) {

        var rawTotal = totalField.html().substring(1);
        rawTotal = rawTotal.replace(',', '');
        rawTotal = parseFloat(rawTotal);
        var vatValue = (rawTotal / 5).toFixed(2);
        var newTotal = parseFloat(vatValue) + parseFloat(rawTotal);
        $(".subtotal.total-price").before('<tr class="odd vat-row"><td class="products vat-name" colspan="2">VAT</td><td class="price vat-value"><span class="uc-price">$' + vatValue + '</span></td> </tr>');
        totalField.html("$" + newTotal.toFixed(2));
        totalField.addClass("total-with-vat");
      }
      else {
        if ($(".vat-row").length > 0) {
          $(".vat-row").remove();
        }
        if (totalField.hasClass("total-with-vat")) {
          totalField.removeClass("total-with-vat");
          totalField.html("$" + totalWithoutVat.toFixed(2));
        }
      }

      $(billingAddressCountryField, deliveryAddressCountryField).change(function () {
        var country = billingAddressCountryField.length > 0 ? billingAddressCountryField.val() : deliveryAddressCountryField.val();

        if (country == 826) {
          var rawTotal = totalField.html();
          rawTotal = rawTotal.substring(1);
          rawTotal = rawTotal.replace(',', '');
          rawTotal = parseFloat(rawTotal);
          var vatValue = (rawTotal / 5).toFixed(2);
          var newTotal = parseFloat(vatValue) + parseFloat(rawTotal);
          $(".subtotal.total-price").before('<tr class="odd vat-row"><td class="products vat-name" colspan="2">VAT</td><td class="price vat-value"><span class="uc-price">$' + vatValue + '</span></td> </tr>');
          totalField.html("$" + newTotal.toFixed(2));
          totalField.addClass("total-with-vat");
        }
        else {
          if ($(".vat-row").length > 0) {
            $(".vat-row").remove();
          }
          if (totalField.hasClass("total-with-vat")) {
            totalField.removeClass("total-with-vat");
            totalField.html("$" + totalWithoutVat.toFixed(2));
          }

        }
      });
    }



    /**
     *  Useresponse: show topic's "responsible" property value to administrators
     *  hide "properties" if its content empty or invisible
     */

    if ($("#agents-navigation").length > 0) {
      $(".properties-block .employees-involved").show();
    }
    else {
      if (($(".properties-block > div").length < 2) && ($(".properties-block .employees-involved").length > 0)) {
        $(".sidebar-title:contains('Properties')").hide();
        $(".properties-block").hide();
      }
    }

    /**
     * Load relevant screenshot for each feature
     * upd: only for 1024+ screens
     */


    $('.collapse').on('shown.bs.collapse', function (e) {

      //if (window.innerWidth > 1023) {
      loadFeatureScreenshot(e.target);
      //}

    });

    function loadFeatureScreenshot(target) {
      var activeSubFeature = $(target).attr('id');
      var activeScreenshot = $(target).data("image");
      var sliderId = $(target).data("slider");
      var relName = $(target).attr('id');
      var nolightbox = $(target).data("nolightbox");

      if ((activeSubFeature != undefined) && (activeScreenshot != '') && (sliderId != undefined)) {

        if (activeScreenshot == 'empty') {
          sliderId = "#" + sliderId;

          $(sliderId + " a").fadeOut(200);
        }
        else {

          sliderId = "#" + sliderId;

          // $(sliderId + " a").fadeOut(200, function() {
          $(sliderId + " a").show();
          if (nolightbox) {

            $(sliderId + " a").removeClass("fancybox");
            $(sliderId + " a").addClass("inactive-link");
            $('.inactive-link').on("click", function (e) {
              e.preventDefault();
            });
          } else {
            $(sliderId + " a").removeClass("inactive-link");
            $(sliderId + " a").addClass("fancybox");
          }

          $(sliderId + " a").attr("rel", relName); //set rel attribute for fancybox gallery navigation
          $(sliderId + " a").attr("href", "/sites/default/files/images/" + activeScreenshot); //load big images
          $(sliderId + " img").attr("src", "/sites/default/files/styles/bootstrap_cuba__769_x_482/public/images/" + activeScreenshot); //load 769px wide images
          //$(sliderId + " a").fadeIn(250);
          //});

        }
      }
    }

    /**
     *  Frontpage features - attach css animations
     *
     */

    if ($(".frontpage-features").length > 0) {
      new WOW().init();
    }

    /** TODO delete
     *  Anchor links smooth scrolling


     function scrollToAnchor(aid) {
            var aTag = $("a[name='" + aid + "']");
            $('html,body').animate({scrollTop: aTag.offset().top - 170}, 'slow');
        }

     $("#anchor-development, #anchor-ui, #anchor-server-side, #anchor-additional, #anchor-deployment").click(function (e) {
            e.preventDefault();
            scrollToAnchor($(this).attr('id'));
        }); */


    /**
     * Scrollspy on features anchor
     */
    if ($("#features-anchors").length > 0) {
      $('body').scrollspy({target: '#features-anchors', offset: 250});
    }

    /**
     *  The Framework page, Development page - anchors, scrollspy and smooth scrolling
     */

    $('#features-anchors li').on('activate.bs.scrollspy', function (e) {
      var activelink = $(e.target).find("a").attr("href");
      activelink = activelink.substr(1);

      if (history.pushState) {
        history.pushState(null, null, '#' + activelink)
      }
      else {
        window.location.hash = activelink;
      }
    });

    function FrameworkScrollToAnchor(aid) {
      var aTag = $("a[name='" + aid + "']");
      if ($(".lower-header-sub-submenu").hasClass("affix")) {
        //alert("affix: " + aTag.offset().top);
        $('html,body').animate({scrollTop: aTag.offset().top - 217}, 'slow');
      }
      else {
        $('html,body').animate({scrollTop: aTag.offset().top - 280}, 'slow');
      }
    }

    $("#anchor-overview, #anchor-features, #anchor-technologies, #anchor-cubastudio, #anchor-ideplugins, #anchor-training, #anchor-enterprise-support, #anchor-consultancy, #anchor-bespoke-development").click(function (e) {
      e.preventDefault();
      FrameworkScrollToAnchor($(this).attr('id'));
    });

    $(".hash-link-local").click(function (e) {
      e.preventDefault();
      var link = $(this).attr('href').substr(1);
      link = "anchor-" + link;
      FrameworkScrollToAnchor(link);
    });


    if ($(".framework-overview").length > 0) {
      if (window.location.hash != "") {
        var hash = window.location.hash;
        var point = hash.substr(1);
        point = $("a[name='anchor-" + point + "']");
        $('html,body').animate({scrollTop: $(point).offset().top - 280}, 'slow');
      }
    }
    if ($(".development-tool-wrapper").length > 0) {
      if (window.location.hash != "") {
        var hash = window.location.hash;
        var point = hash.substr(1);
        point = $("a[name='anchor-" + point + "']");
        $('html,body').animate({scrollTop: $(point).offset().top - 280}, 'slow');
      }
    }
    if ($(".services-page-wrapper").length > 0) {
      if (window.location.hash != "") {
        var hash = window.location.hash;
        var point = hash.substr(1);
        point = $("a[name='anchor-" + point + "']");
        $('html,body').animate({scrollTop: $(point).offset().top - 280}, 'slow');
      }
    }
    if ($(".ac-cloud-deployment").length > 0) {
      if (window.location.hash != "") {
        var hash = window.location.hash;
        var point = hash.substr(1);
        point = $("a[name='" + point + "']");
        $('html,body').animate({scrollTop: $(point).offset().top - 280}, 'slow');
      }
    }

    /**
     * Scroll-to-top button for long pages
     */
    $(window).on('scroll', function () {
      var windowScrollPos = $(window).scrollTop();

      if (windowScrollPos > 2000) {
        $('.scrollTop').fadeIn();
      }
      else {
        $('.scrollTop').fadeOut();
      }

      $('.scrollTop').click(function () {
        $(window).scrollTop(0);
        return false;
      });

    });


    /**
     *  License agreement scrollbar
     */

    //nanoscroller
    if ($(".license-text").length > 0) {
      $(document).ready(function () {
        $(".nano").nanoScroller({
          alwaysVisible: true
        });
      });
    }

    /**
     *  Fixed bar on features page
     */

    if ($("#features-anchors").length > 0) {
      $('.lower-header-sub-submenu').affix({
        offset: {
          top: 145,
          bottom: 0
        }
      });
    }
    if ($("#redesign-features-anchors").length > 0) {
      $('.lower-header-sub-submenu').affix({
        offset: {
          top: 145,
          bottom: 0
        }
      });
    }

    /**
     *  Inactive links behaviour
     */

    $('.inactive-link, .fs-root-link').on("click", function (e) {
      e.preventDefault();
    });

    /**
     *  Popovers
     */
    if ($('.cuba-tooltip').length > 0) {
      var tooltipOptions = {
        trigger: "hover",
        delay: {
          show: 0,
          hide: 100
        },
        html: true
      };

      $('.cuba-tooltip').popover(tooltipOptions).click(function (e) {
        e.preventDefault();
      })
    }

    /**
     * Slick sliders on frontpage
     */

    if ($('#frontpage-presentation-slick').length > 0) {
      $('#frontpage-presentation-slick').slick({
        accessibility: false,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: false,
        infinite: true,
        speed: 1000,
        fade: true,
        cssEase: 'linear'
      });
    }

    /**
     * Slick slider for testimonials
     */

    if ($('.view-id-testimonials > .view-content').length > 0) {
      $('.view-id-testimonials > .view-content').slick({
        autoCenter : false,
        autoplay: false,
        arrows: false,
        infinite: true,
        speed: 300,
        fade: true,
        cssEase: 'linear'
      });
    }

    /**
     * Testimonials navigation reel handler
     */

    if ($('.view-id-testimonials_navigation').length > 0) {

      $('.view-id-testimonials_navigation .views-row:first-child .field-content').addClass("active");

      $('.view-id-testimonials_navigation .views-row .field-content').click(function(event) {

        $('.view-id-testimonials_navigation .views-row .field-content').removeClass("active");

        $(this).addClass("active");

        var nid = $(this).find("div").attr("id").substring(9);
        var slickIndex = $(".slick-slide.testimonial-" + nid).data("slick-index");
        $('.view-id-testimonials > .view-content').slick('slickGoTo', slickIndex);
      });
    }

    /**
     *  Testimonials swipe event handler
     */
    $('.view-id-testimonials > .view-content').on("swipe", function(event, slick, direction) {
      $('.view-id-testimonials_navigation .views-row .field-content').removeClass("active");
      var nid = $(".slick-current .testimonial-body").attr("id").substring(12);
      $("#portrait-" + nid).parents(".field-content").addClass("active");
    });


    /**
     *  Testimonials expand button handler
     */

    $('.view-id-testimonials_page .item .body a.testimonial-expand').click(function(e) {
      e.preventDefault();

      $(this).parents(".body").find("p.collapsed").show();
      $(this).parents("p").hide();
    });

    /**
     *  Placeholder for useresponse search
     */

    if ($(".mainArea #widget_welcome_message_14").length > 0) {
      var addPlaceholder = function() {
        placeholderApplyAttempts++;
        if ($(".gsc-search-box div.gsc-input-box input[type=text]").length > 0) {
          $(".gsc-search-box div.gsc-input-box input[type=text]").attr("placeholder", "Search Topics");
          clearInterval(placeholderInterval);
        }
        if (placeholderApplyAttempts > 30) {
          clearInterval(placeholderInterval);
        }
      };
      var placeholderApplyAttempts = 0;
      var placeholderInterval = setInterval(addPlaceholder, 2000);
    }

    /**
     *  Sample projects sidebar
     */

    function nameToLocationHash(name) {
      var locationHash = name.toLowerCase();
      locationHash = locationHash.replace(/&/gi, "and");
      locationHash = locationHash.replace(/[^A-Za-z0-9_ -]+/gi, "");
      locationHash = locationHash.replace(/  /gi, "-");
      locationHash = locationHash.replace(/ /gi, "-");
      return "#" + locationHash;
    }

    if ($(".view-id-sample_projects").length > 0) {
      var sampleProjects = $(".view-id-sample_projects");
      var sidebar = $(".view-id-sample_projects .view-header");
      var content =  $(".view-id-sample_projects .view-content");
      var items =  $(".view-id-sample_projects .view-content .item");
      var list = $(".view-id-sample_projects .view-header ul.samples-nav");
      var listItems = $(".view-id-sample_projects .view-header ul.samples-nav li");
      var links = $(".view-id-sample_projects .view-header ul.samples-nav li a");

      $(items).each(function(key, value) {
        $(this).addClass("item-" + key);
        var itemName =  $(this).find("h2").first().text();
        if (itemName != "") {
          var anchorLink = nameToLocationHash(itemName);
          var listItem = "<li><a href='" + anchorLink + "' id='link-item-" + key + "'>" + itemName + "</a></li>";
          $(list).append(listItem);
        }
      });

      $(sidebar).on("click", "li a", function(e) {
        //e.preventDefault();
        var itemId = $(this).attr("id").substring(10);
        $(list).find("a").removeClass("active");
        $(items).removeClass("active");

        $(this).addClass("active");
        $(content).find(".item-" + itemId).addClass("active");
      });

      //initialize block - display first item
      var first = $(list).find("li a").first();
      if(first.length > 0) {
        var firstId = $(first).attr("id").substring(10);
        $(first).addClass("active");
        $(content).find(".item-" + firstId).addClass("active");
      }
      //affix nav
      var sidebarContent =  $('.view-id-sample_projects .view-header .sidebar-content');
      if ((window.innerWidth > 1023) && (window.innerHeight > $(sidebarContent).outerHeight() + $("#header").outerHeight() + $(".lower-header").outerHeight())) {
        $(sidebarContent).affix({
          offset: {
            top: 176,
            bottom: $("#footer").outerHeight() + 40
          }
        });
      }

      //sample projects anchor links
      if ($(sidebar).length > 0) {
        if (window.location.hash != "") {
          $(".view-id-sample_projects .view-header a[href='" + window.location.hash + "']").click();
        }
        if ("onhashchange" in window) {
          window.addEventListener("hashchange",function(event) {
            if (window.location.hash != "") {
              var link = $(sidebar).find("a[href='" + window.location.hash + "']");
              if (!$(link).hasClass("active")) {
                setTimeout(function() {
                  $(link).click();
                }, 5);
              }
            }
            else {
              var first = $(list).find("li a").first();
              $(first).addClass("active");
              $(first).click();
            }
          });
        }
      }
    }



  });




  if (jQuery('.article.protected-download-v2 .protected-file-download-link .file a').length == 1) {
    setTimeout(function () {
      window.location.href = jQuery('.article.protected-download-v2 .protected-file-download-link .file a').attr('href');
    }, 1500);
  }
  else if (jQuery('.text-node .protected-file-download-link .file a').length == 1) {
    setTimeout(function () {
      window.location.href = jQuery('.page-node-download .protected-file-download-link .file a').attr('href');
    }, 1500);
  }

  /**
   *  Minimized menu button handler for screens < 830px
   */

  //enquire.register("screen and (max-width:1279px)", function() {


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


  //});

  /**
   * User menu button handler for 320px
   */

  //close nav menu when user menu expanded
  $('.header-options .btn-group').on('show.bs.dropdown', function () {
    if (window.innerWidth < 1280) {
      $(".header-menu").removeClass("expanded");
      $(".header-menu ul").hide();

      //morph nav menu into close button while user menu expanded
      $(".header-menu").addClass("expanded");
    }
  });

  $('.header-options .btn-group').on('hidden.bs.dropdown', function () {
    if (window.innerWidth < 1280) {
      $(".header-menu").removeClass("expanded");
    }

  });


  /**
   *  collapsible footer for screen width lesser than 1280px
   */

  if ((window.innerWidth <= 1270)) {
    //enquire.register("screen and (max-width:1270px)", function () {
    $(".menu-footer-sitemap > ul.footer_links_menu-footer-sitemap > li > a").on("click", function (event) {

      var listItem = $(event.target).parent();

      if (!$(listItem).hasClass("fs-no-children")) {
        $(".menu-footer-sitemap > ul.footer_links_menu-footer-sitemap > li").removeClass("expanded");
        $(listItem).addClass("expanded");
        return false;
      }
    });
    //});
  }


  /**
   *  BLOG: year and month dropdown filter [ 1024px - 10280px )
   */

  $("#block-views-blog-archive-block ul li").on("click", function (event) {

    if ((window.innerWidth < 1280) && (window.innerWidth > 319)) {
      if ($(event.target).hasClass("active")) {
        $("#block-views-blog-archive-block ul").toggleClass("expanded");

        if ($(event.target).prop("tagName") == "A") {
          $("#block-views-blog-archive-block ul").removeClass("expanded");
          event.preventDefault();
        }
      }

      else {

        if ($(event.target).prop("tagName") == "LI") {

          window.location.href = $(event.target).addClass("active");
          window.location.href = $(event.target).find("a").attr("href");
        }

      }
    }
  });

  $("body").on("click", function (event) {
    if ((window.innerWidth < 1280) && (window.innerWidth > 319)) {
      if ($(event.target).closest(".view-id-blog_archive.view-display-id-block").length < 1) {
        $("#block-views-blog-archive-block ul").removeClass("expanded");
      }
    }
  });


  /**
   * Disable modal login/register window links for screens < 768px
   */
  if (window.innerWidth < 768) {
    //enquire.register("screen and (max-width:768px)", function () {
      $("a.login-form-lost-password").unbind().attr("href", "/user/password").removeClass("ctools-use-modal");
      $(".register-lnk a.ctools-modal-ctools-ajax-register-style ").unbind().attr("href", "/user/register").removeClass("ctools-use-modal");
      $(".log-in-lnk a.ctools-modal-ctools-ajax-register-style ").unbind().attr("href", "/user").removeClass("ctools-use-modal");
      $(".navbar-sign-in a").unbind().attr("href", "/user").removeClass("ctools-use-modal");
    //});
  }

  /**
   * Disable modal login/register modal behavior on protected downloads for screens < 768px
   */
  if (window.innerWidth < 768) {
    //enquire.register("screen and (max-width:768px)", function () {
      $(".protected-download").unbind().removeClass("protected-download ctools-use-modal ctools-modal-ctools-ajax-register-style ctools-use-modal-processed");
      if (jQuery('body').hasClass('not-logged-in')) {
        jQuery('.node-add-to-cart').each(function () {
          var $this = jQuery(this);
          var dest = window.location.pathname;

          $this.click(function (event) {
            window.location.href = '/user';
            event.preventDefault();
          });
        });
      }
    //});
  }
})(jQuery);
;
