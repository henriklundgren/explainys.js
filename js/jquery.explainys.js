(function($) {
  $.fn.explainys = function() {
  
  var defaults = { // Some options, that I cant get to work :(
            divClass: "explain_it",
            divBackground: "oldlace",
            divBorderRadius: "4px",
            spanClass: ".explain",
            targetDiv: "#sidecontent"
        };
        var options = $.extend(defaults, options);
       
 		// loop/look through the text and find the html span element with
        // option spanClass. Which default is class explain.
        // Each time jQuery finds it do (function)... 
		$(options.spanClass).each(function(index, value) { //function here

            // Console output (how many span.explain found) for debugging
            // javascript is zerobased, +1 indicates that output should be plus one.
            console.log('span: ' + (index + 1));

            // Insert reference number before the word on every word
            // Common practice for footnotes.
            $('<sup>' + (index + 1) + '</sup>').insertBefore(this);
		
            // get the vertical position of the words and cache it
            var ptr = jQuery(this).position().top;
            // Output to console
            console.log('vertical position: ' + ptr + 'px');

            // get computed height of span/word
            // This is to precision position the div
            var $ltr = jQuery(this)
                .css('display', 'inline-block') // irrelevant setting, but nice
                .height();
            // Output to console
            console.log('Height of span: ' + $ltr + 'px');

            // get the explain text in data-explain
            var $datatext = $(this).data('explain');

            if ($datatext < 0) {
                $(this).text('Inget att visa');
            }
            

            // console output
            console.log('Text: ' + $datatext);

    	// append the divs and fill them with data

        // #1. Create a DIV 
    	$('<div />', {'class': options.divClass, 'css': {'top':'0'}})
            // #2. append the DIV(s) to a container
            .appendTo(options.targetDiv)
            // #3. fill the DIV(s) with data
            .html('<span>' + (index + 1) + '. ' + '</span>' + '<h6 style="font:bold 11px/1.4 Verdana; letter-spacing:0; display: inline;">' + $(this).attr('title') + '</h6>' + '<p style="font: normal 11px/1.3 Verdana; margin:0;">' + $datatext + '</p>')
            // #4. add some css to the DIV(s)
            // 3d with '-webkit-transform': 'skewY(10deg)', '-webkit-transform-style': 'preserve-3d', '-webkit-backface-visibility': 'hidden', 
            .css({'top': ptr -$ltr, 'border-radius': options.divBorderRadius, 'background-color': options.divBackground, 'border-right': 'medium solid grey', 'padding': '10', 'position':'absolute',})
            .click(function() {
                // Output to console
                console.log('hover');

                // apply background color
                $('.explain').wrap('<mark />');

            });


           
		});

};
        
})(jQuery);

