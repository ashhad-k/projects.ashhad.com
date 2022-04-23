/*!
 * Isotope PACKAGED v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.1
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'jquery-bridget/jquery-bridget',[ 'jquery' ], function( jQuery ) {
      return factory( window, jQuery );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('jquery')
    );
  } else {
    // browser global
    window.jQueryBridget = factory(
      window,
      window.jQuery
    );
  }

}( window, function factory( window, jQuery ) {
'use strict';

// ----- utils ----- //

var arraySlice = Array.prototype.slice;

// helper function for logging errors
// $.error breaks jQuery chaining
var console = window.console;
var logError = typeof console == 'undefined' ? function() {} :
  function( message ) {
    console.error( message );
  };

// ----- jQueryBridget ----- //

function jQueryBridget( namespace, PluginClass, $ ) {
  $ = $ || jQuery || window.jQuery;
  if ( !$ ) {
    return;
  }

  // add option method -> $().plugin('option', {...})
  if ( !PluginClass.prototype.option ) {
    // option setter
    PluginClass.prototype.option = function( opts ) {
      // bail out if not an object
      if ( !$.isPlainObject( opts ) ){
        return;
      }
      this.options = $.extend( true, this.options, opts );
    };
  }

  // make jQuery plugin
  $.fn[ namespace ] = function( arg0 /*, arg1 */ ) {
    if ( typeof arg0 == 'string' ) {
      // method call $().plugin( 'methodName', { options } )
      // shift arguments by 1
      var args = arraySlice.call( arguments, 1 );
      return methodCall( this, arg0, args );
    }
    // just $().plugin({ options })
    plainCall( this, arg0 );
    return this;
  };

  // $().plugin('methodName')
  function methodCall( $elems, methodName, args ) {
    var returnValue;
    var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

    $elems.each( function( i, elem ) {
      // get instance
      var instance = $.data( elem, namespace );
      if ( !instance ) {
        logError( namespace + ' not initialized. Cannot call methods, i.e. ' +
          pluginMethodStr );
        return;
      }

      var method = instance[ methodName ];
      if ( !method || methodName.charAt(0) == '_' ) {
        logError( pluginMethodStr + ' is not a valid method' );
        return;
      }

      // apply method, get return value
      var value = method.apply( instance, args );
      // set return value if value is returned, use only first value
      returnValue = returnValue === undefined ? value : returnValue;
    });

    return returnValue !== undefined ? returnValue : $elems;
  }

  function plainCall( $elems, options ) {
    $elems.each( function( i, elem ) {
      var instance = $.data( elem, namespace );
      if ( instance ) {
        // set options & init
        instance.option( options );
        instance._init();
      } else {
        // initialize new instance
        instance = new PluginClass( elem, options );
        $.data( elem, namespace, instance );
      }
    });
  }

  updateJQuery( $ );

}

// ----- updateJQuery ----- //

// set $.bridget for v1 backwards compatibility
function updateJQuery( $ ) {
  if ( !$ || ( $ && $.bridget ) ) {
    return;
  }
  $.bridget = jQueryBridget;
}

updateJQuery( jQuery || window.jQuery );

// -----  ----- //

return jQueryBridget;

}));

/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( 'ev-emitter/ev-emitter',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {



function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));

/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

( function( window, factory ) {
  /* jshint strict: false */ /* globals define, module */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'get-size/get-size',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See https://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * Chrome & Safari measure the outer-width on style.width on border-box elems
   * IE11 & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );
  // round value for browser zoom. desandro/masonry#928
  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
  getSize.isBoxSizeOuter = isBoxSizeOuter;

  body.removeChild( div );
}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});

/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'desandro-matches-selector/matches-selector',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));

/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'fizzy-ui-utils/utils',[
      'desandro-matches-selector/matches-selector'
    ], function( matchesSelector ) {
      return factory( window, matchesSelector );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}( window, function factory( window, matchesSelector ) {



var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }
  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) {
    return [];
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      return;
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    clearTimeout( timeout );

    var args = arguments;
    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( callback );
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));

/**
 * Outlayer Item
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( 'outlayer/item',[
        'ev-emitter/ev-emitter',
        'get-size/get-size'
      ],
      factory
    );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      require('ev-emitter'),
      require('get-size')
    );
  } else {
    // browser global
    window.Outlayer = {};
    window.Outlayer.Item = factory(
      window.EvEmitter,
      window.getSize
    );
  }

}( window, function factory( EvEmitter, getSize ) {
'use strict';

// ----- helpers ----- //

function isEmptyObj( obj ) {
  for ( var prop in obj ) {
    return false;
  }
  prop = null;
  return true;
}

// -------------------------- CSS3 support -------------------------- //


var docElemStyle = document.documentElement.style;

var transitionProperty = typeof docElemStyle.transition == 'string' ?
  'transition' : 'WebkitTransition';
var transformProperty = typeof docElemStyle.transform == 'string' ?
  'transform' : 'WebkitTransform';

var transitionEndEvent = {
  WebkitTransition: 'webkitTransitionEnd',
  transition: 'transitionend'
}[ transitionProperty ];

// cache all vendor properties that could have vendor prefix
var vendorProperties = {
  transform: transformProperty,
  transition: transitionProperty,
  transitionDuration: transitionProperty + 'Duration',
  transitionProperty: transitionProperty + 'Property',
  transitionDelay: transitionProperty + 'Delay'
};

// -------------------------- Item -------------------------- //

function Item( element, layout ) {
  if ( !element ) {
    return;
  }

  this.element = element;
  // parent layout class, i.e. Masonry, Isotope, or Packery
  this.layout = layout;
  this.position = {
    x: 0,
    y: 0
  };

  this._create();
}

// inherit EvEmitter
var proto = Item.prototype = Object.create( EvEmitter.prototype );
proto.constructor = Item;

proto._create = function() {
  // transition objects
  this._transn = {
    ingProperties: {},
    clean: {},
    onEnd: {}
  };

  this.css({
    position: 'absolute'
  });
};

// trigger specified handler for event type
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * apply CSS styles to element
 * @param {Object} style
 */
proto.css = function( style ) {
  var elemStyle = this.element.style;

  for ( var prop in style ) {
    // use vendor property if available
    var supportedProp = vendorProperties[ prop ] || prop;
    elemStyle[ supportedProp ] = style[ prop ];
  }
};

 // measure position, and sets it
proto.getPosition = function() {
  var style = getComputedStyle( this.element );
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  var xValue = style[ isOriginLeft ? 'left' : 'right' ];
  var yValue = style[ isOriginTop ? 'top' : 'bottom' ];
  var x = parseFloat( xValue );
  var y = parseFloat( yValue );
  // convert percent to pixels
  var layoutSize = this.layout.size;
  if ( xValue.indexOf('%') != -1 ) {
    x = ( x / 100 ) * layoutSize.width;
  }
  if ( yValue.indexOf('%') != -1 ) {
    y = ( y / 100 ) * layoutSize.height;
  }
  // clean up 'auto' or other non-integer values
  x = isNaN( x ) ? 0 : x;
  y = isNaN( y ) ? 0 : y;
  // remove padding from measurement
  x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
  y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

  this.position.x = x;
  this.position.y = y;
};

// set settled position, apply padding
proto.layoutPosition = function() {
  var layoutSize = this.layout.size;
  var style = {};
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');

  // x
  var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
  var xProperty = isOriginLeft ? 'left' : 'right';
  var xResetProperty = isOriginLeft ? 'right' : 'left';

  var x = this.position.x + layoutSize[ xPadding ];
  // set in percentage or pixels
  style[ xProperty ] = this.getXValue( x );
  // reset other property
  style[ xResetProperty ] = '';

  // y
  var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
  var yProperty = isOriginTop ? 'top' : 'bottom';
  var yResetProperty = isOriginTop ? 'bottom' : 'top';

  var y = this.position.y + layoutSize[ yPadding ];
  // set in percentage or pixels
  style[ yProperty ] = this.getYValue( y );
  // reset other property
  style[ yResetProperty ] = '';

  this.css( style );
  this.emitEvent( 'layout', [ this ] );
};

proto.getXValue = function( x ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && !isHorizontal ?
    ( ( x / this.layout.size.width ) * 100 ) + '%' : x + 'px';
};

proto.getYValue = function( y ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && isHorizontal ?
    ( ( y / this.layout.size.height ) * 100 ) + '%' : y + 'px';
};

proto._transitionTo = function( x, y ) {
  this.getPosition();
  // get current x & y from top/left
  var curX = this.position.x;
  var curY = this.position.y;

  var didNotMove = x == this.position.x && y == this.position.y;

  // save end position
  this.setPosition( x, y );

  // if did not move and not transitioning, just go to layout
  if ( didNotMove && !this.isTransitioning ) {
    this.layoutPosition();
    return;
  }

  var transX = x - curX;
  var transY = y - curY;
  var transitionStyle = {};
  transitionStyle.transform = this.getTranslate( transX, transY );

  this.transition({
    to: transitionStyle,
    onTransitionEnd: {
      transform: this.layoutPosition
    },
    isCleaning: true
  });
};

proto.getTranslate = function( x, y ) {
  // flip cooridinates if origin on right or bottom
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  x = isOriginLeft ? x : -x;
  y = isOriginTop ? y : -y;
  return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
};

// non transition + transform support
proto.goTo = function( x, y ) {
  this.setPosition( x, y );
  this.layoutPosition();
};

proto.moveTo = proto._transitionTo;

proto.setPosition = function( x, y ) {
  this.position.x = parseFloat( x );
  this.position.y = parseFloat( y );
};

// ----- transition ----- //

/**
 * @param {Object} style - CSS
 * @param {Function} onTransitionEnd
 */

// non transition, just trigger callback
proto._nonTransition = function( args ) {
  this.css( args.to );
  if ( args.isCleaning ) {
    this._removeStyles( args.to );
  }
  for ( var prop in args.onTransitionEnd ) {
    args.onTransitionEnd[ prop ].call( this );
  }
};

/**
 * proper transition
 * @param {Object} args - arguments
 *   @param {Object} to - style to transition to
 *   @param {Object} from - style to start transition from
 *   @param {Boolean} isCleaning - removes transition styles after transition
 *   @param {Function} onTransitionEnd - callback
 */
proto.transition = function( args ) {
  // redirect to nonTransition if no transition duration
  if ( !parseFloat( this.layout.options.transitionDuration ) ) {
    this._nonTransition( args );
    return;
  }

  var _transition = this._transn;
  // keep track of onTransitionEnd callback by css property
  for ( var prop in args.onTransitionEnd ) {
    _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
  }
  // keep track of properties that are transitioning
  for ( prop in args.to ) {
    _transition.ingProperties[ prop ] = true;
    // keep track of properties to clean up when transition is done
    if ( args.isCleaning ) {
      _transition.clean[ prop ] = true;
    }
  }

  // set from styles
  if ( args.from ) {
    this.css( args.from );
    // force redraw. http://blog.alexmaccaw.com/css-transitions
    var h = this.element.offsetHeight;
    // hack for JSHint to hush about unused var
    h = null;
  }
  // enable transition
  this.enableTransition( args.to );
  // set styles that are transitioning
  this.css( args.to );

  this.isTransitioning = true;

};

// dash before all cap letters, including first for
// WebkitTransform => -webkit-transform
function toDashedAll( str ) {
  return str.replace( /([A-Z])/g, function( $1 ) {
    return '-' + $1.toLowerCase();
  });
}

var transitionProps = 'opacity,' + toDashedAll( transformProperty );

proto.enableTransition = function(/* style */) {
  // HACK changing transitionProperty during a transition
  // will cause transition to jump
  if ( this.isTransitioning ) {
    return;
  }

  // make `transition: foo, bar, baz` from style object
  // HACK un-comment this when enableTransition can work
  // while a transition is happening
  // var transitionValues = [];
  // for ( var prop in style ) {
  //   // dash-ify camelCased properties like WebkitTransition
  //   prop = vendorProperties[ prop ] || prop;
  //   transitionValues.push( toDashedAll( prop ) );
  // }
  // munge number to millisecond, to match stagger
  var duration = this.layout.options.transitionDuration;
  duration = typeof duration == 'number' ? duration + 'ms' : duration;
  // enable transition styles
  this.css({
    transitionProperty: transitionProps,
    transitionDuration: duration,
    transitionDelay: this.staggerDelay || 0
  });
  // listen for transition end event
  this.element.addEventListener( transitionEndEvent, this, false );
};

// ----- events ----- //

proto.onwebkitTransitionEnd = function( event ) {
  this.ontransitionend( event );
};

proto.onotransitionend = function( event ) {
  this.ontransitionend( event );
};

// properties that I munge to make my life easier
var dashedVendorProperties = {
  '-webkit-transform': 'transform'
};

proto.ontransitionend = function( event ) {
  // disregard bubbled events from children
  if ( event.target !== this.element ) {
    return;
  }
  var _transition = this._transn;
  // get property name of transitioned property, convert to prefix-free
  var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;

  // remove property that has completed transitioning
  delete _transition.ingProperties[ propertyName ];
  // check if any properties are still transitioning
  if ( isEmptyObj( _transition.ingProperties ) ) {
    // all properties have completed transitioning
    this.disableTransition();
  }
  // clean style
  if ( propertyName in _transition.clean ) {
    // clean up style
    this.element.style[ event.propertyName ] = '';
    delete _transition.clean[ propertyName ];
  }
  // trigger onTransitionEnd callback
  if ( propertyName in _transition.onEnd ) {
    var onTransitionEnd = _transition.onEnd[ propertyName ];
    onTransitionEnd.call( this );
    delete _transition.onEnd[ propertyName ];
  }

  this.emitEvent( 'transitionEnd', [ this ] );
};

proto.disableTransition = function() {
  this.removeTransitionStyles();
  this.element.removeEventListener( transitionEndEvent, this, false );
  this.isTransitioning = false;
};

