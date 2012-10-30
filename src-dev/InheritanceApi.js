/*
* Class function
* version 1.0
* from Luca Lazzarini ( lzzluca@gmail.com  http://nerdstuckathome.wordpress.com/ )

* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.

* On the web:
* http://nerdstuckathome.wordpress.com/http://nerdstuckathome.wordpress.com/2012/11/14/a-class-function-to-define-classes-in-javascript-with-mootools-like-syntax/
* https://github.com/lzzluca/Class/
*/

(function (host) {

    /*
     * @static @class InheritanceApi
     * Container of inheritance api: Extend and Implement (and Utils as common utilities container) .
     * This is the interface: the null properties are valorized in other modules.
    */

    var InheritanceApi = {

        /*
         * @static @class Utils 
         * Container of utilities needed in all InheritanceApi's modules
        */

        Utils: {

            /*
             * @static @class Prototype
             * Basic Prototype utilities
             */

            Prototype: {

                /*
                 * name: clone
                 * This function clone an object's prototype avoiding the call to its constructor
                 * @param {Object} obj The target prototype
                 * @returns {Object} The clone
                 */
                     
                clone: function(obj) {
                    if( !(obj instanceof Object) ) return obj;
                    var clone = function(){};
                    clone.prototype = obj;
                    return new clone();
                }
            },

            /*
            * name: clone
            * Nice object cloning function from:  
            * http://stackoverflow.com/questions/728360/copying-an-object-in-javascript/728694#728694
            * Cloning function
            * @param {Object} The object to clone
            * @return The clone
            */

            clone: function(obj) {
                var copy;

                switch( typeof obj ) {
                    case "object":
                           if(obj == null) {
                                copy = null;    
                            }
                            else if(obj instanceof Date) { // handle Date
                                copy = new Date();
                                copy.setTime( obj.getTime() );
                            }
                            else if (obj instanceof Array) { // handle Array
                                copy = [];
                                for (var i = 0, len = obj.length; i < len; ++i) {
                                    copy[i] = this.clone( obj[i] );
                                }
                            }
                            else {
                                copy = {};
                                for (var attr in obj) {
                                    /*TODO:if (obj.hasOwnProperty(attr))*/ copy[attr] = this.clone( obj[attr] );
                                }
                            }
                            break;
                    case "boolean": // handle immutable type and default (for example function)
                    case "string":
                    case "number": 
                    default:
                            copy = obj;
                            break;
                }

                return copy;
            },

            /*
            * name: jQuery_extend
            * The extend function from jQuery 1.7.1
            * More informations here: http://api.jquery.com/jQuery.extend/
            */

            jQuery_extend: null /* filled in jQuery_extend.js module */

        }, // Utils end

        Extend: null, /* filled in Extend.js module */
        Implement: null /* filled in Implement.js module */
    };

    host.InheritanceApi = InheritanceApi;

})(window);
