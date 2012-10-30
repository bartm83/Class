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
 * function Implement
 * This function implements the "OOP implements logic".
 * The "this" object is assumed to be a function or its prototype in here, as the sub; the superObj is assumed to be the prototype of the function to be extended.
 * There is no limit to the number of function specified by Implements.
 * @param {Function || Object} superObj The function || the function's prototype to be implemented
 *
 * @example:
 * var Sup = function(){},
 *     Sub = function(){};
 * Sup.prototype.iAmAMethod = function(){};
 * Sub = Implement.apply(Sub, [Sup]);
 * (new Sub()).constructor == Sub; // true
 * (new Sub()).constructor == Sup; // false
 * (new Sub()) instanceof Sub; // true
 * (new Sub()) instanceof Sup; // false
 * typeof Sub.prototype.iAmAMethod // "function"
*/

(function(host) {

var Implement = function(superObj) {
    "use strict";
    
    // it assumes that superObj is a function or its prototype

    if( typeof superObj != "object" ) {
        superObj = (superObj && superObj.prototype) || {};
    } 
    else if( typeof superObj == null ) {
        superObj = {};
    }

    var this_proto = this.prototype || this;

    // the properties on the sub override the same name properties on the super (when type == "objects" they are merged)

    for(var prop in superObj) {
        if( typeof this_proto[prop] == "undefined" ) {
            this_proto[prop] = superObj[prop];
        }
        else if( typeof this_proto[prop] == "object" && typeof superObj[prop] == "object" ) {
            XD.Utils.jQuery_extend(true, this_proto[prop], superObj[prop]);
        }
    }

};

host.InheritanceApi.Implement = Implement;

})(window);
