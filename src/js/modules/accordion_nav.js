import $ from 'jquery';
import utils from './utils.js';

/***
*  @function: Drupal.behaviors.tabs
*  @description:  Tab plugin
***/

class accordion_nav {
  static init(context) {

    var options = {
      'elBtnExpand' : $('.menu-collapsed__expand'),
      'elActiveTrail' : $('.menu-collapsed__menu li.active-trail')
    };

    // clear active trail classes
    $('.menu-collapsed__menu li').removeClass('active-parent');
    $('.menu-collapsed__menu button').removeClass('active-btn');

    // open active trail
    options.elActiveTrail.addClass('active-parent');
    options.elActiveTrail.find(' li.active-trail > .link-container > button').addClass('active-btn');
    options.elActiveTrail.find('li.active-trail > .sub-menu > ul').css('display', 'block');

    // add click event to all options.elBtnExpand
    $('body', context).once('process-menu', function () {

      // open active trail
      $('.menu-collapsed__menu ul ul li.active-parent > .sub-menu > ul').css('display', 'block');

      // event handler
      options.elBtnExpand.on('click', function() {
        var btn = $(this);
        var targetMenu = $(this).parent().next();
        var parentContainer = $(this).parent().parent();

        // if $this is active, close and gtfo
        if (btn.hasClass('active-btn')) {
          targetMenu.slideUp(300);
          btn.removeClass('active-btn');
          parentContainer.removeClass('active-parent');
          return;
        }

        // resize subtier expand buttons to the height of their <a>
        targetMenu.show();
        targetMenu.find($('button.expand')).each(function() {
          $(this).height($(this).prev().outerHeight() - 1);
        });
        targetMenu.hide();

        // if the btn clicked is not a child, close any other open menu at the same level
        if (parentContainer.siblings().hasClass('active-parent')) {
          parentContainer.siblings().find('.sub-menu').slideUp(300);
          parentContainer.siblings().removeClass('active-parent');
          parentContainer.siblings().find('button').removeClass('active-btn');
          parentContainer.siblings().find('li').removeClass('active-parent');
        }

        // open the target menu
        targetMenu.slideDown(300);
        parentContainer.addClass('active-parent');
        btn.addClass('active-btn');
      });

      // Hamburger button
      $('.hamburger').on('click', function(e) {
        e.preventDefault();
        $('.menu-collapsed__menu').addClass('active');
        $('.mobile-overlay').addClass('active');

        // resize top level expand buttons to the height of their <a>
        $('.menu-collapsed__menu button.expand').each(function() {
          $(this).height($(this).prev().outerHeight() - 1);
        });
      });

      // Mobile: close button
      $('.mobile-nav-close, .mobile-overlay').on('click', function(e) {
        e.preventDefault();
        $('.menu-collapsed__menu').removeClass('active');
        $('.mobile-overlay').removeClass('active');
      });

    });
  }
}

export { accordion_nav };