/**
 * removes style property from element
 * @param {Object} style
**/
proto._removeStyles = function( style ) {
  // clean up transition styles
  var cleanStyle = {};
  for ( var prop in style ) {
    cleanStyle[ prop ] = '';
  }
  this.css( cleanStyle );
};

var cleanTransitionStyle = {
  transitionProperty: '',
  transitionDuration: '',
  transitionDelay: ''
};

proto.removeTransitionStyles = function() {
  // remove transition
  this.css( cleanTransitionStyle );
};

// ----- stagger ----- //

proto.stagger = function( delay ) {
  delay = isNaN( delay ) ? 0 : delay;
  this.staggerDelay = delay + 'ms';
};

// ----- show/hide/remove ----- //

// remove element from DOM
proto.removeElem = function() {
  this.element.parentNode.removeChild( this.element );
  // remove display: none
  this.css({ display: '' });
  this.emitEvent( 'remove', [ this ] );
};

proto.remove = function() {
  // just remove element if no transition support or no transition
  if ( !transitionProperty || !parseFloat( this.layout.options.transitionDuration ) ) {
    this.removeElem();
    return;
  }

  // start transition
  this.once( 'transitionEnd', function() {
    this.removeElem();
  });
  this.hide();
};

proto.reveal = function() {
  delete this.isHidden;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onRevealTransitionEnd;

  this.transition({
    from: options.hiddenStyle,
    to: options.visibleStyle,
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onRevealTransitionEnd = function() {
  // check if still visible
  // during transition, item may have been hidden
  if ( !this.isHidden ) {
    this.emitEvent('reveal');
  }
};

/**
 * get style property use for hide/reveal transition end
 * @param {String} styleProperty - hiddenStyle/visibleStyle
 * @returns {String}
 */
proto.getHideRevealTransitionEndProperty = function( styleProperty ) {
  var optionStyle = this.layout.options[ styleProperty ];
  // use opacity
  if ( optionStyle.opacity ) {
    return 'opacity';
  }
  // get first property
  for ( var prop in optionStyle ) {
    return prop;
  }
};

proto.hide = function() {
  // set flag
  this.isHidden = true;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onHideTransitionEnd;

  this.transition({
    from: options.visibleStyle,
    to: options.hiddenStyle,
    // keep hidden stuff hidden
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onHideTransitionEnd = function() {
  // check if still hidden
  // during transition, item may have been un-hidden
  if ( this.isHidden ) {
    this.css({ display: 'none' });
    this.emitEvent('hide');
  }
};

proto.destroy = function() {
  this.css({
    position: '',
    left: '',
    right: '',
    top: '',
    bottom: '',
    transition: '',
    transform: ''
  });
};

return Item;

}));

/*!
 * Outlayer v2.1.1
 * the brains and guts of a layout library
 * MIT license
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( 'outlayer/outlayer',[
        'ev-emitter/ev-emitter',
        'get-size/get-size',
        'fizzy-ui-utils/utils',
        './item'
      ],
      function( EvEmitter, getSize, utils, Item ) {
        return factory( window, EvEmitter, getSize, utils, Item);
      }
    );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      window,
      require('ev-emitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./item')
    );
  } else {
    // browser global
    window.Outlayer = factory(
      window,
      window.EvEmitter,
      window.getSize,
      window.fizzyUIUtils,
      window.Outlayer.Item
    );
  }

}( window, function factory( window, EvEmitter, getSize, utils, Item ) {
'use strict';

// ----- vars ----- //

var console = window.console;
var jQuery = window.jQuery;
var noop = function() {};

// -------------------------- Outlayer -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Outlayer intances
var instances = {};


/**
 * @param {Element, String} element
 * @param {Object} options
 * @constructor
 */
function Outlayer( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for ' + this.constructor.namespace +
        ': ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // add id for Outlayer.getFromElement
  var id = ++GUID;
  this.element.outlayerGUID = id; // expando
  instances[ id ] = this; // associate via id

  // kick it off
  this._create();

  var isInitLayout = this._getOption('initLayout');
  if ( isInitLayout ) {
    this.layout();
  }
}

// settings are for internal use only
Outlayer.namespace = 'outlayer';
Outlayer.Item = Item;

// default options
Outlayer.defaults = {
  containerStyle: {
    position: 'relative'
  },
  initLayout: true,
  originLeft: true,
  originTop: true,
  resize: true,
  resizeContainer: true,
  // item options
  transitionDuration: '0.4s',
  hiddenStyle: {
    opacity: 0,
    transform: 'scale(0.001)'
  },
  visibleStyle: {
    opacity: 1,
    transform: 'scale(1)'
  }
};

var proto = Outlayer.prototype;
// inherit EvEmitter
utils.extend( proto, EvEmitter.prototype );

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

/**
 * get backwards compatible option value, check old name
 */
proto._getOption = function( option ) {
  var oldOption = this.constructor.compatOptions[ option ];
  return oldOption && this.options[ oldOption ] !== undefined ?
    this.options[ oldOption ] : this.options[ option ];
};

Outlayer.compatOptions = {
  // currentName: oldName
  initLayout: 'isInitLayout',
  horizontal: 'isHorizontal',
  layoutInstant: 'isLayoutInstant',
  originLeft: 'isOriginLeft',
  originTop: 'isOriginTop',
  resize: 'isResizeBound',
  resizeContainer: 'isResizingContainer'
};

proto._create = function() {
  // get items from children
  this.reloadItems();
  // elements that affect layout, but are not laid out
  this.stamps = [];
  this.stamp( this.options.stamp );
  // set container style
  utils.extend( this.element.style, this.options.containerStyle );

  // bind resize method
  var canBindResize = this._getOption('resize');
  if ( canBindResize ) {
    this.bindResize();
  }
};

// goes through all children again and gets bricks in proper order
proto.reloadItems = function() {
  // collection of item elements
  this.items = this._itemize( this.element.children );
};


/**
 * turn elements into Outlayer.Items to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Outlayer Items
 */
proto._itemize = function( elems ) {

  var itemElems = this._filterFindItemElements( elems );
  var Item = this.constructor.Item;

  // create new Outlayer Items for collection
  var items = [];
  for ( var i=0; i < itemElems.length; i++ ) {
    var elem = itemElems[i];
    var item = new Item( elem, this );
    items.push( item );
  }

  return items;
};

/**
 * get item elements to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - item elements
 */
proto._filterFindItemElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.itemSelector );
};

/**
 * getter method for getting item elements
 * @returns {Array} elems - collection of item elements
 */
proto.getItemElements = function() {
  return this.items.map( function( item ) {
    return item.element;
  });
};

// ----- init & layout ----- //

/**
 * lays out all items
 */
proto.layout = function() {
  this._resetLayout();
  this._manageStamps();

  // don't animate first layout
  var layoutInstant = this._getOption('layoutInstant');
  var isInstant = layoutInstant !== undefined ?
    layoutInstant : !this._isLayoutInited;
  this.layoutItems( this.items, isInstant );

  // flag for initalized
  this._isLayoutInited = true;
};

// _init is alias for layout
proto._init = proto.layout;

/**
 * logic before any new layout
 */
proto._resetLayout = function() {
  this.getSize();
};


proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * get measurement from option, for columnWidth, rowHeight, gutter
 * if option is String -> get element from selector string, & get size of element
 * if option is Element -> get size of element
 * else use option as a number
 *
 * @param {String} measurement
 * @param {String} size - width or height
 * @private
 */
proto._getMeasurement = function( measurement, size ) {
  var option = this.options[ measurement ];
  var elem;
  if ( !option ) {
    // default to 0
    this[ measurement ] = 0;
  } else {
    // use option as an element
    if ( typeof option == 'string' ) {
      elem = this.element.querySelector( option );
    } else if ( option instanceof HTMLElement ) {
      elem = option;
    }
    // use size of element, if element
    this[ measurement ] = elem ? getSize( elem )[ size ] : option;
  }
};

/**
 * layout a collection of item elements
 * @api public
 */
proto.layoutItems = function( items, isInstant ) {
  items = this._getItemsForLayout( items );

  this._layoutItems( items, isInstant );

  this._postLayout();
};

/**
 * get the items to be laid out
 * you may want to skip over some items
 * @param {Array} items
 * @returns {Array} items
 */
proto._getItemsForLayout = function( items ) {
  return items.filter( function( item ) {
    return !item.isIgnored;
  });
};

/**
 * layout items
 * @param {Array} items
 * @param {Boolean} isInstant
 */
proto._layoutItems = function( items, isInstant ) {
  this._emitCompleteOnItems( 'layout', items );

  if ( !items || !items.length ) {
    // no items, emit event with empty array
    return;
  }

  var queue = [];

  items.forEach( function( item ) {
    // get x/y object from method
    var position = this._getItemLayoutPosition( item );
    // enqueue
    position.item = item;
    position.isInstant = isInstant || item.isLayoutInstant;
    queue.push( position );
  }, this );

  this._processLayoutQueue( queue );
};

/**
 * get item layout position
 * @param {Outlayer.Item} item
 * @returns {Object} x and y position
 */
proto._getItemLayoutPosition = function( /* item */ ) {
  return {
    x: 0,
    y: 0
  };
};

/**
 * iterate over array and position each item
 * Reason being - separating this logic prevents 'layout invalidation'
 * thx @paul_irish
 * @param {Array} queue
 */
proto._processLayoutQueue = function( queue ) {
  this.updateStagger();
  queue.forEach( function( obj, i ) {
    this._positionItem( obj.item, obj.x, obj.y, obj.isInstant, i );
  }, this );
};

// set stagger from option in milliseconds number
proto.updateStagger = function() {
  var stagger = this.options.stagger;
  if ( stagger === null || stagger === undefined ) {
    this.stagger = 0;
    return;
  }
  this.stagger = getMilliseconds( stagger );
  return this.stagger;
};

/**
 * Sets position of item in DOM
 * @param {Outlayer.Item} item
 * @param {Number} x - horizontal position
 * @param {Number} y - vertical position
 * @param {Boolean} isInstant - disables transitions
 */
proto._positionItem = function( item, x, y, isInstant, i ) {
  if ( isInstant ) {
    // if not transition, just set CSS
    item.goTo( x, y );
  } else {
    item.stagger( i * this.stagger );
    item.moveTo( x, y );
  }
};

/**
 * Any logic you want to do after each layout,
 * i.e. size the container
 */
proto._postLayout = function() {
  this.resizeContainer();
};

proto.resizeContainer = function() {
  var isResizingContainer = this._getOption('resizeContainer');
  if ( !isResizingContainer ) {
    return;
  }
  var size = this._getContainerSize();
  if ( size ) {
    this._setContainerMeasure( size.width, true );
    this._setContainerMeasure( size.height, false );
  }
};

/**
 * Sets width or height of container if returned
 * @returns {Object} size
 *   @param {Number} width
 *   @param {Number} height
 */
proto._getContainerSize = noop;

/**
 * @param {Number} measure - size of width or height
 * @param {Boolean} isWidth
 */
proto._setContainerMeasure = function( measure, isWidth ) {
  if ( measure === undefined ) {
    return;
  }

  var elemSize = this.size;
  // add padding and border width if border box
  if ( elemSize.isBorderBox ) {
    measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
      elemSize.borderLeftWidth + elemSize.borderRightWidth :
      elemSize.paddingBottom + elemSize.paddingTop +
      elemSize.borderTopWidth + elemSize.borderBottomWidth;
  }

  measure = Math.max( measure, 0 );
  this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
};

/**
 * emit eventComplete on a collection of items events
 * @param {String} eventName
 * @param {Array} items - Outlayer.Items
 */
proto._emitCompleteOnItems = function( eventName, items ) {
  var _this = this;
  function onComplete() {
    _this.dispatchEvent( eventName + 'Complete', null, [ items ] );
  }

  var count = items.length;
  if ( !items || !count ) {
    onComplete();
    return;
  }

  var doneCount = 0;
  function tick() {
    doneCount++;
    if ( doneCount == count ) {
      onComplete();
    }
  }

  // bind callback
  items.forEach( function( item ) {
    item.once( eventName, tick );
  });
};

/**
 * emits events via EvEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  // add original event to arguments
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery ) {
    // set this.$element
    this.$element = this.$element || jQuery( this.element );
    if ( event ) {
      // create jQuery event
      var $event = jQuery.Event( event );
      $event.type = type;
      this.$element.trigger( $event, args );
    } else {
      // just trigger with type if no event available
      this.$element.trigger( type, args );
    }
  }
};

// -------------------------- ignore & stamps -------------------------- //


/**
 * keep item in collection, but do not lay it out
 * ignored items do not get skipped in layout
 * @param {Element} elem
 */
proto.ignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    item.isIgnored = true;
  }
};

/**
 * return item to layout collection
 * @param {Element} elem
 */
proto.unignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    delete item.isIgnored;
  }
};

/**
 * adds elements to stamps
 * @param {NodeList, Array, Element, or String} elems
 */
proto.stamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ) {
    return;
  }

  this.stamps = this.stamps.concat( elems );
  // ignore
  elems.forEach( this.ignore, this );
};

/**
 * removes elements to stamps
 * @param {NodeList, Array, or Element} elems
 */
proto.unstamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ){
    return;
  }

  elems.forEach( function( elem ) {
    // filter out removed stamp elements
    utils.removeFrom( this.stamps, elem );
    this.unignore( elem );
  }, this );
};

/**
 * finds child elements
 * @param {NodeList, Array, Element, or String} elems
 * @returns {Array} elems
 */
proto._find = function( elems ) {
  if ( !elems ) {
    return;
  }
  // if string, use argument as selector string
  if ( typeof elems == 'string' ) {
    elems = this.element.querySelectorAll( elems );
  }
  elems = utils.makeArray( elems );
  return elems;
};

