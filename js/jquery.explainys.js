(function($) {
  $.fn.explainys = function() {
  
  var defaults = { // Some options, that I cant get to work :(
            divClass: "explain_it",
            // divbg not used anymore
            divBackground: "oldlace",
            // borderradius not used anymore
            divBorderRadius: "4px",
            spanClass: ".explain",
            targetDiv: "#sidecontent"
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
    var $ltr = $this.height();
    // get the explain text in data-explain
    var $datatext = $this.data('explain');
    // Get the title text if given
    var $datatitle = $this.attr('title');
    // Set text if fail
    var $datatextfail = 'Nothing defined';
    // get the content of the span
    var $datatitle_fail = $this.text();



    // Insert reference number
        $('<sup />', {
            text: (index + 1)
        }).insertBefore($this);
	


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
                   $that.append('<p>' + $datatextfail + '</p>');
                }
            });// end each
            

    });// end each

};
        
})(jQuery);

