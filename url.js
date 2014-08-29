/**
 * url 相关操作封装
 * 
 * @author  hechangmin@gmail.com
 * @date	2010.5
 */

exportTo('Utils.URL', function(){

	/**
	 * 从当前url中获取参数
	 *
	 * @param {Object} name
	 */
	var getParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = (unescape(decodeURI(window.location.search))).substr(1).match(reg);
		
		if (r !== null){
			return unescape(r[2]);
		}
		
		return '';
	};

	/**
	 * 更改页面URL参数并跳转
	 *
	 * @param {String or Object} names
	 * @param {String or null} value
	 */
 	var setParam = function(names, value){

		var queryString = document.location.search;

		function generateQueryStr(key, val){
			var patt = new RegExp('([?&])' + key + '=[^&=]+', 'ig');
			queryString = queryString.replace(patt, '');

			if(val !== null){
				queryString += '&' + key + '=' + val;
			}
		}

		if('string' === typeof name){
			generateQueryStr(name, value);
		}else{
			for(var k in name){
				generateQueryStr(k, name[k]);
			}
		}

		document.location = '?' + queryString.slice(1);
	};

	return {
		getParam : getParam,
		setParam : setParam
	};
});