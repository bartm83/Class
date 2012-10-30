/*
* Class function
* version 1.0
* from Luca Lazzarini ( lzzluca@gmail.com  http://nerdstuckathome.wordpress.com/ )

* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.

* On the web:
* http://nerdstuckathome.wordpress.com/http://nerdstuckathome.wordpress.com/2012/11/14/a-class-function-to-define-classes-in-javascript-with-mootools-like-syntax/
* https://github.com/lzzluca/Class/
*/

/**
 * function Extend
 * This function implements the "OOP extends logic".
 * The "this" object is assumed to be a function or its prototype in here, as the sub; the superObj is assumed to be the prototype of the function to be extended.
 * A function can extend only one other function.
 * @param {Function || Object} superObj The super function || the super function's prototype
 *
 * @example:
 * var Sup = function(){},
 *     Sub = function(){};
 * Sub = Extend.apply(Sub, [Sup]);
 * (new Sub()).constructor == Sub; // false
 * (new Sub()).constructor == Sup; // true
 * (new Sub()) instanceof Sub; // true
 * (new Sub()) instanceof Sup; // true
 */

(function(host) {

var XD = host.InheritanceApi;

var Extend = function(superObj) {
    "use strict";

    // it assumes that superObj is a function or its prototype

    if( typeof superObj != "object" ) {
        superObj = (superObj && superObj.prototype) || {};
    }
    else if( superObj == null) {
        superObj = {};
    }

    // prototype is a clone of superObj: prototypal inheritance here

    var prototype = XD.Utils.Prototype.clone( superObj );

    // the clone gets properties from the sub; the properties on the sub override the same name properties on the super (when type == "objects" they are merged)

    for(var prop in this.prototype) {

            // objects merging

        if( typeof prototype[prop] == "object" && typeof this.prototype[prop] == "object" ) {
            XD.Utils.jQuery_extend(true, prototype[prop], this.prototype[prop]);
        }
        else {

	    // override

            prototype[prop] = this.prototype[prop];
        }

    }

    // here the properties with type == "function" are wrapped, to set the caller property used by the parent method

    var val;
    for(var prop in superObj) {

        val = prototype[prop];

	if( typeof val == "function" && typeof superObj[prop] == "function") {
            prototype[prop] = (function(originalFn, lprop) {
                return function() {
                    var ret;
                    this.$caller = lprop;
                    ret = originalFn.apply( this, arguments );
                    this.$caller = undefined;
                    return ret;
                }
            })( val, prop );
            break;
        }
    }
  
    prototype.$parent = superObj.constructor;

    this.prototype = prototype;
};

host.InheritanceApi.Extend = Extend;

})(window);
