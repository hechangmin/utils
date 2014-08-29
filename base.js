/**
 * 提供基础、常见函数的封装
 *
 * @author  hechangmin@gmail.com
 * @date    2014.8.28
 */

var isType = function(type) {
    return function(obj) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    };
};

//类型判断
var isObject   = isType('Object'); 
var isError    = isType('Error');
var isArray    = Array.isArray || isType('Array');
var isFunction = isType('Function');
var isString   = isType('String');

/**
 * 继承与扩展
 * 
 * @param {Object} target
 * @param {Object} source
 * @param {Boolean} overwriteable true 默认是可覆盖
 */ 
var extend = function(target, source, overwriteable){
    
    if(undefined === overwriteable){
        overwriteable = true;
    }

    for (var key in source) {

        if(!overwriteable && undefined !== target[key]){
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
 * 遍历
 * 
 * @param {Object} obj
 * @param {Function} cb
 * 
 */ 
var each = function(obj, cb){
    var i = 0;
    for(var key in obj) {
        if(cb(obj[key], key, i++) == 'break'){
            break;
        }
    }
    return obj;
};

/**
 * 生成名字空间
 * 
 * @param {Object} context 上下文环境
 * @param {String} names
 * @return {Object} 生成或已有的对象
 */ 
var createNamespaces = function(context, names){
    var namespaces = names.split('.');
    var parentNode;
    var curNode;
    
    //生成命名空间树
    for (parentNode = context; namespaces.length && (curNode = namespaces.shift());){
        parentNode = parentNode[curNode] ? parentNode[curNode] : parentNode[curNode] = {};
    }

    return parentNode;
};

/**
 * 发布一个模块，支持AMD\CMD\NODEJS\namespaces\对象扩展
 * 
 * @param {String or Object} target 目标模块
 * @param {Function or Object} source 模块
 * @throws {Error} If params TypeError
 * 
 * @example
 *  exportTo('M0.M1.M2', {name : 'hello world.'});
 *  exportTo('M0.M1', function(){return {age : 5000};});
 */
var exportTo = function(target, source){

    var hasDefine = typeof define === 'function';
    var hasExports = typeof module !== 'undefined' && module.exports;

    // 检查模块是否是函数
    var isFnSource = isFunction(source);
    // 检查模块是否是对象
    var isObjSource = isObject(source);

    var curNameNode;

    if(isFnSource || isObjSource){
        // AMD Module or CMD Module
        if (hasDefine) {
            define(source);
        } 
        //NodeJS Module
        else if (hasExports) {
            if(isFnSource){
                module.exports = source();
            }else{
                module.exports = source;
            }
        } 
        // Assign to namespaces or simply the global object (window)
        else {
            if(isObject(target)){
                extend(target, isFnSource? source() : source);
            }else if(isString(target)){
                curNameNode = createNamespaces(this, target);
                extend(curNameNode, isFnSource? source() : source);
            }else{
                throw('target must be a string or object.');
            }
        }
    }else{
        throw('source must be a function or object.');
    }
};
