/**
 * 提供命名空间及对象扩展
 *
 * @author  hechangmin@gmail.com
 * @date    2014.8.28
 */

(function() {
    var isType = function(type) {
        return function(obj) {
            var strFullType = Object.prototype.toString.call(obj);
            var curType = strFullType.split(' ')[1].split(']')[0];

            //The results of window is global, but should be object.
            if('Object' === type && curType === 'global'){
                return true;
            }else{
                return type === curType;
            }
        };
    };

    //类型判断
    var isObject = isType('Object');
    var isError = isType('Error');
    var isArray = Array.isArray || isType('Array');
    var isFunction = isType('Function');
    var isString = isType('String');

    /**
     * 继承与扩展
     *
     * @param {Object} target
     * @param {Object} source
     * @param {Boolean} overwriteable true 默认是可覆盖
     * @return {Object} 经扩展后的target
     */
    var extend = function(target, source, overwriteable) {
        
        if(!isObject(source)){
            return target;
        }

        // why target don't use isObject, String.prototype\Function.prototype\Array.prototype
        // result of typeof null is object
        if('object' !== typeof target || null == target){
            return target;
        }

        if (undefined === overwriteable) {
            overwriteable = true;
        }

        for (var key in source) {

            if (!overwriteable && undefined !== target[key]) {
                continue;
            }

            if (isObject(source[key])) {
                //递归
                target[key] = arguments.callee({}, source[key]);
            } else {
                target[key] = source[key];
            }
        }

        return target;
    };

    /**
     * 生成名字空间
     *
     * @param {Object} context 上下文环境
     * @param {String} namespaces
     * @return {Object} 生成或已有的对象
     */
    var createNamespaces = function(context, namespaces){
        var names = namespaces.split('.');
        var parentNode;
        var curNode;

        //生成命名空间树
        for (parentNode = context; names.length && (curNode = names.shift());) {
            parentNode = parentNode[curNode] ? parentNode[curNode] : parentNode[curNode] = {};
        }

        return parentNode;
    };

    /**
     * 导出对象到指定名字空间
     *
     * @param {String or Object} target 目标模块
     * @param {Function or Object} source 模块
     * @throws {Error} If params TypeError
     *
     * @example
     *  exportTo('M0.M1.M2', {name : 'hello world.'});
     *  exportTo('M0.M1', function(){return {age : 5000};});
     */
    var exportTo = function(target, source, overwriteable) {
        var hasDefine = typeof define === 'function';
        var hasExports = typeof module !== 'undefined' && module.exports;
        var isFnSource = isFunction(source);

        // AMD Module or CMD Module
        if (hasDefine && isFnSource) {
            define(source);
        }else {
            source = isFunction(source) ? source() : source;
            //NodeJS Module    
            if (hasExports) {
                module.exports = source;
            } else {
                // Assign to namespaces or simply the global object (window)
                if (isString(target)) {
                    target = createNamespaces(this, target);
                }
                if (isObject(source)) {
                    if (isObject(target)) {
                        extend(target, source, overwriteable);
                    } else {
                        throw ('target must be a string or object.');
                    }
                } else {
                    throw ('source must be a function or object.');
                }
            }
        }
    };

    exportTo(this, {
        isObject: isObject,
        isError: isError,
        isArray: isArray,
        isFunction: isFunction,
        isString: isString,
        extend: extend,
        exportTo: exportTo
    });
}());