/**
 * Expansion of native Function
 * 
 * @author  hechangmin@gmail.com
 * @date	2014.8
 */

extend(Function.prototype, {

	/**
	 * ecmas5 强制绑定this,及绑定参数
	 * @param  {Object} thisArg 
	 * @return {Function}  
	 */
	bind : function(thisArg){
		var f = this,
			slice = Array.prototype.slice,
			args = slice.call(arguments, 1);
		return function() {
			return f.apply(thisArg, args.concat(slice.call(arguments)));
		};
	}
}, false);