proto._manageStamps = function() {
  if ( !this.stamps || !this.stamps.length ) {
    return;
  }

  this._getBoundingRect();

  this.stamps.forEach( this._manageStamp, this );
};

// update boundingLeft / Top
proto._getBoundingRect = function() {
  // get bounding rect for container element
  var boundingRect = this.element.getBoundingClientRect();
  var size = this.size;
  this._boundingRect = {
    left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
    top: boundingRect.top + size.paddingTop + size.borderTopWidth,
    right: boundingRect.right - ( size.paddingRight + size.borderRightWidth ),
    bottom: boundingRect.bottom - ( size.paddingBottom + size.borderBottomWidth )
  };
};

/**
 * @param {Element} stamp
**/
proto._manageStamp = noop;

/**
 * get x/y position of element relative to container element
 * @param {Element} elem
 * @returns {Object} offset - has left, top, right, bottom
 */
proto._getElementOffset = function( elem ) {
  var boundingRect = elem.getBoundingClientRect();
  var thisRect = this._boundingRect;
  var size = getSize( elem );
  var offset = {
    left: boundingRect.left - thisRect.left - size.marginLeft,
    top: boundingRect.top - thisRect.top - size.marginTop,
    right: thisRect.right - boundingRect.right - size.marginRight,
    bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
  };
  return offset;
};

// -------------------------- resize -------------------------- //

// enable event handlers for listeners
// i.e. resize -> onresize
proto.handleEvent = utils.handleEvent;

/**
 * Bind layout to window resizing
 */
proto.bindResize = function() {
  window.addEventListener( 'resize', this );
  this.isResizeBound = true;
};

/**
 * Unbind layout to window resizing
 */
proto.unbindResize = function() {
  window.removeEventListener( 'resize', this );
  this.isResizeBound = false;
};

proto.onresize = function() {
  this.resize();
};

utils.debounceMethod( Outlayer, 'onresize', 100 );

proto.resize = function() {
  // don't trigger if size did not change
  // or if resize was unbound. See #9
  if ( !this.isResizeBound || !this.needsResizeLayout() ) {
    return;
  }

  this.layout();
};

/**
 * check if layout is needed post layout
 * @returns Boolean
 */
proto.needsResizeLayout = function() {
  var size = getSize( this.element );
  // check that this.size and size are there
  // IE8 triggers resize on body size change, so they might not be
  var hasSizes = this.size && size;
  return hasSizes && size.innerWidth !== this.size.innerWidth;
};

// -------------------------- methods -------------------------- //

/**
 * add items to Outlayer instance
 * @param {Array or NodeList or Element} elems
 * @returns {Array} items - Outlayer.Items
**/
proto.addItems = function( elems ) {
  var items = this._itemize( elems );
  // add items to collection
  if ( items.length ) {
    this.items = this.items.concat( items );
  }
  return items;
};

/**
 * Layout newly-appended item elements
 * @param {Array or NodeList or Element} elems
 */
proto.appended = function( elems ) {
  var items = this.addItems( elems );
  if ( !items.length ) {
    return;
  }
  // layout and reveal just the new items
  this.layoutItems( items, true );
  this.reveal( items );
};

/**
 * Layout prepended elements
 * @param {Array or NodeList or Element} elems
 */
proto.prepended = function( elems ) {
  var items = this._itemize( elems );
  if ( !items.length ) {
    return;
  }
  // add items to beginning of collection
  var previousItems = this.items.slice(0);
  this.items = items.concat( previousItems );
  // start new layout
  this._resetLayout();
  this._manageStamps();
  // layout new stuff without transition
  this.layoutItems( items, true );
  this.reveal( items );
  // layout previous items
  this.layoutItems( previousItems );
};

/**
 * reveal a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.reveal = function( items ) {
  this._emitCompleteOnItems( 'reveal', items );
  if ( !items || !items.length ) {
    return;
  }
  var stagger = this.updateStagger();
  items.forEach( function( item, i ) {
    item.stagger( i * stagger );
    item.reveal();
  });
};

/**
 * hide a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.hide = function( items ) {
  this._emitCompleteOnItems( 'hide', items );
  if ( !items || !items.length ) {
    return;
  }
  var stagger = this.updateStagger();
  items.forEach( function( item, i ) {
    item.stagger( i * stagger );
    item.hide();
  });
};

/**
 * reveal item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.revealItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.reveal( items );
};

/**
 * hide item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.hideItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.hide( items );
};

/**
 * get Outlayer.Item, given an Element
 * @param {Element} elem
 * @param {Function} callback
 * @returns {Outlayer.Item} item
 */
proto.getItem = function( elem ) {
  // loop through items to get the one that matches
  for ( var i=0; i < this.items.length; i++ ) {
    var item = this.items[i];
    if ( item.element == elem ) {
      // return item
      return item;
    }
  }
};

/**
 * get collection of Outlayer.Items, given Elements
 * @param {Array} elems
 * @returns {Array} items - Outlayer.Items
 */
proto.getItems = function( elems ) {
  elems = utils.makeArray( elems );
  var items = [];
  elems.forEach( function( elem ) {
    var item = this.getItem( elem );
    if ( item ) {
      items.push( item );
    }
  }, this );

  return items;
};

/**
 * remove element(s) from instance and DOM
 * @param {Array or NodeList or Element} elems
 */
proto.remove = function( elems ) {
  var removeItems = this.getItems( elems );

  this._emitCompleteOnItems( 'remove', removeItems );

  // bail if no items to remove
  if ( !removeItems || !removeItems.length ) {
    return;
  }

  removeItems.forEach( function( item ) {
    item.remove();
    // remove item from collection
    utils.removeFrom( this.items, item );
  }, this );
};

// ----- destroy ----- //

// remove and disable Outlayer instance
proto.destroy = function() {
  // clean up dynamic styles
  var style = this.element.style;
  style.height = '';
  style.position = '';
  style.width = '';
  // destroy items
  this.items.forEach( function( item ) {
    item.destroy();
  });

  this.unbindResize();

  var id = this.element.outlayerGUID;
  delete instances[ id ]; // remove reference to instance by id
  delete this.element.outlayerGUID;
  // remove data for jQuery
  if ( jQuery ) {
    jQuery.removeData( this.element, this.constructor.namespace );
  }

};

// -------------------------- data -------------------------- //

/**
 * get Outlayer instance from element
 * @param {Element} elem
 * @returns {Outlayer}
 */
Outlayer.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.outlayerGUID;
  return id && instances[ id ];
};


// -------------------------- create Outlayer class -------------------------- //

/**
 * create a layout class
 * @param {String} namespace
 */
Outlayer.create = function( namespace, options ) {
  // sub-class Outlayer
  var Layout = subclass( Outlayer );
  // apply new options and compatOptions
  Layout.defaults = utils.extend( {}, Outlayer.defaults );
  utils.extend( Layout.defaults, options );
  Layout.compatOptions = utils.extend( {}, Outlayer.compatOptions  );

  Layout.namespace = namespace;

  Layout.data = Outlayer.data;

  // sub-class Item
  Layout.Item = subclass( Item );

  // -------------------------- declarative -------------------------- //

  utils.htmlInit( Layout, namespace );

  // -------------------------- jQuery bridge -------------------------- //

  // make into jQuery plugin
  if ( jQuery && jQuery.bridget ) {
    jQuery.bridget( namespace, Layout );
  }

  return Layout;
};

function subclass( Parent ) {
  function SubClass() {
    Parent.apply( this, arguments );
  }

  SubClass.prototype = Object.create( Parent.prototype );
  SubClass.prototype.constructor = SubClass;

  return SubClass;
}

// ----- helpers ----- //

// how many milliseconds are in each unit
var msUnits = {
  ms: 1,
  s: 1000
};

// munge time-like parameter into millisecond number
// '0.4s' -> 40
function getMilliseconds( time ) {
  if ( typeof time == 'number' ) {
    return time;
  }
  var matches = time.match( /(^\d*\.?\d*)(\w*)/ );
  var num = matches && matches[1];
  var unit = matches && matches[2];
  if ( !num.length ) {
    return 0;
  }
  num = parseFloat( num );
  var mult = msUnits[ unit ] || 1;
  return num * mult;
}

// ----- fin ----- //

// back in global
Outlayer.Item = Item;

return Outlayer;

}));

/**
 * Isotope Item
**/

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'isotope-layout/js/item',[
        'outlayer/outlayer'
      ],
      factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('outlayer')
    );
  } else {
    // browser global
    window.Isotope = window.Isotope || {};
    window.Isotope.Item = factory(
      window.Outlayer
    );
  }

}( window, function factory( Outlayer ) {
'use strict';

// -------------------------- Item -------------------------- //

// sub-class Outlayer Item
function Item() {
  Outlayer.Item.apply( this, arguments );
}

var proto = Item.prototype = Object.create( Outlayer.Item.prototype );

var _create = proto._create;
proto._create = function() {
  // assign id, used for original-order sorting
  this.id = this.layout.itemGUID++;
  _create.call( this );
  this.sortData = {};
};

proto.updateSortData = function() {
  if ( this.isIgnored ) {
    return;
  }
  // default sorters
  this.sortData.id = this.id;
  // for backward compatibility
  this.sortData['original-order'] = this.id;
  this.sortData.random = Math.random();
  // go thru getSortData obj and apply the sorters
  var getSortData = this.layout.options.getSortData;
  var sorters = this.layout._sorters;
  for ( var key in getSortData ) {
    var sorter = sorters[ key ];
    this.sortData[ key ] = sorter( this.element, this );
  }
};

var _destroy = proto.destroy;
proto.destroy = function() {
  // call super
  _destroy.apply( this, arguments );
  // reset display, #741
  this.css({
    display: ''
  });
};

return Item;

}));

/**
 * Isotope LayoutMode
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'isotope-layout/js/layout-mode',[
        'get-size/get-size',
        'outlayer/outlayer'
      ],
      factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('get-size'),
      require('outlayer')
    );
  } else {
    // browser global
    window.Isotope = window.Isotope || {};
    window.Isotope.LayoutMode = factory(
      window.getSize,
      window.Outlayer
    );
  }

}( window, function factory( getSize, Outlayer ) {
  'use strict';

  // layout mode class
  function LayoutMode( isotope ) {
    this.isotope = isotope;
    // link properties
    if ( isotope ) {
      this.options = isotope.options[ this.namespace ];
      this.element = isotope.element;
      this.items = isotope.filteredItems;
      this.size = isotope.size;
    }
  }

  var proto = LayoutMode.prototype;

  /**
   * some methods should just defer to default Outlayer method
   * and reference the Isotope instance as `this`
  **/
  var facadeMethods = [
    '_resetLayout',
    '_getItemLayoutPosition',
    '_manageStamp',
    '_getContainerSize',
    '_getElementOffset',
    'needsResizeLayout',
    '_getOption'
  ];

  facadeMethods.forEach( function( methodName ) {
    proto[ methodName ] = function() {
      return Outlayer.prototype[ methodName ].apply( this.isotope, arguments );
    };
  });

  // -----  ----- //

  // for horizontal layout modes, check vertical size
  proto.needsVerticalResizeLayout = function() {
    // don't trigger if size did not change
    var size = getSize( this.isotope.element );
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var hasSizes = this.isotope.size && size;
    return hasSizes && size.innerHeight != this.isotope.size.innerHeight;
  };

  // ----- measurements ----- //

  proto._getMeasurement = function() {
    this.isotope._getMeasurement.apply( this, arguments );
  };

  proto.getColumnWidth = function() {
    this.getSegmentSize( 'column', 'Width' );
  };

  proto.getRowHeight = function() {
    this.getSegmentSize( 'row', 'Height' );
  };

  /**
   * get columnWidth or rowHeight
   * segment: 'column' or 'row'
   * size 'Width' or 'Height'
  **/
  proto.getSegmentSize = function( segment, size ) {
    var segmentName = segment + size;
    var outerSize = 'outer' + size;
    // columnWidth / outerWidth // rowHeight / outerHeight
    this._getMeasurement( segmentName, outerSize );
    // got rowHeight or columnWidth, we can chill
    if ( this[ segmentName ] ) {
      return;
    }
    // fall back to item of first element
    var firstItemSize = this.getFirstItemSize();
    this[ segmentName ] = firstItemSize && firstItemSize[ outerSize ] ||
      // or size of container
      this.isotope.size[ 'inner' + size ];
  };

  proto.getFirstItemSize = function() {
    var firstItem = this.isotope.filteredItems[0];
    return firstItem && firstItem.element && getSize( firstItem.element );
  };

  // ----- methods that should reference isotope ----- //

  proto.layout = function() {
    this.isotope.layout.apply( this.isotope, arguments );
  };

  proto.getSize = function() {
    this.isotope.getSize();
    this.size = this.isotope.size;
  };

  // -------------------------- create -------------------------- //

  LayoutMode.modes = {};

  LayoutMode.create = function( namespace, options ) {

    function Mode() {
      LayoutMode.apply( this, arguments );
    }

    Mode.prototype = Object.create( proto );
    Mode.prototype.constructor = Mode;

    // default options
    if ( options ) {
      Mode.options = options;
    }

    Mode.prototype.namespace = namespace;
    // register in Isotope
    LayoutMode.modes[ namespace ] = Mode;

    return Mode;
  };

  return LayoutMode;

}));

