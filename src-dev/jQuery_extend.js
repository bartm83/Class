/*
* Class function
* version 1.0
* from Luca Lazzarini ( lzzluca@gmail.com  http://nerdstuckathome.wordpress.com/ )

* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.

* On the web:
* http://nerdstuckathome.wordpress.com/http://nerdstuckathome.wordpress.com/2012/11/14/a-class-function-to-define-classes-in-javascript-with-mootools-like-syntax/
* https://github.com/lzzluca/Class/
*/

/*
 * name: jQuery_extend
 * The extend function from jQuery 1.7.1
 * More informations here: http://api.jquery.com/jQuery.extend/
 */

(function (host) {

    var jQuery_extend = function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && typeof target != "function" ) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if ( length === i ) {
            target = this;
            --i;
        }

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( typeof copy == "object") || (copyIsArray = (copy instanceof Array) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && (src instanceof Array) ? src : [];

                        } else {
                            clone = src && (typeof src == "object") ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = this.jQuery_extend( deep, clone, copy );

                    // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    host.InheritanceApi.Utils.jQuery_extend = jQuery_extend; 

})(window);
