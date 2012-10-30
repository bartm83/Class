/*
 * Class function
 * version 1.0
 * from Luca Lazzarini ( lzzluca@gmail.com  http://nerdstuckathome.wordpress.com/ )
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
 *
 * On the web:
 * http://nerdstuckathome.wordpress.com/http://nerdstuckathome.wordpress.com/2012/11/14/a-class-function-to-define-classes-in-javascript-with-mootools-like-syntax/
 * https://github.com/lzzluca/Class/
 */

/**
 * @class Class 
 * This function implements the "OOP class logic".
 * Keywords: Extends, Implements and the parent method. The method "initialize" is intended as contructor of the class.
 * @param {Object} obj The definition of the class
 * @return {Function} The new type 
 *
 * @example:
 * // Extend feature:
 * var Super = new Class({
 *   name: "super",
 *   initialize: function() {
 *       console.log("initializing " + this.name + " ...");
 *   },
 *   getName: function(){
 *       alert(this.name);
 *   }   
 * });
 * var Sub = new Class({
 *   Extends: Super,
 *   initialize: function(options) {
 *       if( !(options instanceof Object) ) options = { name: "sub"};
 *       this.name = options.name;
 *       this.parent();
 *   }
 * });
 * var mySub = new Sub(); // prints sub
 * mySub.constructor == Super; // true
 * mySub instanceof Super; // true
 * mySub instanceof Sub; // true
 * mySub.getName(); // alert sub
 *
 * // Implement feature:
 * var Sub = new Class({
 *   Implements: Super,
 *   name: "sub",
 *   initialize: function(options) {
 *      this.parent(): 
 *   }
 * });
 * var mySub = new Sub(); // prints sub 
 * mySub.constructor == Sub; // true
 * mySub instanceof Sub; // true
 * mySub instanceof Super; // false
 * mySub.getName(); // alert sub
 *
 * Prototypal chain "is broken":
 * var Test = new Class({
       iAmAnArray = [0,1,2,3]
 * });
 * var test = new Test();
 * test.array[0] = "hello!";
 * console.log(test.array[0]); // prints ["hello!",1,2,3]
 * console.log(Test.array[0]); // prints [0,1,2,3]
*/

(function(host) {

var XD = host.InheritanceApi;

var Class = function(obj) {
    "use strict";

    var fn = function() {
        for(var prop in this) {

            // the goal is to avoid serching properties up on the prototype chain. This code avoids properties eventually defined inside the constructor (called after the loop)

            this[prop] = XD.Utils.clone( this[prop] );
        }

        return this["initialize"] ? this["initialize"].apply( this, arguments ) : this;
    };

    // avoiding the prototypal inheritance

    for(var prop in obj) {
        fn.prototype[prop] = obj[prop];
    }

    // applies extend and implement
    
    obj.Extends && XD.Extend.apply( fn, [obj.Extends] );

    if(obj.Implements) {
	for(var i = 0, list = (obj.Implements instanceof Array) ? obj.Implements : [obj.Implements]; list[i]; i++) {
	        XD.Implement.apply( fn, [list[i]] );
    	}
    }

    // adds parent method 

    fn.prototype.parent = function() {
        var fn = this.$parent && this.$parent.prototype[this.$caller];
        if(fn)
            fn.apply(this, arguments);
    }

    // cleans the function

    delete fn.prototype.Extends;
    delete fn.prototype.Implements;

    return fn; 
};
//Class.prototype.finals = {};
//Class.prototype.finals.CONSTRUCTOR_ID = "initialize";
//Class.prototype.options = {
//    prototypalChain: true
//};

host.Class = Class;

})(window);
