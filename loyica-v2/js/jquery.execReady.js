/**
 * Replace jQuery's $.fn.ready() function with a mod exec
 *
 * Sites that make heavy use of the $(document).ready function
 * are generally incompatable with asynchrounous content. The
 * the $.fn.ready function only runs once. This script replaces
 * the ready function with a module execution controller that
 * let's us register functions and execute all of the functions
 * as we need them. This is useful after HTML gets injected on the
 * page and we want to rebind functionally to the new content.
 *
 * @author  Miguel Ángel Pérez   reachme@miguel-perez.com
 * @note    Should be placed directly after jQuery on the page
 * 
 */
 // https://gist.github.com/miguel-perez/476046a42d229251fec3
;(function($){
    "use strict";

    /** create mod exec controller */
    $.readyFn = {
        list: [],
        register: function(fn) {
            $.readyFn.list.push(fn);
        },
        execute: function(el) {
            el = el || document;
            for (var i = 0; i < $.readyFn.list.length; i++) {
                try {
                   $.readyFn.list[i].call(el, $);
                }
                catch (e) {
                    throw e;
                }
            };
        },
        clear: function() {
            $.readyFn.list.length = 0;
        }
    };

    /** run all functions */
    /*$(document).ready(function(){
        $.readyFn.execute();
    });*/

    /** register function */
    $.fn.jqReady = $.fn.ready;
    $.fn.ready = function(fn) {
        $.readyFn.register(fn);
        return this; // this is needed for .ready to work as expected in some cases
    };

    /** run all functions */
    $(document).jqReady(function(){
        $.readyFn.execute(this);
        $.readyFn.clear();
    });

})(jQuery);