/**
 * Expansion of native Array
 *
 * @author  hechangmin@gmail.com
 * @date    2014.9
 *
 * 暂不扩展如下函数：
 *
 * Array.prototype.copyWithin
 * Array.prototype.entries
 * Array.prototype.fill
 *
 */

extend(Array.prototype, function() {
    /**
     * -检查对象合法化
     *
     * @param  {Object} obj
     * @throws {TypeError}
     * @return {Object}
     */
    var getThisObj = function(obj) {
        if (obj === void(0) || obj === null) {
            throw new TypeError(" this is null or not defined");
        }

        return Object(obj);
    };

    /**
     * -检查参数是否可以被调用
     *
     * @param  {Function} callback
     * @throws {TypeError}
     */
    var checkCallable = function(callback) {
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }
    };

    /**
     * 缩并[反向]
     *
     * @throws {TypeError}
     * @param  {Function}
     * @param  初始值
     * @return
     */
    var reduceRight = function(fn, initialValue) {
        var previous = initialValue,
            nIndex = this.length >>> 0;

        checkCallable(fn);

        if (initialValue === undefined) {
            previous = this[nIndex - 1];
            nIndex = nIndex - 1;
        }

        while (nIndex--) {
            previous = fn(previous, this[nIndex], nIndex, this);
        }

        return previous;
    };

    /**
     * 缩并
     *
     * @throws {TypeError}
     * @param  {Function}
     * @param  初始值
     * @return
     */
    var reduce = function(callback, initialValue) {
        var previous = initialValue,
            nIndex = 0,
            len = this.length >>> 0;

        checkCallable(callback);

        if (typeof initialValue === "undefined") {
            previous = this[0];
            nIndex = 1;
        }

        while (nIndex < len) {
            previous = callback(previous, this[nIndex], nIndex, this);
            nIndex++;
        }

        return previous;
    };

    /**
     * 对数组中每个元素都调用函数fn执行
     *
     * @throws {TypeError}
     * @param  {Function}
     * @return
     */
    var forEach = function(callback, thisArg) {
        var O = getThisObj(this);
        var len = O.length >>> 0;
        var index = 0;
        var item;

        checkCallable(callback);

        while (index < len) {
            if (index in O) {
                item = O[index];
                callback.call(thisArg, item, index, O);
            }
            index++;
        }
    };

    /**
     * 找到满足fn执行为真的第一个元素
     *
     * @throws {TypeError}
     * @param  {Function} callback
     * @return
     */
    var find = function(callback) {
        var nIndex = this.findIndex(callback);
        if (-1 !== nIndex) {
            return this[nIndex];
        }
    };

    /**
     * 找到满足fn执行结果正确的第一个元素下标
     *
     * @throws {TypeError}
     * @param  {Function} callback
     * @return
     */
    var findIndex = function(callback) {
        var item, nIndex = -1;

        checkCallable(callback);

        for (var i = 0, len = this.length >>> 0; i < len; i++) {
            item = this[i];
            if (callback(item, i, this)) {
                nIndex = i;
                break;
            }
        }
        return nIndex;
    };

    /**
     * 检查是否存在该元素
     *
     * @throws {TypeError}
     * @param  value
     * @return {Boolean} -1, 则没有
     */
    var include = function(value) {
        return -1 < this.indexOf(value);
    };

    /**
     * 获取元素在数组中的序号
     *
     * @param  searchElement
     * @param  [fromIndex] 可选
     * @return {Number} -1, 则没有
     */
    var indexOf = function(searchElement, fromIndex) {
        var k;

        var O = getThisObj(this);
        var len = O.length >>> 0;

        if (len === 0) {
            return -1;
        }

        var n = +fromIndex || 0;

        if (Math.abs(n) === Infinity) {
            n = 0;
        }

        if (n >= len) {
            return -1;
        }

        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        while (k < len) {
            if (k in O && O[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };

    /**
     * 获取元素在数组中出现的最后序号
     *
     * @throws {TypeError}
     * @param  searchElement
     * @param  [fromIndex] 可选
     * @return {Number} -1, 则没有
     */
    var lastIndexOf = function(searchElement) {
        var n, k,
            t = getThisObj(this),
            len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }

        n = len - 1;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) {
                n = 0;
            } else if (n !== 0 && n != (1 / 0) && n != -(1 / 0)) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }

        for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };

    /**
     * 找到满足fun执行结果正确的所有元素
     *
     * @throws {TypeError}
     * @param  {Function}
     * @return {Array}
     */
    var filter = function(fun /*, thisArg */ ) {
        var t = getThisObj(this);
        var len = t.length >>> 0;
        checkCallable(fun);
        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];
                if (fun.call(thisArg, val, i, t)) {
                    res.push(val);
                }
            }
        }

        return res;
    };

    /**
     * 所有元素能让fn为真就返回真
     *
     * @throws {TypeError}
     * @param  {Function} 处理函数
     * @param  {Object} [thisArg] 可选
     * @return {Boolean}
     */
    var every = function(callbackfn, thisArg) {
        var k = 0;
        var O = getThisObj(this);
        var len = O.length >>> 0;
        var item, testResult;

        checkCallable(callbackfn);

        if (len === k) {
            return false;
        }

        while (k < len) {
            if (k in O) {
                item = O[k];
                testResult = callbackfn.call(thisArg, item, k, O);

                if (!testResult) {
                    return false;
                }
            }
            k++;
        }
        return true;
    };

    /**
     * 任何一个元素能让fn为真就返回真
     *
     * @throws {TypeError}
     * @param  {Function} 处理函数
     * @return {Boolean}
     */
    var some = function(fn) {
        var len = this.length >>> 0;
        callbackfn(fn);

        for (var i = 0; i < len; i++) {
            if (fn(this[i], i, this)) {
                return true;
            }
        }

        return false;
    };

    /**
     * 数组每个元素重新装箱
     *
     * @throws {TypeError}
     * @param  {Function} 处理函数
     * @return {Array}
     */
    var map = function(fn) {
        var result = [];
        var len = this.length >>> 0;

        callbackfn(fn);

        for (var i = 0; i < len; i++) {
            result.push(fn(this[i]));
        }
        return result;
    };

    /**
     * 去重(顺带把null也去掉)
     */
    var unique = function() {
        var item, len = this.length;

        for (var i = 0; i < len; i++) {
            item = this[i];
            for (var j = len - 1; j > i; j--) {
                if (this[j] === item) {
                    this.splice(j, 1);
                    //谨防漏掉
                    j++;
                    len = this.length;
                }
            }
        }

        return this;
    };

    var max = function(){
        return Math.max.apply(this,this);
    };
    
    var min = function(){
        return Math.min.apply(this,this);
    };

    /**
     * 随机返回数组元素
     */
    var random = function() {
        var i = Math.round(Math.random() * (this.length - 1));
        return this[i];
    };

    return {
        reduceRight: reduceRight,
        reduce: reduce,
        forEach: forEach,
        find: find,
        findIndex: findIndex,
        include: include,
        indexOf: indexOf,
        lastIndexOf: lastIndexOf,
        filter: filter,
        every: every,
        some: some,
        map: map,
        unique: unique,
        random: random,
        max: max,
        min: min
    };
}(), false);