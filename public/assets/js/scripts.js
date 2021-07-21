(function ($) {
  "use strict";

  let mobileMenuIcon = $(".mobile-menu-icon");
  console.log("#");
  console.log(mobileMenuIcon);
  if (mobileMenuIcon.length) {
    mobileMenuIcon.on("click", function (e) {
      console.log("#3");
      e.preventDefault();
      $(this).toggleClass("open");
      $(".kpd-main-menu .nav-menu").slideToggle();
    });
  }
})(jQuery);
