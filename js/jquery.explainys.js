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
            textFail: "Someone forgot to write the sidenote",
            // minus or plus the div position
            divPosition: 0,
            // class name for number on div
            divNumbers: "numbers",
            // details element open by default
            divOpen: "open",

        };
        var options = $.extend(defaults, options);
       
 

    // Each time jQuery finds span... 
	$(options.spanClass).each(function(index, value, position) {


    // cache $this so it only jumps in the pool once
    var $this = $(this);
    // get the vertical position
    var ptr = $this.position().top;
    // get computed height of span/word
    var $ltr = $this.height() + options.divPosition;
    // get the explain text in data-explain
    var $datatext = $this.data('explain');
    // Get the title text if given
    var $datatitle = $this.data('title');
    // get the content of the span
    var $datatitle_fail = $this.text();


    // Insert reference number
        $('<sup />', {
            text: (index + 1)
        }).insertBefore($this);

	

        // Create html5 details element
        $('<details />', {
            class: options.divClass,
            id: 'special' + (index + 1),
            })

            // Options for the details default state
            .attr(options.divOpen, options.divOpen)
            
            // Append details element to target 
            .appendTo(options.targetDiv)
            
            // Position element
            .css({'top': ptr -$ltr})
            
            // For each of the details element do this...
            .each(function(name, i) {
                var $that = $(this);

                // Reference number
                var number = $('<span />', {
                    class: options.divNumbers,
                    text: (index + 1),
                    });
                


                // Highlight origin & expand/open details element  
                $that.on({
                    mouseenter: function() {
                    // console.log('open');

                    // If option divOpen set to open
                    if (options.divOpen == 'open') {
                        $(this).css({'z-index': '999'});
                    // Do nothing enter
                    // console.log('Do nothing!');
                    } else {

                    // Else open the detail element
                    $(this).attr('open', 'open').css({'z-index': '999'});
                    } // end if

                    $this
                    // Add color background when hovering
                    .css({'background-color': 'pink'})
                    
                    },
                    mouseleave: function() {
                        // console.log('closed');
                    
                        // If option divOpen set to open
                        if (options.divOpen == 'open') {

                        // Do nothing enter
                        //console.log('Do nothing!');
                        } else {

                        // Else open the detail element
                        $(this).removeAttr('open');
                        } // end if


                        $this
                        // Remove color background when not hovering
                        .css('background-color', 'transparent');

                    } // end function    

                }); // end jQuery on


                // Append title
                if (typeof $datatitle !== 'undefined' && $datatitle.length > 0) {
                    // Attribute title
                    $that
                    .append('<summary>' + '<span>' + $datatitle + '</span>' + '</summary>')
                    .find('summary > span:first-child').addClass('explainTitle');
                } else {
                    // Content of span
                    $that.append('<summary>' + $datatitle_fail + '</summary>');
                }

                // Append ref. number
                $that.find('summary').append(number);


                // Append text
                if (typeof $datatext !== 'undefined' && $datatext.length > 0) {
                    // Attribute data-explain
                    $that.append('<p>' + $datatext + '</p>');
                } else {
                    // If non existing
                    $that.append('<p>' + options.textFail + '</p>');
                }
                
                
            }); // end each  
     

        });// end each

};
        
})(jQuery);

