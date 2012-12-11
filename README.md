Version 0.1 Alpha Experimental

# explainys.js

jQuery plugin to add sidenotes for your articles. It might be described as the opposite to hover bubbles.

## Usage
Add plugin as usually done.

On every and any word you want to give a footnote add a <span> class around. Fill the span with;
* class='explain'
* data-title='your_title' (fallback to actual word in between span tags)
* data-explain='your_text' (if missing information text given)

Important information
* Implemented with html5 details element.
  Chrome 12 and up is the only browser that has full support for this element.
  No fallback methods implemented.
* This function is implemented with the help of html5 data- attribute and jQuery.
  Javascript enabled browser is a must.

