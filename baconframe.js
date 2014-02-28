/*
 * baconframe.js v0.1
 * Designed by Klare Frank, @klare
 * Built by Joseph Abrahams, @josephabrahams
 */

(function($) {
  "use strict";

  $('img').each( function() {
    var img = new Image();
    img.src = $(this).attr('src');
    if ( img.width >= 16 && img.height >= 16) {
      $(this).attr( 'src', '//baconmockup.com/' + img.width + '/' + img.height + '/random');
    }
  });

  $('body').find(':not(img,script,iframe,embed,object)').each( function() {
    if( $(this).css('background-image') !== 'none' ) {
      var img = new Image();
      img.src = $(this).css('background-image').replace(/url\(|\)$/ig, "");
      if ( img.width >= 50 && img.height >= 50) {
        $(this).css('background-image', 'url(//baconmockup.com/' + img.width + '/' + img.height + '/random)');
      }
    }
  });

})(jQuery);