/*!
 * Masonry v4.2.1
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'masonry-layout/masonry',[
        'outlayer/outlayer',
        'get-size/get-size'
      ],
      factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('outlayer'),
      require('get-size')
    );
  } else {
    // browser global
    window.Masonry = factory(
      window.Outlayer,
      window.getSize
    );
  }

}( window, function factory( Outlayer, getSize ) {



// -------------------------- masonryDefinition -------------------------- //

  // create an Outlayer layout class
  var Masonry = Outlayer.create('masonry');
  // isFitWidth -> fitWidth
  Masonry.compatOptions.fitWidth = 'isFitWidth';

  var proto = Masonry.prototype;

  proto._resetLayout = function() {
    this.getSize();
    this._getMeasurement( 'columnWidth', 'outerWidth' );
    this._getMeasurement( 'gutter', 'outerWidth' );
    this.measureColumns();

    // reset column Y
    this.colYs = [];
    for ( var i=0; i < this.cols; i++ ) {
      this.colYs.push( 0 );
    }

    this.maxY = 0;
    this.horizontalColIndex = 0;
  };

  proto.measureColumns = function() {
    this.getContainerWidth();
    // if columnWidth is 0, default to outerWidth of first item
    if ( !this.columnWidth ) {
      var firstItem = this.items[0];
      var firstItemElem = firstItem && firstItem.element;
      // columnWidth fall back to item of first element
      this.columnWidth = firstItemElem && getSize( firstItemElem ).outerWidth ||
        // if first elem has no width, default to size of container
        this.containerWidth;
    }

    var columnWidth = this.columnWidth += this.gutter;

    // calculate columns
    var containerWidth = this.containerWidth + this.gutter;
    var cols = containerWidth / columnWidth;
    // fix rounding errors, typically with gutters
    var excess = columnWidth - containerWidth % columnWidth;
    // if overshoot is less than a pixel, round up, otherwise floor it
    var mathMethod = excess && excess < 1 ? 'round' : 'floor';
    cols = Math[ mathMethod ]( cols );
    this.cols = Math.max( cols, 1 );
  };

  proto.getContainerWidth = function() {
    // container is parent if fit width
    var isFitWidth = this._getOption('fitWidth');
    var container = isFitWidth ? this.element.parentNode : this.element;
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var size = getSize( container );
    this.containerWidth = size && size.innerWidth;
  };

  proto._getItemLayoutPosition = function( item ) {
    item.getSize();
    // how many columns does this brick span
    var remainder = item.size.outerWidth % this.columnWidth;
    var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
    // round if off by 1 pixel, otherwise use ceil
    var colSpan = Math[ mathMethod ]( item.size.outerWidth / this.columnWidth );
    colSpan = Math.min( colSpan, this.cols );
    // use horizontal or top column position
    var colPosMethod = this.options.horizontalOrder ?
      '_getHorizontalColPosition' : '_getTopColPosition';
    var colPosition = this[ colPosMethod ]( colSpan, item );
    // position the brick
    var position = {
      x: this.columnWidth * colPosition.col,
      y: colPosition.y
    };
    // apply setHeight to necessary columns
    var setHeight = colPosition.y + item.size.outerHeight;
    var setMax = colSpan + colPosition.col;
    for ( var i = colPosition.col; i < setMax; i++ ) {
      this.colYs[i] = setHeight;
    }

    return position;
  };

  proto._getTopColPosition = function( colSpan ) {
    var colGroup = this._getTopColGroup( colSpan );
    // get the minimum Y value from the columns
    var minimumY = Math.min.apply( Math, colGroup );

    return {
      col: colGroup.indexOf( minimumY ),
      y: minimumY,
    };
  };

  /**
   * @param {Number} colSpan - number of columns the element spans
   * @returns {Array} colGroup
   */
  proto._getTopColGroup = function( colSpan ) {
    if ( colSpan < 2 ) {
      // if brick spans only one column, use all the column Ys
      return this.colYs;
    }

    var colGroup = [];
    // how many different places could this brick fit horizontally
    var groupCount = this.cols + 1 - colSpan;
    // for each group potential horizontal position
    for ( var i = 0; i < groupCount; i++ ) {
      colGroup[i] = this._getColGroupY( i, colSpan );
    }
    return colGroup;
  };

  proto._getColGroupY = function( col, colSpan ) {
    if ( colSpan < 2 ) {
      return this.colYs[ col ];
    }
    // make an array of colY values for that one group
    var groupColYs = this.colYs.slice( col, col + colSpan );
    // and get the max value of the array
    return Math.max.apply( Math, groupColYs );
  };

  // get column position based on horizontal index. #873
  proto._getHorizontalColPosition = function( colSpan, item ) {
    var col = this.horizontalColIndex % this.cols;
    var isOver = colSpan > 1 && col + colSpan > this.cols;
    // shift to next row if item can't fit on current row
    col = isOver ? 0 : col;
    // don't let zero-size items take up space
    var hasSize = item.size.outerWidth && item.size.outerHeight;
    this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;

    return {
      col: col,
      y: this._getColGroupY( col, colSpan ),
    };
  };

  proto._manageStamp = function( stamp ) {
    var stampSize = getSize( stamp );
    var offset = this._getElementOffset( stamp );
    // get the columns that this stamp affects
    var isOriginLeft = this._getOption('originLeft');
    var firstX = isOriginLeft ? offset.left : offset.right;
    var lastX = firstX + stampSize.outerWidth;
    var firstCol = Math.floor( firstX / this.columnWidth );
    firstCol = Math.max( 0, firstCol );
    var lastCol = Math.floor( lastX / this.columnWidth );
    // lastCol should not go over if multiple of columnWidth #425
    lastCol -= lastX % this.columnWidth ? 0 : 1;
    lastCol = Math.min( this.cols - 1, lastCol );
    // set colYs to bottom of the stamp

    var isOriginTop = this._getOption('originTop');
    var stampMaxY = ( isOriginTop ? offset.top : offset.bottom ) +
      stampSize.outerHeight;
    for ( var i = firstCol; i <= lastCol; i++ ) {
      this.colYs[i] = Math.max( stampMaxY, this.colYs[i] );
    }
  };

  proto._getContainerSize = function() {
    this.maxY = Math.max.apply( Math, this.colYs );
    var size = {
      height: this.maxY
    };

    if ( this._getOption('fitWidth') ) {
      size.width = this._getContainerFitWidth();
    }

    return size;
  };

  proto._getContainerFitWidth = function() {
    var unusedCols = 0;
    // count unused columns
    var i = this.cols;
    while ( --i ) {
      if ( this.colYs[i] !== 0 ) {
        break;
      }
      unusedCols++;
    }
    // fit container to columns that have been used
    return ( this.cols - unusedCols ) * this.columnWidth - this.gutter;
  };

  proto.needsResizeLayout = function() {
    var previousWidth = this.containerWidth;
    this.getContainerWidth();
    return previousWidth != this.containerWidth;
  };

  return Masonry;

}));

