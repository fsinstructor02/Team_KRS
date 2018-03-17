/* global document */

'use strict';

import $ from 'jquery';

const utils = {

  /**
   * NOTE: Must include respond.js for matchMedia
   * polyfill.
   *
   * Creates a new matchMedia query and adds
   * an event listener so it will fire on
   * window resize.
   *
   * @param {String} query
   * @param {Function} callback
   */
  mediaQuery(query, callback) {
    if (!!matchMedia) {
      const mediaQuery = matchMedia(query);
      mediaQuery.addListener(callback);
      callback(mediaQuery);
    }
  },

  /**
   * Logs the User-Perceived page loading time.  Useful during development.
   */
  timing() {
    const now = new Date().getTime();
    const page_load_time = (now - window.performance.timing.navigationStart)/1000;
    log('User-perceived page loading time: %s seconds', page_load_time);
  },

  /**
   * Returns an absolute url, given a relative one
   * @param {String} url
   */
  getAbsoluteUrl(url) {
    if (!this.linkEl) {
      this.linkEl = document.createElement('a');
    }

    this.linkEl.href = url;
    return this.linkEl.href;
  },

  /**
   * Executes a function only once, even if it's called multiple times
   * @param {Function} fn
   * @param {Object} ctx
   */
  once(fn, ctx) {
    let result;

    return function() {
      if (fn) {
        result = fn.apply(ctx || this, arguments);
        fn = null;
      }

      return result;
    };
  },

  /**
   * Prevents execution of a function as long as it's being invoked.
   * The function will be called N milliseconds after it stops being invoked.
   * @param {Function} fn
   * @param {Number} wait
   * @param {Boolean} immediate
   */
  debounce(fn, wait, immediate) {
    let timeout;

    return function() {
      const ctx = this;
      const args = arguments;

      const later = function() {
        timeout = null;

        if (!immediate) {
          fn.apply(ctx, args);
        }
      };

      const callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) {
        fn.apply(ctx, args);
      }
    };
  },

  /**
   * Poll until a condition is met
   * @param {Function} fn
   * @param {Function} callback
   * @param {Function} errCallback
   * @param {Number} timeout
   * @param {Number} interval
   */
  poll(fn, callback, errCallback, timeout, interval) {
    const endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;

    (function p() {
      // If the condition is met, we're done
      if (fn()) {
        callback();
      }
      // If the condition isn't met but the timeout hasn't elapsed, go again
      else if (Number(new Date()) < endTime) {
        setTimeout(p, interval);
      }
      // Didn't match and too much time, reject!
      else {
        errCallback(new Error('timed out for ' + fn + ': ' + arguments));
      }
    })();
  },

  setGridHeight(element, context) {
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = [],
        $el,
        topPosition = 0;

    $(element).each(function() {

      $el = $(this, context);
      $el.height('auto');
      topPosition = $el.position().top;
      var currentDiv;

       if (currentRowStart !== topPosition) {

         // we just came to a new row.  Set all the heights on the completed row
         for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
           rowDivs[currentDiv].outerHeight(currentTallest);
         }

         // set the variables for the new row
         rowDivs.length = 0; // empty the array
         currentRowStart = topPosition;
         currentTallest = $el.outerHeight();
         rowDivs.push($el);

       } else {

         // another div on the current row.  Add it to the list and check if it's taller
         rowDivs.push($el);
         currentTallest = (currentTallest < $el.outerHeight()) ? ($el.outerHeight()) : (currentTallest);

      }
      // do the last row
       for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
         rowDivs[currentDiv].outerHeight(currentTallest);
       }
     });
  },

  setGridHeightTopToBot(element) {

    var maxHeights = [];
    var items = $(element).find('.node');
    var row = 1;

    items.each (
      function () {

        $(this).height('auto');

        if ( $(this).parent().hasClass('first') ) {
          row = 1;
        }

        if ( typeof(maxHeights[row]) === 'undefined' ) {
          maxHeights[row] = 0;
        }

        if ( $(this).height() > maxHeights[row] ) {

          maxHeights[row] = $(this).height();
        }

        $(this).addClass('height-row-' + row.toString());

        row++;
      }
    );

    for ( var j = 1; j < maxHeights.length; j++ ) {
      $('.height-row-' + j.toString() ).height( maxHeights[j] );
    }
  },

  // Accordion
  accordionInit(btnEl, contentContainer) {
    $(btnEl).unbind();
    $(contentContainer).unbind();

    $(btnEl).on('click', function(e){

      e.preventDefault();

      // $(btnEl).unbind();
      // $(contentContainer).unbind();

      // if (this) not already open
      if (!$(this).hasClass('active')) {

        // if another panel is open
        if ($(contentContainer).not($(this)).hasClass('active')) {

          $(contentContainer).not($(this).next()).slideUp(300);
        }
        $(btnEl).removeClass('active');
        $(contentContainer).removeClass('active');
        $(this).addClass('active');
        $(this).next().addClass('active');

        var btnElHeight = $(this).outerHeight();
        $(this).next().slideToggle(300, function() {
          // Scroll to top of active element
          $('html, body').animate({
              scrollTop: $(this).offset().top - btnElHeight
          }, 200);
          $(this).css('display', 'block');
        });

      // if (this) already open, just close
      } else {

        $(btnEl).removeClass('active');
        $(contentContainer).removeClass('active');
        $(this).next().slideUp(300);
      }

    });
  },

  accordionDestroy(btnEl, contentContainer) {
    $(btnEl).unbind();
    $(contentContainer)
      .unbind()
      .show();
  },

  videoConstrain(element, parent) {

    var $limelight_player = $(parent).find( $(element) );
    if ( $limelight_player.length > 0 ) {
      $limelight_player.each(
        function( index, elem ) {
          $(elem).width( $(elem).parents(parent).width() );
          $(elem).height( $(elem).width() * 0.562 ); //16:9 ratio
        }
      );
    }
  },

  /**
   * Generate an RGB object that corresponds to a hex value
   * Taken with some modification from http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
   * @param  {String} hex The hex value, with or without the #
   * @return {Array}      An array of integers in the format [red, green, blue]
   */
  hex2rgb(hex) {
    return hex
      // take care of shorthand color declarations
      .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
      // operate only on the actual long-form hex without the hash
      .substring(1)
      // take each two-character color code
      .match(/.{2}/g)
      // convert each code to an integer
      .map(x => parseInt(x, 16));
  },

  /**
   * Generate a hex string based on an array of RGB colors
   * Taken with some modifications from http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
   * @param  {Number} r The red component
   * @param  {Number} g The green component
   * @param  {Number} b The blue component
   * @return {String}   The hex value with leading #
   */
  rgb2hex(r, g, b) {
    return '#' + [r, g, b].map(x => {
      const hex = parseInt(x).toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    }).join('');
  },


};

export default utils;
