/**
 * This uncompressed file is not referenced by the theme,
 * it is only included as a reference.
 *
 * If you need help with our code, contact us:
 * hello@altanddot.com
 */

theme.RotateHero = (function() {
  var options = window.rotateText;
  var index = 1;

  var selectors = {
    rotate: "[data-rotate]",
    scroll: "[data-scroll]"
  };

  function RotateHero(container) {
    var $container = (this.$container = $(container));
    var $rotate = $container.find(selectors.rotate);
    var $scroll = $container.find(selectors.scroll);

    function updateText() {
      $rotate.text(options[index]);
      if (index == options.length - 1) {
        index = 0;
      } else {
        index++;
      }
    }

    setInterval(updateText, 1200);

    // Scroll position depends on if the header is sticky or not, which is dependent on the window size.
    var height =
      $(window).width() > 750
        ? $("#shopify-section-1589343356114").offset().top - $(".site-header").outerHeight()
        : $("#shopify-section-1589343356114").offset().top;

    $scroll.click(function() {
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: height
        },
        500
      );
    });
  }

  return RotateHero;
})();

// Items in the lib folder will be compiled first. Put any dependencies your code depends on there.
$(document).ready(function() {
  var hero = $('[data-rotate-text-hero]');
  if (hero.length) {
    theme.RotateHero(hero);
  }
});