/*!
 * Masonry layout mode
 * sub-classes Masonry
 * https://masonry.desandro.com
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'isotope-layout/js/layout-modes/masonry',[
        '../layout-mode',
        'masonry-layout/maUî·y'
 ª¡Àœ,
   `l?•™ctor: SğÇ } eLs^e ( tØ}ĞwÇ@moduluò*7—'objBã´İ:& mod=Ä­DxporE¡@œI
    /²æmmonˆ^İ0ã modulÜ©eportæÏ‘zctory(=Õo€   rÅi¡©('../l·AOét-mo†'ÉX      ë‰ù-ire(ïEÄ&Ñ¸ry-layrèvÊ)
  Mß±jÖ } elsÿaØ    !YI†+Vwsu2”ş4~bal
¬5¾0jctory(ÜîTÜ   w/Œ9IsototÇøı¾youtåÄ2z‘    ! „ow.ÍöÁãLÅ
    £§‰}

}e‡ÔqPow, fuØ*4on f©ãÿH¹œ( Lay.PÏ¯BdeâeõÒTnry =BD±†se sÍ¸2nK;

/.&pêO----¾ñöÕª7----)-:1"-- mHbînryDeæ¶°Éëion ZëCXv----+lè4¹É----ŞUèéW; //
†"ĞgTcreaÕ%}>ÆOutlC)Æ§y@ayoulÀ×:ëús
  4aè°§¡sonr‰¼Ñ= La)ˆ¥E de.crš.ø²'masNLcá;Õ;

 àzroto =sÕHonryM½Q„¯rototy]AEJ
  v¡b}YÄ…pModeM©2<ds = ;Cæg _gepEïŒLjntOfÇòw2¼true,
j;ÿùlaqo3ì:DD§ue,
  úöˆ0etMeawy@xûent: dÃÃ6®  };³î`Ÿ inhå2¯Öz¢ason¶ÚÛÙ¼totypeö¡aor (°.õ©şethod c£iason3´‚Ù½totyPdm Â.
   ¹î-Ñì- not hµÆit m6² êÑõthodó
îØÄCif (ì8¼ÛqModeMe¤_Ks[ m9H¾‹J¢] ) {
Ú2  pryè™İethod _¢MasoÙŠiöototip:«°±ethoE$ÿk   }
 C€q  va,Ïq%…çureColëì = pµå—æmeasuó%NY6mns;É¼YsNto.må£0ÎİBColu§âL…Bfuncğ)Çò€5 {
 âÉ¸ÃWÃset dvynq usÎ2É³&©×Ma§Ëx­.­OMjU¨Æ+áös*µÜBñµêQêÜØZDÊmcÖ]mÅ)sVÿ«<uKÈ ‰ñ-EBÂÿ!Ât¬ˆ÷×to±w½Í¡Xxİ·ìB¹Wã—Ü¤ióö7MŸ”æ$ã°­¾Bv­ó!UÔ^³q$;ÄLíwñ#ÆËñ‚:Õ`ëOt¿€‡ÎÃdFÃíô²àÆ³63y±ªr–—.árO«è`˜h	BCÄzëC•‘Êò§ßFê
—bÍ	}0Š]¯­üæ Y /PQƒ!Yø-A+5¬”ş¼ãˆMÏÑŒ7¾0:‰ÔÙäG°Üî¸¹‚ï+•+Œ…	Ùúş²|¼Çø˜µ;DåÄ2pb`Ì\´¿†¢*Ø»á¤öÀãL­uŸ2åfÆ£Ì{‹Å4e‡Ô^%[_«ç“Øõ?sİD‹¹ãÿHRTÌmì†PÏu>:®âeõÒT>`’,›jBD±†µí2eÍø2nK­õ[ı‡^pêOoÄö²òöÕª7n€h£C‡:1"¼¡ñHbîódİE}ö¶ÉëG<”›aCXv¼qÚm™–ì_¹É:NÄ‰ÇÎ¬éW;V÷ÉKyø0gTçÔ³¾»_}ºÆq„Íç‰ÑFæy@Ñ£òòóiß:ëú»Ê:ßW’ê2§¡8+Ñß®“¼Ñ>’ì-WÈKE åoVr®Ì.ø²2•v-jÖcé;Õ‰÷@Ë%âzP zR4ÙH¼và“S„¯\Ğ‰%måEJÿÖiv&1oQÄ…>%°w9µ©2<*:óQcCæg¬È{şCtïŒLjørŠ>Oşw2¼	3ûlá¿j;ÿù¹¦æŸl:DD§	ˆMœº—úöˆ0FK¼½wy@xûÀ}ŞÈúÃÃ6®4Şua¾³î`ŸOoà²¯Öz¢#BÛÙ¼ÁIZö¡a:¥ì®ğ/õ©şqô[‹ÎŠc£iÚRäœœ‚Ù½±ßuÓl<m Â.çY:;ì-Ñì-öÓWI2µÆTÉ¹" êÑõìîç—ü#îØÄC-kn¼ÛqÊ9) …¤_Kz5êO;I¾‹J¢Äá©3Ã.Ú2Ò§Zïè™İLúbĞ_¢¥NäÑÙŠiö)/G‚È‘:«°±]Ø=4e&ÿk¤%‹‰=ÅC€q‘IºÆnÏq%…çËÁÆİëì‡¨5ÛµÅ—æm^Ó8'³NY6iÃ‘¹¼YsN_Ú±“0ÎİBDÌ`¦âL…B¾n@ô€NÇò€5ı;&àÈ¸ÃWÃÍR¼|ynq\Î2É×¶Ğ×Ma§|#ŒDâOMjUC,Xnç¶s*BÌ””€êQêpy×²ÂmcÖ]xÖL¥N¿«<uÂsá×½mEBÂg–fQœŒˆ÷öøQ:¢g½Í¡12ğeV-¹Wã—€8y¸WMŸ”t)Ÿ¹¹JBv­óç:`¬q$;Ä[d5QäŒÆËñ‚}pÅO°¿€‡Ré3Ö2ôíô²à„OÚ¬kªr–—–‰HÈ@%è`˜±KxŒOGÄzëCöfên‡ßFê
ÿ¥7¥	}0Š]¥—ÓM éüæ YYtnöAƒ!Y1%AÊ}5¬”ş2ÕÎÑÒ™Œ7¾0a¼t
.°ÜîV28(•+ŒÖğ±‘¯|¼ÇøxãB;4åÄ2 -pl/§¿†\¡gtá†öÀãL¸Áwr¦ffÆ£j'×E”e‡ÔsûÛËç“ØÔR\Ğd‰¹ãÿHûç5ªì†PÏ€)´âeõÒTÙöWÌBD±†F)’cÍ¸2nK\`"o¿pêOH=ºóöÕª7ŠvÍ0:1"}2çŒhBîód
Ë½ü ÉëGŞè6òÁCXv¼qÍ‡Šô ¹É:Ng;`h©W;VQ£¨‘ĞgTçÔ¡	jÈ}>Æq„©s©¡Ò¸y@Ñ£Á¢N×2ëú»ÊìÑºQn×§¡8+3ú>¼á>’æïó’¥E åoı>‚û.ø²2•Ÿ„`P;Õ‰÷ÒJ]TàzPŸë³\{ÃH¼NÏ†ôsQ„¯\ĞÀœ"ùÁEJÿÖ¯±ğÉ}YÄ…N„P‚%é/<¬“Ó‹ÛØ`ágşä‘•Ûë­Ljl
?³Cxw2¼×àJ»03ÿù6¢ƒĞÇzTD§ì&‡eô‚ˆ0‚*nºéuÄxû}ùÜ®¶G£È6î	rû³1Ïê`ŸÙ.Ñ3K­	z¢Sÿğşßß¼×dÙ±“Ãa4«I®êñëşÑÉ7å›HŸiGëéjÙŠÙ½V–‡;½±€Â.°ıtWòj-Öì-dl	G†?ÉÆk‘Ì-›}¢êÑõ÷™Iåz–<ÄCßÈŠE¯¸ÛqN¦ø={”3_KchÒ€„tº‹J¢)+û¬Ş2[ƒq±ö™B±s;Ó`c¢ø‹BØ«ˆyöî8%Y ºª°±FU3ÿk? ô´Ï€qY“ˆC²ßQ%…çşÙ°ÜY›
Rëìb?‹ŞÏJ—æmBƒæK·‡Y6ğRGmYsNq_°®İB€¸íFe4L…BğÛJ@üõfw€5À0P™¢ºÃWÃç4–©Î.˜ñnqnèÎõ2ÉU]·„9a§Àœ!o_©NÉjUl?':šs*Sğ„hXÂQê^Ÿ[TmcÖ]ĞwÏ7ÙŠÇŠ<qÒ*w{şRBÂ´İ&_5"¨Ò÷Ä]ß9G;Í¡@œ!²à!/³ã—GÃO{]^”İ\Á~zÇ­óÜ©·½ûÄÏ‘Aïçğiõ‚=ÕÀeı(ÛÌ‡i¡Ùe÷-"²à·ARu‰+q–—ÉÔ´9ì°9`˜ë‰ŸM0Ç{ëCÄ&¿Ş•gê
Rè½Ôÿï0Š]ß±‘3«é Yÿa„1³!YI†^¹íZ$ã”ş4~—„zŒw¾0j¥+[&ÜîTÜ¼£Z×µ+Œ9)lZ¹°Çøı¾Xˆ­áÄ2z‘zˆQÄ„ÈtZşÉãLÅ‰Í›bÔ£§‰J›²E‡ÔqPpÊº3³Ø*4É?<9ëÿH¹œ"Â\¬ZPÏ¯B7ğeõÒTxßÀ¿ó$‚±†ùàà@ÂÚ2nK±ˆ)šæÔêOæ>dZ×§ÖÕª71ÊIá4Û»r"òØ?¤ê›Şód1Êçİk·…¿G˜*º†mXv¼qlÓ'ëüÉ9:N›:víD4WV8b×îÊoAçÔqÒ…É6]Æq„e×®Ô²’²GÑ£Bÿœyëú»Ê{uøU{­á8+ã…Ÿèğ„>’•
†Îêwï®åoùœ³¢,Q²2•9 <ÉE7=e‰÷ûVQÌzŸPTã!ß¼¤ßïóÕy„¯\Ğ !ócÇËlÿÖá§pVzÄ…N1÷k¾úÿd
¬“æ´™¡‹EgşäD¨+Ìë4¡l
hn	‚-2­×à¾Ña_ÕÓ<6¢LQ§ª ‡ì*ğÓ#Š‚*Tcsf;c\_}ùuW°('¼+	r4Öj
œdŸÙ&	v”êØ+¦SÅŸ "hğ×pëYİE´4«š55‚saZYÑÉö4Åãf_G¾&^N€Ù½V–]"¼=ÖÚÂ®°ı\î}V)Óì-dõœ–ï¤Æk‘7¥&] êÑõ÷™4bQZÖçÄCßÈªF`ö{qN¦õÃY+…\_Kchğ¾ºÏJ¢)+Ë 83tÚ2[ƒ0È&ıÕB±>}€Ÿ§¢øLNŠ‚iöî,ØæSŸš°±FUr™æµÿ k? úŸÈ€qY“Ó¯q%…çşÙT›¸o©¦ëìb?Ê±ïÑ·æmBƒ?‡vÚY6ğ0àÎ']sNqOM#¢ãİB€¸rAû’H …BğÛ åãd•²€5À0R*}˜ ÃWÃç4Rõ÷çYnqnèDù2ÉU]Œ{»a§ÀœÍ»àæOljUl?r#…s*Sğ¢Øn ÄQê^•âŠÒmcÖ]ĞwxÄ™#«<uÒ*<D¬©EBÂ´İ49uË÷Ä–!†¦¼Í¡@œíùIzã—œÎz=Ã=”İVRÖÒÂ`­óÜ©§Bd8ÄÏ‘œ)®³ßÑ‚=Õ—&Ëû‰‡i¡QÎÏ³º²à·AÄ‡Yª»â–—ÉHş_>(ì`˜ë‰Ù‡Æ„~ëCÄ&*û£„§ûê
RèN‡¶ ]ß±?t(™ Yÿav è	!YI†Ø²Mµ’=”ş4~ıî”7¾0jÅ{šîàÜîTÜÔXóFı*Œ9KòXã0ÿÇøı¾ŸÉaß¥d2z‘,~Ú¾‹„—wÒÀãLÅşTaöÿ%£§‰zu‡ÔqPûùJØ*4æ¯‹W9ãÿH¹œù»î‹FPÏ¯BìMReõÒTxF´neDF±†ùàQmğÒ2jK±T˜6æêOæ>7?ìöÕª71ÊD°”v®"òØçŸ0"îód1Êkœc]-G˜äÅ~;X6¼qlÓÆ&Kı:N›:ÎÁ]GV8buº7e¤çÔqÒ1YO–Fq„e×Òû¦9ÂÑ£BÿÌ¨Ô
ëú»Ê{çšå$à8+ã…hÊO¶>’•
4`şEåoùœ}™M²2•9 ‘ÙÜ’×‰÷û¥ßXñzPT>Q/Fø¼¤ß\¼Š„¯\Ğ °ç_äg;ÿÖáDîŠÌÀ…N1÷ÛÿOl‹¬“æ´hÚYşgşäD¨š;ÈÄ“l
hG>B2¼×à¾Ñí>¥Cgt6¢LÈ_Ò>kì*ğ]”(<7‚*TcZq>ìø}ùuW*Ó›œpÃ	r4Ö÷À…v×Ù&	áF
wÄSÅŸı Ú.¼×p|uKPÈ+4¯š5ûÑcÖÑÉöDÙª°Á¢G¾&¶Îüæµ¼V–áèÚ$«™Í•°ı¡3oá‹”á=dr³û¨şŠ‘>k‘çÑ3mµSõ÷™Éâñ²´²•CßÈìSq ³1 N¦dVè,› choİšH}ÔN£)+ª‘ºM£M([ƒ8:ÊV
B±wn€ëvœhø™¿nª»ôîĞúmc ü‚¼FU×w®‘ÿ+n? %FşĞ
kY“K¦66D@…ìşÙÔùş
İÂøÎb?Í
cÌ!m'Bƒ&ò›š¿pğ.~{ĞÃ}sNq­ƒ³Æq‘€¸õôZıÊ…BğÛ¹ÌÑt(À0¯[4Ó)uÃç4Ó®şHÎúqnè>íşÑUî·ˆ[h§ÀœY”5#µl?•™	œ…*SğÇH<ÙbÑ¨^eaÄ¬Ö]ĞwÇ@fÈvuJñÒ*7—Å1~cFÂ´İ:¨]ı7Ä­DOp5MÍ¡@œIù? q'¸²æJÃgúİ0ãg„(ˆŠÔ©eÀÚ=ÄÏ‘z‰ĞÖj=Õo€ğÆàô'i¡©u¹Û‡)·AOétj®‚ÉXôÍÚn6\ë‰ù-·AgâCÄ&Ñ¸è„¥ïıRèvÊ¦È*Imß±jÖ&9GF'>ÿaØE9^	]I†+Vø’uúy4~F_*š?wjİ€HÿS“-ÜTÜa©ÜÉ|×Ì99©ÓäI?ı¾Ûv6J:z‘$ç·¥6øİ„„İgVU=Ç\Åú÷àj0§‰‘Ú \ÍÔ‡ŞqP@¬“2úŸ˜Ô*4Q,¤À…©ÿH¹œ  L.Êı[@¯Bs­ğÍá¦ÒTxÉĞû
‚9ÿ”ùà¾ËE± Œl¼”Xîæ>Mîs€ï«w1Ê¾71ÇKu”òØK üœ)ûd1ÊÙ¶’Ï±ÅtµZë´×`¼qlÓ«L®F·º›:ŞT’8zİV8b§.SèR#ÛqÒÕ'1š6q„e×K=¤ÊïÛÓBÿlÀÿzúh»Ê{°ì{\=p¥ã…‰*§ª\>’•
-=4Û²®x+ùœršÜÒ2•9 †Ø…=_?œÿû«ĞPTS5»w¥ş¼¤ßM©ùX„§\Ğ ì³Á?AºÿÖ5ûf¸}[Ä…N-6Ê#<¬“ØåšÃCægşä"¤H˜òÆLjl
â†^w2¼×àÕ¢c!j‰ÿù6¢P"ƒ:DD§ì¸U[,{Üˆ0‚*cœ!L`xû}ùìÔâ6®	r™¬Ë;ï`ŸÙ(2•Nz¢S˜…úÙ¼×z’îŸua4«äĞõ©şÑÉØÿ©xãåiG¾[¶:‚¹½V–]’—”O)Â.°ıd*ëÛì-d@<~¢ùÆk‘óñ8 êÑõ=B&Z‰bîØÄC¸WÎ8¼Ûq×hù>N¤_K‚…¼ÚJ¾‹J¢QÓÌÅ›8Ú2  øùh™İVé6_¢×õ¸İŠiöˆHreA:«°±æ9Û.U$ÿkÎ?¬}­—C€qˆÃ1›.Ïq%…ç7õ*!Ñëì©çØ¨õ…—æmv>á¶NY6áz!I¼YsN-ü<Ì"0ÎİB`MB´âL…BÀ£7^À‘Çò€5ÏëR|¢É¸ÃWÃ¹Á¸èuynq[Î2ÉÕ	ÿÈÕMa§›Ğ_Á«OMjU†YOñç¶s*ns?\ÚsêQêğ>*ÊmcÖ]fAà*}P¿«<u†wkÌÑiEBÂ­“&|¾Œˆ÷œŒ·/¥w½Í¡
ğâÈ$¹Wã—ÚûöWMŸ”ûU=9³WJv­óôú“U$;Ä€l“†ÆËñ‚ç9¿€‡1ÏH/ÓAíô²àòFİ›éóªr–—èÁòtè`˜[šó>@CÄzëCâ=CwÙßFê
Ô&Èö-0Š]0~Ÿ{èQüæ YXØ%ƒ!YÎZ Ü¿5¬”şkt‡îïÅŒ7¾0òFå}^ª°Üîäui12	•+ŒgômÇ’|¼ÇøÊ¶zbåÄ2avzDX¿†«
Åì…–öÀãL5+3&2gfÆ£åøE”e‡Ô™µFøç“ØÕ@ÎƒTK¹ãÿHØÛÔaî†PÏNøÉ_`eõÒT–Ïr'ºBD±†ØK…Í¸2nK¿²ıCÆÎpêO±,"G:óöÕª7æÑÄ^:1"* âhbîódƒd-`Ÿ²ÉëGXì—CXv¼qnÔ¢?2¤¹É:N»å\gèéW;VÇıãrC«gTçÔÇC|9}Æq„7ÜìÖyHÑ£…³p¯:ëú»ÊÄ‹ıvWñ§¡8+ßvh<Ó>’€-ÅxYƒE åo9?m.ø²2•YºOU{¥;Õ‰÷¦0zM`BzPğ&©v‰H¼£î?†Q„¯\Ğ÷Ö>Aš@EJÿÖ­«Ö}YÄ…Næx‘)|<¬“0úºCçgşä ¥bÉ%ïLjl
^–’¸w2¼×à3LX¡
%ÿù6¢àõ:DD§ìŞœÁ]ú¤ˆ0‚*&Ï »y`xû}ù4xÊ¥¢,6®	r™8F»î`ŸÙW.æ¬„yz¢S 9~Ûù¼×h¨<rÛa4«2q"ş)şÑÉ¢Çİ=iGJFFÓ¤Y½V–ÆŞı–âdÂ.°ı»±ÊhmÓì-d ‹xÿ^ãÆk‘Øî"¢ïÑõ÷™Ì×Eæ<ÄCßÈÛ¹ñë¶[qN¦Ï|ı3!¿_KchïL¹)¾J¢)+—1ã_ö2[ƒ¢æ0›İB±)“¥ù%d¢ø
¸Ö¥iöî¬Õ?ò¸C°±FU²§8Â{Mk? Ú ~üB€qY“dlÓQ%…çşÙ˜ízß€€ëìb?JêøäŸæmBƒÊ3şõY6ğ
ÎYsNqÛÜó ¸—İB€¸°Z1…BğÛEÑ“³a†€5À0r–¸ÇWÃç4<H*È7¹nqnèv¬2ÉU':Ûa§Àœ“?ÏG/ïjUl?Æ‡Eÿs*Sğ³aš„Qê^>29mcÖ]Ğw4 …ş+<uÒ*bi›mDBÂ´İï±‰Èÿ©÷ÄúÍI°½Í¡@œ½¬ºã—0âMŸ”İ!ÓÂsâ­óÜ©d<‹ß$;ÄÏ‘–ö:@@şñ‚=Õ$'Gµµ’‡i¡Mõa4²à·AKÏ™‰t–—É¯L9oó`˜ë‰ÔåşìcëCÄ&Éå†Øî
Rèå›h0Š]ß±[GÑZĞ	 YÿaRòxÿUƒ!YI†E¥Çlª_”ş4~}k;Î6¾0j•iBf2ØîTÜÎ”¦Õ¯Œ9z³|ˆÇøı¾¡Ú‚¤Æ2z‘
#hmÏ„×|CrvàãLÅ+‚ªö’`£§‰¡¼ŠÌ¥‡ÔqP¡íC­Ğ¡Ø*4¶œïi¹ãÿH¹œbË?×ÊËPÏ¯By?£eÕÒTxùT½	ãP±†ùàQÑ–.>.K±“ùæ÷’êOæ>Æ±ïİDåª71Êà¢^{#"òØ?HVNîód1Ê¸Ç‹™mëG˜$²@jHv¼qlÓ%œu€Ó:N›:KabÈ;V8bÜ1õsçÔqÒòjşâ€Æq„e×ş&÷y5Ñ£BÿÒäõëú»Ê{ù¡j !8+ã…A Ì?>’•
âÓ•¢M0åoùœ]ãˆ±²2•9 
Ü3;Û‰÷ûÕ‰Š^zœPT|ÄH€È/¼¤ßa{©ÿD¯\Ğ ¢JËHüÿÖá‚¯<Ô…N1÷¬Ã‘Û<¬“æ´)+ÒÈwşäD¨¤u8bl
h E2¼×à¾ÑOÆé¸…6¢L¦LD§ì*ğ„5À&‚*Tc$K0%xù}ùuWBr“u>	r4Ö,T
`ŸÙ&	Xw.=ÚŸSÅŸÕğ£Áº×p…üù*x4«š5”ò¾¿IÑÉö)1—Yèg¾&Åš=•E¬V–áèwÊ@w×Ù°ı¡3…%ÌŠè-dr³Eå/†%k‘çÑ:Ç»‘¥÷™Éâ^³/_‚ÍÿÈìS9ä)N¦dVqèeïWOchoİ;}K )+ª‘êLcÏÎ[ƒ8:gøANB±4ç	³¢øÊã¿bŠiöîá¡_p÷°±FUô¬dÿk? hÎV?øØ€qY“ÜµvCq&…çşÙæïI­ï[ëìb?¸1F—æmBƒÖè›­`Y6ğÛwÜXsNqn]ÕVİB€¸øÃùŸLB…BğÛ½€¿
„6€5À0e£* ¸ÃWÃç4G! ljnqnèuŒ2ÉUeAåˆ>a§ÀœlÇhSt	jUl?£¯Sws*SğHØÎâjQê^8>mcÖ]Ğwëû‹‘å<uÒ*¨.âEBÂ´İë­
©™›÷ÄÖLİ½Í¡@œ&Iò˜}•ã—ÿUWMŸ”İÊ7»`ö­óÜ©Tâ$;ÄÏ‘´XßØÖÉñ‚=Õ<$Ñ.¿€‡i¡ıâ@L³î²à·AÍX»rê–—ÉJ:ìí Œ`˜ë‰;#Ä{ëCÄ&¶Óé(Ş‚ê
Rèı$b4Ê]ß±sœÄ¼ Yÿa
»?„!YI†@2rÎ”ş4~«QÜŒ¾0jüpQÈ9ÜîTÜw«.`•«Œ9`T@ÎuÇøı¾ù›åÁ2z‘WI³‡˜„×ˆÃ²ÈãLÅE@œQ[½£§‰Ñ¥ˆ1,e‡ÔqPR£'BıØ*44¸[¿âÿH¹œ*®Ã[_ƒPÏ¯BDÀÕò$õÒTx£“’l¶E±†ùà2}í»2fK±"ïYLêOæ>ßÃPçöÕª71Êºæyö•."òØ‘VÆ`îód1ÊÚí×G˜f)™X2¼qlÓ‡´nô:N›:{ñª³WV8b8Z •a“çÔqÒQÑv›˜Öq„e×ô7Ê›1aÑ£BÿºQ®şëú»Ê{àŒ9Á;8+ã…å¼c>’•
AJ8›h’åoùœæ“Ÿ¼²2•9 1‹ÕÂ‰÷ûa HzPTŒIš*Ü¼¤ßğ>8–„¯\Ğ ©.…#MÛÿÖá²Ğ—£Ä…N1÷ø9…;ŞÌ¬“æ´Uêu#…gşäD¨Àü¹FÈel
h»'I2¸×à¾Ñ¥îKÿ²6¢L€õ£D§ì*ğy-Ù¿˜±‚*TcæÏ°txû}ùuWÄÙVª	r4ÖWÚÊ`ŸÙ&	9ã¢#Ÿ²SÅŸ+Ù¸×pG#Ô—¸4«š5Øˆ ÿ4ÑÉöƒîu_G¾&u%ğTU½V–áèXVY#y°ı¡3´¤dÕä-dr³Ó?tNÿçk‘çÑS°”úQu÷™ÉâøŒ©x+ßÈìSÜòdqCN¦dVñwU¡choİe¢xJ¶)+ª‘AÓı§vî[ƒ8:E·¬4B±wn‹Š‘½ø™¿C‹d]vîĞúZÛ/P.ñFU×13B:{o? ‹áÕÃ2Y“K¦³úã1‡çşÙÔùB/ÿ®Gb?Í
=§ú@y$Bƒ&ò±øj¦*vğ.~ÌA cJq­H•"ßÅ€¸õô•¹­ß…AğÛ¹Ì÷å…À0¯[øÉ¸,Ãç4Ó®L«ÏˆQnè>cí®ÛUî·¯o§ÀœqJÜ”nl?•™˜Ó,g*SğÇvi$Ê^eD¯:ªÖ]ĞwÇ@
;ÂxSÒ*7—¹ˆıÔBÂ´İ:”W{¦÷^Ä­D0Ac®Í¡@œIÓ®~
×²æ·ˆrõ”İ0ãqÏÓl£Ü©e.ØšsÄÏ‘zî ^ñ
=Õo€1g±‡i¡©Ø·£à·AOéü¦Æ–—ÉXñ:Õµ&^ë‰ù-(æz}‹SÄ&Ñ¸DàBèvÊG˜šÑ¼Üß±jÖÇ…¡¬%ÿaØœ¹q‘5iI†+V†Rløß4~FíÁş"jİ€å`5KüTÜa©ß³öŒ99©¾UOìı¾Û}(k2Bz‘$çX5¥ô„„İXaÅÔãFÅú÷JjÓ/Qt§‘Ú%Š‰ĞqP@¬ÍiíÊ?*4Q,G	q8¿H¹œ  ˆÜ¨í¯Bs­c3ÃİšxÉĞÂÎšµœ`ùàLïfhË± ˆ“ï%_æ>Mø#-*$1Ê¾7¿*pÁ?òØK ËÎÓh1ÊÙ¶RAxó®j˜ZëSeF¸qlÓ«L¸Ô³õ½–›:ŞTbêV8b§.½£ãÚUqÒÕ'›ÍGqe×K!}“tÉ£BÿlÀOôw»Ê{°ìE°*Šlã…‰©F“|“•
-=¹¾kr83ùœršf„²2•9 †ØWßÔU»×ûx¬ûPTS5Ãy¶…¤ßÙ¼ÒpXĞ iñ®Úø–á©BJbìæO 1÷¼ƒ+v6×Š÷æ´
MÒÄ¾dD¨‹åqõzh&hÏö53î¥×à¾Ñş?êw<¢L“ì7!AÌ*ğAUôï(Tcw¿”W£}ùuWdX¨ì©Éô4ÖUü®ägÛ&	À¬mo²áñÅŸ¾ÒU¿ºâÓp
ôuXBa³š5°+§
"ÑÉö^®??…w¾&3´?PIR¶áèB&­N«à¯¡3¹ìæøázEFr³pÀÿñvŸçÑ°²wlõî‰Éâ¿"Á`´ÎWÇìSî´ãnBdVB›0ßj
¦çİ9I«¹‰N)sª‘YŸtK'›İ8:Ùèq9(@µwnLIhHşc™¿Ù:”§øĞúÃ²ªtŸÚ±3×E&CzÈr/ ğÂå¼ŸK¦,Ï¹eÊÿşüÔù3Uø“ ,Í
µÅÌ„¡9Bƒ&ò£¶mìm1aö.~É¼Ç‘ÕÒU ­Ä³	@xô‡ûõô¦â'!9¦ĞÛ¹Ì)|ØúWÀ0¯[âÉVŞ—á4Ó®Ô\ÙÃrnè>h\èÈUî·Êî”§Àœ«©“è>Ul?•™€ÿçÅ+SğÇO¹ÎÌè^e¬˜ÂÖ]ĞwÇ@	áŞb=UÒ*7—Ì‡j÷BÂ´İ:¡¥ÛxVÒÄ­DO?ÜÍ¡@œI¡ªjí§²æg<‚Å”İ0ãMĞH[Ÿ£Ü©eà™5ÄÏ‘zÒ¿Jq=Õo€tÎ
š‡i¡© Êë³(·AOé:û7ê–—ÉXZ>ˆEÁˆë‰ù-NrJJëCÄ&Ñ¸¨CûßÔRèvÊ
»ÚO]ß±jÖÊ0ÁD·aØ,³;Á58I†+VvŒr¯4~F°°V>6²jİ€kBk0šèÔÜa©/„†!99©E
éÔ‚ı¾ÛïÔÌzFz‘$ç ÷Ó“ö2„„İ2_İ#DÅú÷1ÃÅ §‰‘Úgh2«çÜqP@¬ÚKLÆT*4Q,`áIU¹œ  túq»“c¯Bs­…<†ÒTxÉĞów$TùàmÔc£K.± “R· Îæ>Mè(ùªW1Ê¾7Xÿ<í |òØK –&<õ¨1ÊÙ¶¯J˜é˜Zë§¯œ.<qlÓ«L„UF¨›:ŞT¡’¢v8b§.åd8[ÁqÒÕ'¯ÿq¤e×KRÚ|Áì]BÿlÀ¥*·›Ë{°ì„zœ•‡ã…‰nö‚Y>Ò•
-=¯% êÂùœršM¼_=r•9 †Ø'¤¬¹Áû·Å0PTS5ÜÈA7Y›¤ßÙ¼ruvĞ iñ¹{†,W0á©Bó¢ÍRN1÷¼ƒÊ«l¼æ´
…q¦õşäD¨‹åOj~•`RhÏöÂ’©Óà¾Ñş?>-B|–L“ìŸšˆ ¬*ğAÎøŸgƒÊTcwz«èe]ùuWdµäyû*r4ÖUü>À±Ù&	À¬ö§˜ıÅŸ¾ÒQÿh×p
ô’ZÓós«š5°+š‹$fÓÉö^®‹â†µ¾&3´×/V–áèB&…{Úïà¡3¹ìööš\!r³pÑà¾=çÑ°² Å×ö™Éâ¿"Ù¢°ŸùìSîUµÊË&dVB›c+²¥ÖDoİ9IT4a#ª‘YŸ(4ïµNÅ8:Ùè™—Ú,BãwnLI¥ÅHµü[™¿Ùn3˜m$ÎĞúÃ²õs¾VÄÂÇE&/Ì s'}My÷K¦,ÏÓÜ«î¾_Ôù3U4óLi5Í
µÅó×
B&ò£¶e¢´àÉn.~É¼åFq3­Ä³Lw#“`õô¦âFY³ùğÛ¹Ì)òè€5/V¯[âÉ-”ÒîçğÓ®d< o–C>á5Ë¡Uî·åd l§Àœútuˆ¶l?•™!}ÄD*SğÇZÍúÍ[š^e…‹îTÖ]ĞwÇ@÷E¹kÒ*7—‘ùñ BÂ´İ:|ĞºÇûUÄ­D5¥RTÍ¡@œI`MN»û·²æÅI”Œİ0ãD®»r¬%Ü©e*ó‚¾ÅÏ‘zEbÍ5Ï†=Õo€Ö}}…i¡©|ğz²·AOé§g -–—ÉX²XÏ¿ òë‰ù-èâCëCÄ&Ñ¸ü	øĞîRèvÊs5^]ß±jÖ‘´ÆÊËÿaØ©õ¡{I†+VnH½ŒÉ6~FË²L· jİ€³:Ø/#TŒa©šj¡4Ì99©õ¤æy×¦ı¾ÛäX=z‘$çòcB5„„İõKùÖåÅú÷HÈVe¹§‰‘Úß€œªìqP@¬Q¹B,"4Q, f§ÿÀ¹œ  +`úg–ç¯Bs­xãŠHTxÉĞ ].´Jùà‚„t	.± ¡b1Z·æ>Mp.µ¼“31Ê¾7Åš8òØK fCØsG1ÊÙ¶!Œì$˜ZëÂJs_¾qlÓ«L¡V ½vA›:ŞT‡$3”7V8b§.táÀ'LöqÒÕ'Æ$¯	qüe×Kïlêÿ—BÿlÀ_Îà²»Ê{°ì€ 1'avã…‰ôæÒA>’•
-=¬ª"—]Ôùœrš	øê2•9 oP_Ş»V‰÷û"4b¯zPTí9Í›¨¢¼¤ß¢å„¯\Ğ ’ ş¶ØâÿÖá.Xç;Æ…N1÷ã"T¼P¬“æ´/ç!h'şäD¨ÓŠ­=Ïl
hƒ|k2¼×à¾ÑŸ-Ÿ¢‚d6¢L‘ Å.D§ì*ğ#25O†s‚*Tc¸xÛ}ùuWØÍa$,	r4ÖÔSçbŸÙ&	»–ÆZ•SÅŸ_í4œE¼×p‡pûmm¢4«š5,›±ZşÑÉö×u.cG¾&›÷œV–áèHòŒŸ,°ı¡3¼ûÊ¤ì-dr³ò<,Q<k‘çÑƒ"ùsõ÷™ÉâÑA€æIßÈìS°>tqN¦dV«e²Z:choİu¦OJ†)+ª‘‘^Ï) ‘[ƒ8:ª&uÆ
B±wn¹9œÂø™¿yê!lò·îĞúÉ±‘ı?FU×³ôÈækù? Ù–xúÄ0Y“K¦¬ŠúĞ…çşÙÔùàh†-ë%b?Í
gfzuBƒ&ò†d³¡¡ ğ.~ªÒCZ3Lq­7h”Cí€¸õôË›Ä†ğÛ¹Ì%¤Çò/ÓÀ0¯[)
YÇ—‡ç4Ó®çø†€_rnè>?÷2ÉUàø^ÏJi§ÀœÂ5q^GijUl?(j¬s*SğÈ$´§’©Qê^ô~†ƒmcÖ]Ğwz~“†™ª<uÒ*ªê9œDBÂ´İ*¸I¿Ş:÷ÄvsjÏ½OÍ¡@œJd,ÌWã—õO[MŸ”İKÇŒ¼$T­óÜ©Gõ®
$;ÄÏ‘•ãú¦ñ‚=ÕCÚŸË¿€‡i¡÷Ô˜æñ²à·Aİs{ªr–—Écş>á¥Ï`˜ë‰ÑA‚ÄzëCÄ&™'ı´Dê
RèWáğ;0Š]ß±Õ«?HÄ¤ YÿaC	hÜƒ!YI†‡ü{ ó”ş4~™°_ºL¾0j K×	dÜnTÜ®‰wö:Œ9äâB¾Çøı¾5Ç4çf2z‘ŸŒ`„Qî¡1×èãLÅ›{1â Õ£§‰¨“,--‡ÔqP©àó}Ø*4;ºãÿH¹œr¥cë7ìPÏ¯Bt?›RguÒTxæQšåCÚ±†ùàŞ²lK±+‰³r`ŸêOæ>}êöÕª71ÊÂ±òÃ5™"òØ :İ¡ïód1Êÿ.°·ÉG˜›~ïxv¼qlÓM3B:N›:—<ñ_3V8b’o^TuôçÔqÒÉ{¶p¸Çq„e×è`ÒrˆÑ£BÿŒD¹·ëú»Ê{B¦Jø§¨+ã…ıL7©:Š>’•
WÍ7HåoùœÜéâ"¶2•9 ‹Ò™+3‰÷ûõ
…zPTåF‡Ÿ¼¤ßïÂê†¯\Ğ ãˆòDÈÿÖáˆüËÎÄ…N1÷´H<5¬“æ´u¤İÎçşäD¨)â Ì¨Ìl
h"ş†ÿ2¬×à¾Ñkö³96¢Lw¡m5D§ì*ğVQ §†X‚*TcéãHû}ùuW-mól	r4ÖÁ°~Ê`ŸÙ&	zÃ›Ïw°SÅŸ­û¬Š…¼×p úÃ(4«š5éhÀfşÑÉöñ€{ÇG¾&Ái“k½V–áè£…_ÀQ°ı¡3	ˆãì%dr³d¶¡]N›k‘çÑ0”¾LÑô÷™ÉâÅéäKÁ³ßÈìSg¯‚QN¦dVt¤²êÚMchoİ“y‚³)+ª‘ _Ú7;*[ƒ8:8mĞ±VB±wnİòxgä0_ø™¿U‚»ØşîĞúˆZæ_FU×¦ƒP;l? à—¯OÙY“K¦ªÙ éşÙÔùè˜<UÎåb?Í
¡ÎP"E&Bƒ&òz"Ã:cbğ.~³2òáWNq­õ)[Ÿ€¸õôš,ïkCğÛ¹ÌÏ²dUÀ0¯[bœ@Ãç4Ó®ÿÍ­¨?fnè>#ñ› Uî·ë¹„$®£Àœ(LKSf0l?•™ÅõÙ*SğÇü½u8÷:^e ;ÁäÖ]ĞwÇ@Å6J]OÒ*7—@ı¾	Bã´İ:3hùÛ†Ä­DNç(OÍ¡@œI‘
hÏM²æ\ŞKP”İ0ã6SW(ªÜ©eôâ7kÀÏ‘z_;Ş À=Õo€~ó¤©‡i¡©…]èÄ·È·AOéEÈ÷”–—ÉX³¼R¬©ë‰ù-­8—ëCÄ&Ñ¸{õ¼Wj3RèvÊwÒV=Mß±jÖ¯ú$MÿaØ­òÂà!YI†+Vg½)%¢ÿ4~F/:oÏ¾0jİ€{ûmÚÅ=Uœa©ÿGpo¨99©{#ó^šı¾ÛEÖÀ6z‘$çA,³ò„„„İ¥\ LÅú÷ş À£§‰‘ÚïĞƒÕqP@¬ïFº„Ó*4Q,)¢ÿ`¹œ  qõêêÿÎ¯Bs­h5÷À’ÔxÉĞİc§š#ùàÏ†ÇíG
± R=¤h›æ>Me¾Ú¸1Ê¾7!zòØK ?|ƒ‘d1ÊÙ¶¯ë.8éz˜ZëuÄã¼ulÓ«Lca=Úß°›:ŞT'³'·R8b§.efÃ2qÒÕ'MÓáu„e×Kø½;«øëBÿå[ëú»Ê{!˜E—$8+ã…×äÛ9Š>’•
bœĞÒÅˆåoùœ-ü÷©º52•9 ·òÿüêğ‰÷ûĞÄÈzPTì^^ÃBö¼¤ßGÚwÄ¯\Ğ hr0}ÿÖáB¼lÄ…N1÷aPİOY¬“æ´©¬Q‘gşäD¨ƒ¼¥ªl
haËçæ2¼×à¾ÑÀŞç¸Û6¢L1ú D§ì*ğ#ø¡ ªn‚*TcñO}xû}ùuWrÊœ¿ê	r4ÖXÊò`ŸÙ&	ôAo _ÆSÅŸ…¸×pr©™v	á4«š5€à#[¾ÑÉö»äàuXG¾&Š‰#Ü½V–áè(p×b°ı¡3ºŸ9ì-dr³â¤œdÂk‘çÑóP=ìÑõ÷™Éâ•%¡DSßÈìSW.fr1N¦dV[¦
‡(choİªç>ªÂ2)+ª‘>‹ùjÇ@[ƒ8:5[ÎúI•B±wn?x¤á¦ø™¿]—?ÔîĞúùôFU×–ÔÁ[[î? OÜà­È‹Y“K¦Dï€çşÙÔùÚ¦Øòïæb?Í
8{ÄgEBƒ&ò¯%~Å01ğ.~eÎµøSNq­!Í))€¸õô)6X4…BğÛ¹Ìh´é;TÀ0¯[e$C1_Ëç4Ó®épÃøïanè>‚N4ÉUî·+>}Æ£Àœæí}ÈÛl?•™‡ºC0(SğÇG†Ùl_ş^e=°xXÖ]ĞwÇ@ÏûMCÔsÒ*7—_~¨Bâ´İ:>bÔ“Ä­DUjŸEí¡@œIÊÅ†œ£t²æ@añİ0ã½ª×|âÕÜ©eïµ.KÄÏ‘zØ¥ŠoB=Õo€q³ãû‡i¡©qVš¤šã·AOéàê–·ÉXn/¬Å1Òë‰ù-«[ëCÄ&Ñ¸ DWê–RèvÊÜI˜]ß±jÖK¼KÔÚÿaØce¨!YI†+V÷Ÿ¥^4~FDb?¬0jİ€?‡XnTÜa©ªæpŒ99©ñíìvÒı¾ÛÃb“¢jz‘$çh¢c Uá„„İõx­ñàˆÅú÷1ïl•]§‰‘ÚfØQ>TqP@¬øc¸ş™*4Q,Z5}ğßü¹œ  k Uß‹¯Bs­¾!P†“VxÉĞ¨¹K^†ùàj.—/± Vvå^æ>MU¬ êªt1Ê¾7ÑEñBÉòØK *òd1ÊÙ¶É¤±3q
˜ZëÓ:İıalÓ«LRœÑYvÂ›:ŞTi
Å
MV8b§.FfhøĞ1ÒÕ'-’R:r†e×KyŸ™Dõ¶BÿlÀø“è/ºÊ{°ì<yMßãã…‰_*1Ú.’•
-=:'â-9ùœrš ‡%(e9 †Ø%¡œ¸û $'`TS5ìÆO‚Ò¤ßÙ¼ssõßlÒ iñ’¦!T·vá©BƒR@ÑN1÷¼ƒ÷ŸMz¼Bæ´
˜ta%~äD¨‹åS·kèÎhÏöFd`Q×à¾Ñş?5ét6;$L“ìWg9¬*ğA=«,¢å*Tcwxu˜K=ùuWd/ÀNÅM4ÖUüy"4ãTÙ&	À¬¾­´v5ÅŸ¾Ò¿ÒÉ×p
ôÑG¢Œ;;š5°+\ñOÑÉö^®¬‹Ã(1g¾&3´:c£ÂV–áèB&„¶½â©¡3¹ìšƒ•dr³p[mùBÑçÑ°²Y0é÷™Éâ¿"Ü™ïNhìSî?…™¾N¦dVB›¶Úv)wboİ9IáKw++ª‘YŸsæí2Fo8:ÙèF™KÒF…wnLIk¼cMYƒ™¿Ù<PÖÔ0úĞúÃ²Lºİ…»Ş×E&[¶ìy¤‘ª?½kK¦,ÏöZ¡æ¶mÔù3U¬M³ğcÍ
µÅÎb/‹&ò£¶úÅ¢[	9~É¼ŞZ9ğq­Ä³m‰1¯õô¦ây…­0Û¹Ì)Ãõ¦Ó¯[âÉ1Ë+ãÓ®d5ênÎç>–Ì*·]_î·×M½ÓÁ”Âœò×®Ö7.ı•™ç¶åø+ìcğÇÙ§wº@‰i^eÊØ@y^ĞwÇ@_0(N"Ü–&7—Ñke(gë´İ:ú–ÇQÜ^Ä­DRùØ%­¡@œIœ«øùÄ²æt›'—İ0ã:Ú¾Éª“Ü©eæ÷ÄBÏ‘zÈ	¢Ğ’=Õo€¬ô
‡i¡©¢u"³R·AOéáŞ——ÉX—“] `œë‰ù-0±ıËCÄ&Ñ¸¶ç¾Ú2RèvÊÿÀÛI]ß±jÖ¢Ã­äIÿaØøĞ`!]I†+VnÙÇ”¾4~F/û¾0jİ€2Ê‰ETÜa©IÁƒ7Œ99©E]Çøı¾Û×A:2z‘$çÈ¯«~„„İÑ±:cLÅú÷#g‰Í§‰‘Ú‚679‡ØqP@¬ì¥±/÷ã*4Q,êHüF¿¹œ  ­—…s—i¯Bs­Õód)ÒÆxÉĞVC˜¢ ùà%ªáK± ¬¹È¹fæ>MóIî˜1Ê¾7¿†RÃ­òØK ¦2-õd1ÊÙ¶ Vè½i˜Zë`Kd¤{lÓ«Lå=À‹z.›:ŞT#µ…‡Ö8b§.°˜1„qÒÕ'»²Æ;Œe×KñÃSõ<BÿlÀ0HÃ÷‹È{°ì˜'´.Oã…‰íBİ‹,–•
-=¦Eß£ÌùœršD;AZ69 †ØĞúAÁÿû
nópTS50­D±¤ßÙ¼ %Øÿ\” iñĞ,š(?á©Bzhbn1÷¼ƒU~ğz¥fæ´
B‹fşäD¨8Şàk(
l
hÍms3<×à¾Ñ‘£qŞü[6¢L0Eó»¦ì*ğ±×èşÏ ‚*TcPˆW|ÿ}ùuWk»úÕR·	r4ÖÆSO÷`ŸÙ&	_çÃÚ‚SÅŸĞ~/Á¼×p,›‚™d4«š5V ÎîÑÉöw^ÍkG¾&yM÷½V–áèG¨Ì‘ÒË°ı¡32º–ì-dr³ÃĞ3Dk‘çÑX2TÑÕ÷™Éâ(Æ0ÍÅßÈìS¯¿qN¦dV·gÔjJchoİØHE4Jâ)+ª‘Ğ>[F[ƒ8:Ï2rHB±wn°ËÜµïµø™¿–¤Å©îîĞúìp[×FU×n!½ˆu×? tyY“K¦ƒ+Œ_„fşÙÔùh”Kuåob=Í
¶ñ±iBƒ&òW*Avğ.~4{Y2Nq­×¹ØéÔ€¸õôI§¾ğÛ¹Ìb·;cëQÀ0¯[ì„ğCwÃç4Ó®”Ã›ÏAnè> forXS{ar i <lÄÀCi < smvúY’s.le•ìsi++ i ×î!R    €L-,sortByı«C{ortB‘!kÜC¼
   0 t	ÊFar a41tÌ´ÏmA.sorĞûûha[ sıòHÙ£<];
   İ‘°_ varä*ì«temB.ssWfatc[ rÆ!’y ]; ‹´”   iÑ"ˆ—5Œ> b ü|šÛ b )N9Ün-„      å†'¡if sÔİ¶f is àn/¡†ect,‘ä`bkhe v¹çóî giv,s‹öm sortBæEÃy
  ğµQÉc  vas œÏécendnãc‡sortvğ)ortB¯
¾ÍZ= unämÚKºd ? ĞSøF7c[ sn2èˆbF] : ;7o‚»Âc;
  "Åô   !)¦[­LirecpidIl isA4€ãêÇng ? 10~ù1;
!{8_S
q   råV3`/( a „'^ ? 1 :bKœŞ) * ¤~T†×ion;ˆ ‚ó,   }çE‰^q“ }
  ‘|åeturX‚×s¬   }º cªä
  /Ï¼}#²ï----=„ûxÊ----iÈÄ (-- mEv:^° ---$íï#`----,-=~¶=----ÂAà¬9

  //3†X lay?{5Ejde
  PÚdW._mo”%ÜKèunctio‘óÅp{
  #;^ZvlayouvòXÊ = tü}ş· Ûtions*¯#ğßutMox¤£DAJ  var ©O‰³ = tJã¤‹¿des[ l7ŒaêtModQ>)   i`û]«êode ì„ºıUë    /oajèO coJÒRÚà÷errorJ5zš@  th2(íT[w Erb/İò)²No l—¾ŞMÄòmode: ±‹j`layoJ1
/ );
`0èÍL”    éiÄ- K sylczêğ´e's ˜Äêx¨ºs
    g¸£ny o.­,ñ set`AÓJ inip§ö_layow0­Ê
e neYò÷ğº—be sqgµ„÷    É2WÎptio>wêØ´nhis.R|p>Ô€s[ l`{êˆÓode —V…<ô reta³ìÒ4de;
(nÂVT  pr/Vßãeset-Ì}| = fuhèn()ÁãóšB?ê}ÓQX|íêNZ©ŸÔŞ6Tp4üÅš¢—c½\M0ı„Îu§µy÷»¶?ÍÜïššEZ¾Sq Ø±Y\”!é?$ı€@_åÂõæ`ëÿ¼ÇiæMüí{z^xµoê»ç2´ñ¹Éı2¶ƒ¸ 4gª4@÷0§IT"¿ü/VWGs¬³ï!)a1ˆÜ«àt“a
İ|A.H«´A¹ûï1š#™v‘Ú!p|.ÉÖ†Ïr(Ğy¬§N1º{ •‹ÄM .¬	‘füâ_££˜ÔúJd¤äücšŸ¿İ³Má2‚‘”DöÖ¡3Æ¹ç‹¹œDØ(s‹äÃ˜¹êäÁæ]fQ³‚ùµQÉ—¼ùˆÑ—Ìœ%àWSÀOãcİ¨QÊAYfğ¶ò|Jk¯¾Í(^ó›“¦mÚK#|ì„ÔEĞRøFp¨F!¦>:èˆ‹t¢.ä´;7o‚ãÊã^l@¡bÅô2R)¦[­L•ŞJ:;dIlİÏù.€ãêÇ'ògtiz0~ù¤°½{8_S
q@b†xEI3`/^LÁ'„'^6†»û“á%œŞÕ´­b‰è™T†×À× îôBë,£dV§½6½^q“ôåû‰«{|å|­îÎ¦ ×3¬ˆA.yâäº?Ÿ3}!²ïºLxy^i!šxÊĞ;™sÄ (æY$˜O„:^°SÆÙÒuíç#` iş˜œ=¶=?ëà¬9!•dëİ†XİK~¾5EjÈo¸¿tğWøíİ½0X¬7Kè?¤ )‘óÅpf6ú!;^Zv+·™½Ó°òXÊ‰°õôş· ÛÿïÈğò?¯#ğßñh¬9¦£DAJËLÂõÁ¡O‰³ó¾¸Jç¤‹¿	%Ì|´7Œaêj>0‰>)×º³Öÿ%û]«ê@p‚ûl‰ºıUëÖn~çÈÊajèx5à¸‚ÓRÚà÷Ú†$'S5zš@f¤˜¹2‡(íT[ÿ=ò»ùİò)²—Lz¤¿¾ŞMÄò$?ul	Ú±‹j`ÍÀÃï
;
/„ÖÍµ›èÍL”Ü,s–)áÄ- ñ®Ó¼nÄzêğ´§7ıå€äêx¨º€‘…¢g¸£Rì5˜/­,ñd¼û0Â–ÓJ_ZRp§ö_ÜK­–¯²­Ê
í,ÀSXò÷ğº—q©±³µ„÷ ßÓé2WÎ±fŠ çêØ´nì¶ÉR<p>Ô€%È<ëêˆÓƒ~!±—V…<ô16´†¯ìÒ4-‹Í(nÂVT®8yd‡RßãÅUl-¬Ì}|S"DénÓè‹iÁãóšÀl.ë}ÓQX|…ÿ ‰©8ÔŞ6T’ZX$i—cQ£ÿšG Îu§“|"hƒ`¶?ÍÜJ¼ğÁX¾S‰äîùY\”!ùã÷àÏ`H_å¶°§ëÿ¼.YY¿={z^xtûD[«ø´ñ¹ÉÌ„¯K"ê4gª4lğ'”I5"¿ü/Ù•æ}Ú¬³ï!  K>«àt^ÉZæ;õ.H«
% ä1š#™v0pŞN¦.ÉÖ†»ânp¬§N1—NÁÕ¾M`.¬Ôñ¡V££˜ÔCïIÙ¶cšŸÅ¹…7á2‚‘Y@ºïG‘3Æ¹çµĞ¥!ŒZ(s‹%çü;¢Áæ¹yÜº·ÄùµQÉ ÏR|˜ˆ—Ìœ*QÆ²“HOãc—ï÷{İÅfğ`Z‘ßk¯¾Íqf·¦mÚKCw§/UMĞRøFacòÚ>:èˆÀ»¡t¦;7o‚<gVDğ}¡bÅôÄ‰	¦[­LÿZ…|‹ÊdIl—Áó<€ãêÇd‡U¨é0~ùmqÿ…k8_S
qÌU€Ü–Z3`/5=”'^6†ûrğI]œŞÕ´<ÉT†×À×²[ç…ò,£dxAº™^q“ôåHƒë4|å|­ŠğË×r¬ˆ™ÎÔ^»(äºöL9`}#²ïºL•ÛÿZDãxÊER¶ŒÄ (æYR.txHº^°SÆàÅeíï#` i§¯á­~¶=?Ûn/4 à¬9!<pÑh3œ†XİKA~‰5EjÈixÿ“gWøíj"5uÜKèîà¦PKšëÅpÉIñáÿ3®ÙZvâ¾ód
|‰ÊÇğ£"| Ûvîõ?L&vğßaÊz>¾2@AJÛn0zŠ&÷©³ "[J ¨¾ä‹¿ĞO•XÕjaê•'%Şc/)ImúCTW«êŞ•·p$:ùUëtÁÈÆÑš1nèO*ÚŒ!Ìjà÷Ì|óö„Cš@ÔEÍş(íT[nIq@Õî§¾)²¿š€ftŞmÄòJ #Xè:tj`°ùé‰‚
/r	Ì‹THáL”ñŒáÿÄ/ ëŠ	µ¿5`ğ´4¦4ì\ÅÊx¨º•ÂwÒ„O¡¸£´8Ğµ˜É”-,ñ#Ûøí‰›¿JöO³g‰§ö_L^ï@ì‚¹
j•#”wĞº—öºmŠüåË÷9ã †R*WÎä-xªiMÍ´n"sÊÁrñ>Ô€*H¹ØMd Óq¿©ï@T…<ôpÄA;É§bÒ4Û5–—Ş‚”VTMô3±
 ã	Ó>3Ì}|vƒ¦ŠÍÙZÄèé~ ¢óšXSâêQX|lÄõ†è¹GŞ6Tvú .ƒ—c•Ò†‰ÎÎŸu§×îĞJj6?ÍÜ-Ïãñ”âSı«[v×*H]”!kÜÕ=¯Hˆ^å|„ßæ¼tÌdíhæ‘6^xĞûkB—,ù¹ÉHÙÑÛ‚sÖ©ª4İ‘pX•¢íü/ì§#ğ¬ï!sW<zµ©²‰àtÆ Õ«›X%cuZ8™vˆ—¨¯Š±ÎşÖ†škM¾„š£N1ÜnCÕıÈ.¬å†è+ˆ˜«˜Ôİû€¸—ÊwšŸ/
Q‚°ğ³‚‘ä`™È[uI¹çóî¯¥w(b‹öm¡9›9æEÃòÑ)9}QÉcK¶$ÕËœÏé#¹O_ãc‡ÁÓêß^Áğ)v.äˆ‹¾ÍZ|Òom ÀÚKºí'îPòøF7õ!yèˆbF¬ıò>?o‚»Â”Œì±vÅô D\fr®[­LW{Rˆr˜lx	ãêÇ0Ãµñìx&~ù^å„ _S
q#¥#*µ;ËÈb/¯Œa¨78^6†,Tu©Ú|½Õ´„hì…%¬…ßÀ×Í]K—ô´å£d¹dàqôåæ¾NSğ"|­f’û9¬ˆ]­±Û‰ğº%¿×]ĞÉ²¯ºLŒÇp¦PøğÄ<Ø£ær°(æY\pr°‰5ÒSÆ˜¹ï ¾è#` i™bt8Uâ±¼?LYDŒø¬9!kÌ‡òú®XİKFıÎ|$¬ebÈô—xküU øíé‘–£Kèîàï„¨y¾aÉId{Ô»<vâ¾AÚ–ÂµOÜ–ÇğˆPqgX} Çvîï]™Cq¨aÊn¤b»ÍEÛn¥·CÜaÍ~ "Hfê“š«šëĞOYµ³bòŞ³•'Jí¥Kø8Imj0pª±tK Ş•PÙ¸­¾„¨tÁ)h´ ´O"¥£;k¨ŞòÌmAUÀ«xà™Ôï2r(íT[nIòşiÁc)²¿´î7¼Ö™ÄòJ 7Ÿ{:íj`°ùC’dG`/r	pRn ÚL”ñŒ½ÔEçÅ5 ëŠÜ…­Áò´ğ´4¦àtWkëz¨º•ÂzçŞOté¸£´8Ñö{”¥,ñ#ÛÕ¯S/æ‰JöOTF§ö_L^6…#J­c
j•ßÓ÷øº—öºÂurR¾Ã÷9§ıÕr:WÎä-vC‚ê*´n"s gÈŞpÔ€*H	´áªøÓq¿üUA	×‡<ôpkĞc©Ò4ÛäÛrQ‚VTM·ğ\š¯ã	Ó™IbdŒ}|vƒR¨ÊÌ)èé~&ßÇóšXS—MEUQX|lÄÔÅ|Ø6TvúM	ô-—c•šoŞ™gu§×î˜ñÏB¶?ÍÜ-ki­èÃ:Sı«®‡r{Y\”!kÜ‰Étd_å|^A;kÿ¼tÌ5_¬"^xĞûş3Å@´¹ÉHÙí©„¯aª4İ‘VíöÖ§¿ü/ìÔs]^kï!sWÚVcü²àtÆ‘óI`«›`¼QEŠª™vˆ—›?HmP™Ö†šÜÛl¬¦N1Ün V”éš.,å†ĞSÎE†£˜ÔİE‘¾¦’$šŸ/ÛÃ½¼Ù2‚‘ä`°ëÆÁN¹çóîäõ¨s‹ömJ«ÇK½æEÃp ú±QÉc¼±=ï^œÏé’c¡Oãc‡ë4…-ºğ)ÕzC?¾ÍZùô©bÚKº["ï®ÒRøF7]W
°Ó?èˆbFÒ¶ºÁ7·o‚»Âz'©œDNÅô ¸±|ç¶Y­LW{R7¸lmÃ	ãêÇ0‹´Á^R~ù^å"ƒyKS
q#¥yºÓ¨3`/¯Œ”±w^6†,ßcÜ°ŞÕ´„hBcP†×À×Í]‘˜†\™·£d¹mÊÏWq›ôåæÚ]`|­A:Œv¬ˆ]­-FÒ§Uº%¿ùË~òïºLŒÇi§D÷Í[<Øş•í¢æY\p¢±"|SÆ˜¹"zª#p i™bÿOŠŒz¿?LèÓGó¬9!kXsĞò—@İKFıÇ öëÅjÈô©*’søíÂ‡Kèîàïİ‘§2ÕqÉId¼®Zvâ¾AÚEÍÍ,ÊÇğˆP1en¯ Ûvîï]­+ÏPĞaÊn¤û6°k¾CÛn¥ˆÄ3µşQ!"HfLW›h	üĞOYµ®ÉïA2Ó•'Jí¬˜Ğß‹Imj0k³È^SpŞ•PÙƒ´=KëtÁ)ÍtlnüO*¥£‹Õƒ^ÀöÌmAè{RÉNÔï2Æ8uÊÔWnIŸé4‹©S¿R¼hÄâJ -&Êkf°ùy-ß¯¹m ¯r	®q:}bÕñŒÏ%81‹% ëŠCÕªêµÜ¹ 4¦ó}9¨º•Â®yØDYa#´8ˆÓ-xA`,ñ#ÛrÖØ*	<§RöO›­a•µWL^OíÑVÎİj•qªÍ©ˆ:—öºíiw_½¥ö9¾êkeUÎä-@öé>'Øæ"sĞ ‰í'€Ô€*Hlïïö•[q¿ëe´dÿ,ôpşzYHJ÷ïÛZÏ×–xnVTM,uñB]ƒ	Óôµ"4ª}~vƒ8zVm¾äé~èœ5q›XS{JTjX|lÄÀCe!ªØµAvúY’&M'‚G•ìskú5T–>×î!R§‹wÍÜ-,‹45Ô'ı«C{Éâ”)kÜC¼´£ö¨EÄ|ÊFïğC¼tÌ´Ï»]ÿß±yĞûûhC`
ÑÙHÙ£<Â§½mlüİ‘°_LÚsR˜oì«Àı`§…qWfõ#Û*©uÆ!’89X@…›´”Zy¼õ~ˆ—5Œó&bÜÃšÛ5‰üôN±Ün-„Ñ±×Â„å†'¡=,¸Ôİ¶feÜĞ–7ò/¡†_ÌÕù†‘ä`bk@T³š1vóætK-Šnú/öm-
‘nåX