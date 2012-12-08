/*!
 * jQuery Explainys Plugin v0.1
 *
 */

(function($) {
  $.fn.explainys = function() {
  
  var defaults = { // Some options, that I cant get to work :(
            // div class name - try to find a better name
            divClass: "explain_it",            
            // span name
            spanClass: ".explain",
            // where to place the div(s)?
            targetDiv: "#sidecontent",
            // text to show when no explanation given
            textFail: "Nothing to show",
            // minus or plus the div position
            divPosition: +5,

        };
        var options = $.extend(defaults, options);
       
 

    // Each time jQuery finds span... 
	$(options.spanClass).each(function(index, value) {


    // cache $this so it only jumps in the pool once
    var $this = $(this);
    // get the vertical position
    var ptr = $this.position().top;
    // get computed height of span/word
    // This is to precision position the div
    var $ltr = $this.height() + options.divPosition;
    // get the explain text in data-explain
    var $datatext = $this.data('explain');
    // Get the title text if given
    var $datatitle = $this.attr('title');
    // get the content of the span
    var $datatitle_fail = $this.text();



    // Insert reference number
        $('<sup />', {
            text: (index + 1)
        }).insertBefore($this);

	// Read more/less
        var sylvie = $('<button />', {
            class: 'sylvie',
            text: 'show more',
            });

        // #1. Create DIV(s)
        $('<div />', {
            class: options.divClass,
            })
            // #2. append the DIV(s) to a container
            .appendTo(options.targetDiv)
            // #3. position the DIV(s)
            .css({'top': ptr -$ltr})
            // #4 for each of the div
            .each(function(){
                var $that = $(this);
                // number on div
                var number = $('<span />', {
                    class: 'numbers',
                    text: (index + 1),
                });
                // append index number
                $that.append(number);
                // highlight origin
                $that.on({
                    mouseenter: function() {
                        $this
                        // add css background
                        .css('background-color', '#DFF9AE')
                        // animate mouseenter
                        // (coloranimation not supported in vanilla jquery)
                        .animate({backgroundColor: '#DFF9AE'}, 'slow');
                    },
                    mouseleave: function() {
                        $this
                        // remove css background
                        .css('background-color', 'inherit');
                    }                    
                });
                // append title
                if (typeof $datatitle !== 'undefined' && $datatitle.length > 0) {
                    $that.append('<h6>' + $datatitle + '</h6>');
                } else {
                    $that.append('<h6>' + $datatitle_fail + '</h6>');
                }
                // append text
                if (typeof $datatext !== 'undefined' && $datatext.length > 0) {
                   $that.append('<p>' + $datatext + '</p>');
                } else {
                   $that.append('<p>' + options.textFail + '</p>');
                }
            })// end each

            // append truncate button div container
            .append($('<div />', {
                class: 'henke'
            })
            // append the actual html5 button
            .append(sylvie))
            // what happens when you push it?
            // not working because the context is the full div
            .on({
                mouseenter: function() {
                    console.log('hit');
                    $(this)
                    .parents().find('.explain_it > p')
                    // add css background
                    .css('max-height', 'auto')
                    // animate mouseenter
                    // (coloranimation not supported in vanilla jquery)
                    .animate({backgroundColor: '#DFF9AE'}, 'slow');
                    },
                    click: function() {
                    $(this)
                    // remove css background
                    .css('max-height', '30');
                    }

                    });
            

    });// end each

};
        
})(jQuery);

