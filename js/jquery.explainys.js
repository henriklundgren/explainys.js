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
       
 		// loop through the text and find the words
		$(options.spanClass).each(function(index, value) { //function here

        // Insert referencenumber before the word
        $('<sup>' + (index + 1) + '</sup>').insertBefore(this);
		
        // get the position of the words
		var ptr = jQuery(this).position();

        // get height of span and position it
        var $ltr = jQuery(this).height()*1;

        // get the height of div elements EXPERIMENTAL 
        var $htr = jQuery('.explain_it').outerHeight()*1.8;
        var $many = jQuery('div.explain_it').length+1;

        // default styles
        

    	// outputs result to console
    	console.log('span' + (index + 1) + ':' + $(this).attr('title') + $(this).attr('data') + ptr.top + 'amount' + $many + 'height' + $htr );

    	// append the divs and fill them with data
    	$('<div />', {'class': options.divClass, 'css': {'top':'0'}})
            .appendTo(options.targetDiv).html('<h6 style="font:bold 11px/1.4 Verdana; letter-spacing:0;">' + $(this).attr('title') + '</h6>' + '<p style="font: normal 11px/1.3 Verdana; margin:0;">' + $(this).attr('data') + '</p>' + '<small>' + (index + 1) + '</small>')
            .css({'top': ptr.top -$ltr, 'border-radius': options.divBorderRadius, 'background-color': options.divBackground, 'border-right': 'medium solid grey', 'padding': '10', 'position':'relative',});
		});

};
        
})(jQuery);

