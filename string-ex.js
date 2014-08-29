/**
 * Expansion of native String
 * 
 * @author  hechangmin@gmail.com
 * @date    2010.5
 */

extend(String.prototype, {

    //去除字符串前后空格
    trim : function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    },

    //去除左边空格
    ltrim : function() {
        return this.replace(/(^\s*)/g, "");
    },
    
    //去除右边空格
    rtrim : function() {
        return this.replace(/(\s*$)/g, "");
    },

    //避免XSS 攻击
    avoidXSS : function() {
        var m = {
            "<": "&#60;",
            ">": "&#62;",
            '"': "&#34;",
            "'": "&#39;",
            "&": "&#38;"
        };
        return this.replace(/[&<>"']/g, function (s) {
            return m[s];
        });
    },

    //获取字符串的字节长度 汉字默认双字节
    byteLength : function() {
        return this.replace(/[^\x00-\xff]/g, "**").length;
    },

    /**
     * 根据字符长来截取字符串
     * @param 字符最大个数（汉字算双字）
     */
    subStringByBytes : function(maxBytesLen) {
        var len = maxBytesLen;
        var result = this.slice(0, len);

        while(result.byteLength() > maxBytesLen) {
            result = result.slice(0, --len);
        }

        return result;
    },

    /**
     * 除去HTML标签
     * @example 
     * 
     * <div id="test1">aaaa</div>  =>  aaaa
     */
    removeHTML : function() {
        return this.replace(/<\/?[^>]+>/gi, '');
    },

    /**
     * 模板
     * @mark data[$1] 最好能做下XSS 处理
     */
    sub : function(data) {
        return this.replace(/{(.*?)}/igm, function($, $1) {
            return data[$1] ? data[$1] : $;
        });
    },

    /**
     * 格式化字符串
     * @example
     * "<div>{0}</div>{1}".format(txt0,txt1)
     */
    format : function() {
        var args = [];

        for (var i = 1, il = arguments.length; i < il; i++) {
            args.push(arguments[i]);
        }

        return this.replace(/\{(\d+)\}/g, function(m, i) {
            return args[i];
        });
    }
}, false);