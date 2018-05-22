(function($){

  var cro_table__tooltip__boundary = $('.cro-table__tooltip__boundary');
  var tech_table__tooltip__boundary = $('.tech-table__tooltip__boundary');
  var tps_table__tooltip__boundary = $('.tps-table__tooltip__boundary');
  var open_tool_tip = 'open-tool-tip-';

$(window).on('resize', function() {
  dottedWidth();

});

 function tps_tooltipHover() {
    $('.cro-table__row').find('button').on('mouseenter', function(event) {
      if ($($(this)).next().find(cro_table__tooltip__boundary).hasClass(open_tool_tip + 'start')) {
        $($(this)).next().find(cro_table__tooltip__boundary).removeClass(open_tool_tip + 'start').addClass(open_tool_tip + 'active');
      } else if ($($(this)).next().find(cro_table__tooltip__boundary).hasClass('open-tool-tip-inactive')) {
        $($(this)).next().find(cro_table__tooltip__boundary).removeClass(open_tool_tip + 'inactive').addClass(open_tool_tip + 'active');
      }
    });

    $('.cro-table__row button').on('mouseleave', function(event) {
      if ($($(this)).next().find(cro_table__tooltip__boundary).hasClass(open_tool_tip + 'active')) {
        $($(this)).next().find(cro_table__tooltip__boundary).addClass(open_tool_tip + 'inactive').removeClass(open_tool_tip + 'active');
      }
    });

    $('.tech-table__row').find('button').on('mouseenter', function(event) {

      if ($($(this)).next().find(tech_table__tooltip__boundary).hasClass(open_tool_tip + 'start')) {
        $($(this)).next().find(tech_table__tooltip__boundary).removeClass(open_tool_tip + 'start').addClass(open_tool_tip + 'active');
      } else if ($($(this)).next().find(tech_table__tooltip__boundary).hasClass('open-tool-tip-inactive')) {
        $($(this)).next().find(tech_table__tooltip__boundary).removeClass(open_tool_tip + 'inactive').addClass(open_tool_tip + 'active');
      }
    });

    $('.tech-table__row').find('button').on('mouseleave', function(event) {
      if ($($(this)).next().find(tech_table__tooltip__boundary).hasClass(open_tool_tip + 'active')) {
        $($(this)).next().find(tech_table__tooltip__boundary).addClass(open_tool_tip + 'inactive').removeClass(open_tool_tip + 'active');
      }
    });


    $('.tps-table__row').find('button').on('mouseenter', function(event) {

      if ($($(this)).next().find(tps_table__tooltip__boundary).hasClass(open_tool_tip + 'start')) {
        $($(this)).next().find(tps_table__tooltip__boundary).removeClass(open_tool_tip + 'start').addClass(open_tool_tip + 'active');
      } else if ($($(this)).next().find(tps_table__tooltip__boundary).hasClass('open-tool-tip-inactive')) {
        $($(this)).next().find(tps_table__tooltip__boundary).removeClass(open_tool_tip + 'inactive').addClass(open_tool_tip + 'active');
      }
    });

    $('.tps-table__row').find('button').on('mouseleave', function(event) {
      if ($($(this)).next().find(tps_table__tooltip__boundary).hasClass(open_tool_tip + 'active')) {
        $($(this)).next().find(tps_table__tooltip__boundary).addClass(open_tool_tip + 'inactive').removeClass(open_tool_tip + 'active');
      }
    });

  }

  function tps_tooltipClick() {
    $('.cro-table__row').find('button').on('click', function(event) {
      if ($($(this)).next().find(cro_table__tooltip__boundary).hasClass(open_tool_tip + 'start')) {
        $($(this)).next().find(cro_table__tooltip__boundary).removeClass(open_tool_tip + 'start').addClass(open_tool_tip + 'active');
      } else if ($($(this)).next().find(cro_table__tooltip__boundary).hasClass(open_tool_tip + 'active')) {
        $($(this)).next().find(cro_table__tooltip__boundary).removeClass(open_tool_tip + 'active').addClass(open_tool_tip + 'inactive');
      } else if ($($(this)).next().find(cro_table__tooltip__boundary).hasClass(open_tool_tip + 'inactive')) {
        $($(this)).next().find(cro_table__tooltip__boundary).removeClass(open_tool_tip + 'inactive').addClass(open_tool_tip + 'active');
      }
    });

    $('.tech-table__row').find('button').on('click', function(event) {
      if ($($(this)).next().find(tech_table__tooltip__boundary).hasClass(open_tool_tip + 'start')) {
        $($(this)).next().find(tech_table__tooltip__boundary).removeClass(open_tool_tip + 'start').addClass(open_tool_tip + 'active');
      } else if ($($(this)).next().find(tech_table__tooltip__boundary).hasClass(open_tool_tip + 'active')) {
        $($(this)).next().find(tech_table__tooltip__boundary).addClass(open_tool_tip + 'inactive').removeClass(open_tool_tip + 'active');
      } else if ($($(this)).next().find(tech_table__tooltip__boundary).hasClass(open_tool_tip + 'inactive')) {
        $($(this)).next().find(tech_table__tooltip__boundary).removeClass(open_tool_tip + 'inactive').addClass(open_tool_tip + 'active');
      }
    });

    $('.tps-table__row').find('button').on('click', function(event) {
      if ($($(this)).next().find(tps_table__tooltip__boundary).hasClass(open_tool_tip + 'start')) {
        $($(this)).next().find(tps_table__tooltip__boundary).removeClass(open_tool_tip + 'start').addClass(open_tool_tip + 'active');
      } else if ($($(this)).next().find(tps_table__tooltip__boundary).hasClass(open_tool_tip + 'active')) {
        $($(this)).next().find(tps_table__tooltip__boundary).addClass(open_tool_tip + 'inactive').removeClass(open_tool_tip + 'active');
      } else if ($($(this)).next().find(tps_table__tooltip__boundary).hasClass(open_tool_tip + 'inactive')) {
        $($(this)).next().find(tps_table__tooltip__boundary).removeClass(open_tool_tip + 'inactive').addClass(open_tool_tip + 'active');
      }
    });
  }

  function tipToolSet() {
    if (window.matchMedia('(min-width: 769px)').matches) {
      tps_tooltipHover();
    }

    if (window.matchMedia('(max-width: 768px)').matches) {
      tps_tooltipClick();
    }
  }

    $(document).ready(function() {
      tipToolSet();
      dottedWidth();
    });

    function dottedWidth() {
      var croWidth = $('.cro-table__row__title').find('label').width();
      var techWidth = $('.tech-table__row__title').find('label').width();
      var tpsWidth = $('.tps-table__row__title').find('label').width();

      $('.cro-tps-dotted').css({
        "width": croWidth + "px"
      });

      $('.tech-tps-dotted').css({
        "width": techWidth + "px"
      });

      $('.tps-tps-dotted').css({
        "width": tpsWidth + "px"
      });

      if (window.matchMedia('(max-width: 768px)').matches) {
        $('.tps-table__row:has(button)').addClass('button_active');
        $('.cro-table__row:has(button)').addClass('button_active');
        $('.tech-table__row:has(button)').addClass('button_active');
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        $('.tps-table__row:has(button)').removeClass('button_active');
        $('.cro-table__row:has(button)').removeClass('button_active');
        $('.tech-table__row:has(button)').removeClass('button_active');
      }

    }

    setInterval(function() {
      if ($('.tech-table__tooltip').length) {
        if (window.matchMedia('(min-width: 768px)').matches) {
          $('.tech-table__row').find('.icon--half img').css({
            "border-bottom": "dotted 1px #FB8C00"
          });
        } else {
          $('.tech-table__row').find('.icon--half img').css({
            "border-bottom": "none"
          });
        }
      }

      if ($('.cro-table__tooltip').length) {
        if (window.matchMedia('(min-width: 768px)').matches) {
          $('.cro-table__row').find('.icon--half img').css({
            "border-bottom": "dotted 1px #FB8C00"
          });
        } else {
          $('.cro-table__row').find('.icon--half img').css({
            "border-bottom": "none"
          });
        }
      }

      if ($('.tps-table__tooltip').length) {
        if (window.matchMedia('(min-width: 768px)').matches) {
          $('.tps-table__row').find('.icon--half img').css({
            "border-bottom": "dotted 1px #FB8C00"
          });
        } else {
          $('.tps-table__row').find('.icon--half img').css({
            "border-bottom": "none"
          });
        }
      }

    }, 50);

})(jQuery);
