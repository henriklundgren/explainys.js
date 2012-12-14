/*!
 * jQuery Explainys Plugin v0.1
 *
 */

(function($) {
  $.fn.explainys = function() {
  
  var defaults = { // Some options
            // div class name - try to find a better name
            divClass: "explain_it",            
            // span name
            spanClass: ".explain",
            // where to place the div(s)?
            targetDiv: "#sidecontent",
            // text to show when no explanation given
            textFail: "Opps!!! Someone forgot to write the sidenote.&#9786;",
            // minus or plus the div position
            divPosition: 0,
            // class name for number on div
            divNumbers: "numbers",
            // details element open by default
            divOpen: "open",

        };
        var options = $.extend(defaults, options);
       



    // Create mark element.
    // Just to get the color value.
    $('<mark />', {
        text: 'test',
        id: 'xyz123'
    })
    .appendTo('body')
    .css({'position': 'absolute', 'left': '-9999'});
    mark = $('mark').css('background-color');
    $('#xyz123').remove();
    // console.log(mark);


    // #1.a My collision detection method!!!

    // Topvalue array
    var topvalue_arr = [];
    // Bottomvalue array
    var bottomvalue_arr = [];




    // Each time jQuery finds span... 
	$(options.spanClass).each(function(index, value, position) {

//---------------------------------[start scope/wall]---------------------------//
// variables can not leek outside this scope //


    var 
        // Only jump in the pool once.
        $this = $(this),
        // Get the vertical position.
        ptr = $this.position().top,
        // Get computed height of span/word.
        $ltr = $this.height() + options.divPosition,
        // Get the explain text in html5 data-explain.
        $datatext = $this.data('explain'),
        // Get the html5 data-title text if given.
        $datatitle = $this.data('title'),
        // Get the content of the span.
        $datatitle_fail = $this.text();

    
    // #1.b Collision detection method
    // Push top position to array
    topvalue_arr.push(ptr);
    
    

    // Reference number before span
    $('<sup />', {
        text: (index + 1),
        })
        
        // Dont let users select the ref number text (non-standard)
        .css({
            '-webkit-user-select': 'none',
            '-moz-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none',
            })
        
        // Insert ref number before the span
        .insertBefore($this);

	



    // Create html5 details element. (Limited support)
    $('<details />', {
        class: options.divClass,
        id: 'explainy_ref' + (index + 1),
        })

        // Options for the details default state
        .attr(options.divOpen, options.divOpen)
            
        // Append details element to target 
        .appendTo(options.targetDiv)
            
        // Position element
        // add after ptr -$ltr 
        .css({'top': ptr})
            


        // For each of the details element do this...
        .each(function(name, i) {

//---------------------------------[start scope/wall]---------------------------//
// variables can not leek outside this scope //
            

            

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
                        
                    // Do nothing
                    // console.log('Do nothing!');
                    } else {

                    // Else open the detail element
                    $(this).attr('open', 'open');
                    } // end if



                    $this
                    // Add color background when hovering
                    .css({'background-color': mark})

                    
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
                    .append('<summary>' + '<span>' + $datatitle + '</span>' + '</summary>');
                } else {
                    // Content of span
                    $that
                    .append('<summary>' + '<span>' + $datatitle_fail + '</span>' + '</summary>');
                }


                $that
                // Append ref. number on summary
                .find('summary')
                .append(number)
                .end()
                // Add class to title span
                .find('summary > span:first-child')
                .addClass('explainTitle');


                // Append text
                if (typeof $datatext !== 'undefined' && $datatext.length > 0) {
                    // Attribute data-explain
                    $that
                    .append('<p>' + $datatext + '</p>');
                } else {
                    // If non existing
                    $that
                    .append('<p>' + options.textFail + '</p>')
                    .removeAttr('open');
                }
                

                // Add link to sidenotes
                var linky = $that.attr('id'),
                    linky2 = $('<a />', {
                            class: 'explainLink',
                            text: 'Link',
                            href: '#' + linky,
                            });
                var maily = $('<a />', {
                            class: 'explainMail',
                            text: ' Share',
                            // Later it should facilitate some kind of sharing
                            href: '#',
                            });

                // Append the links
                $that.append(linky2).find('a.explainLink').wrap('<small>');
                
                $that.append(maily)
                    .find('a.explainMail')
                    .wrap('<small>')
                .on({
                    mouseenter: function() {
                        console.log('you are hovering mail link');
                       
                    },
                    mouseleave: function() {     
                    }
                });






                // #1.c Collision detection method
                // Push bottom position (top position + element height) to array
                bottomvalue_arr.push($(this).outerHeight() + ptr);

        

   

               // If bottomvalue is greater or equal then *any* following topvalue,...
        if (  bottomvalue_arr[0]  >=  topvalue_arr[1]  ) {
            console.log('It is greater, so I have to move it further down.');
            
            console.log('But now the bottomvalue is incorrect! I have to trigger a reload.');
            // bottomvalue_arr.length = 0;
            
                
        }





            }); // end each for detail element 
     

        });// end each for span element



        
     

console.log('topvalues: ' + topvalue_arr); // works!!!
console.log('bottomvalues: ' + bottomvalue_arr); // works!!!






};
        
})(jQuery);

