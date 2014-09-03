/**
 * 针对base.js 单元测试
 * 
 * @author hechangmin@gmail.com
 * @date 2014.9.3
 * 
 * 发现一个问题，我想到的用例，都不会有问题，自己写用例就用测试盲点
 */

var checkRunRet = function(fnName, expectType, params){
    for(var i = 0, l = params.length; i < l; i++){
        if(expectType !== window[fnName](params[i])){
             return false;
        }
    }
    return true;
};

QUnit.test("Test isType in base.js", function(assert) {
    var wd = window;
    var undef;
    var nll = null;
    var obj = {};
    var arr = [];
    var number = 1;
    var fun  = function(){};
    var err  = new Error('err');
    var bool = true;
    var str1 = 'hello world';
    var str2 = new String('hello world');
    var str3 = String.prototype;

    var arrTestCase = [{
        fnName : 'isObject',
        expectTrue : [wd, obj],
        expectFalse : [undef, nll, arr, number, fun, err, bool, str1, str2, str3]
    },{
        fnName : 'isError',
        expectTrue : [err],
        expectFalse : [wd, undef, nll, obj, arr, number, fun, bool, str1, str2, str3]
    },{
        fnName : 'isArray',
        expectTrue : [arr],
        expectFalse : [wd, undef, nll, obj, number, fun, err, bool, str1, str2, str3]
    },{
        fnName : 'isFunction',
        expectTrue : [fun],
        expectFalse : [wd, undef, nll, obj, arr, number, err, bool, str1, str2, str3]
    },{
        fnName : 'isString',
        expectTrue : [str1, str2, str3],
        expectFalse : [wd, undef, nll, obj, arr, number, fun, err, bool]
    }];

    for(var i = 0, item; item = arrTestCase[i++];){
        assert.ok(checkRunRet(item.fnName, true, item.expectTrue) &&
            checkRunRet(item.fnName, false, item.expectFalse), item.fnName + " Passed!");
    }
});

QUnit.test("Test extend in base.js", function(assert) {
    var obj1 = {};
    var obj2 = {name: 'hello'};
    var obj3 = {name: 'world', age : 999};

    var ret1 = extend({}, obj2);

    assert.ok(ret1 !== obj2, 'new obj created!');
    assert.deepEqual( ret1, obj2, "Two objects can be the same in value" );

    extend(obj2, obj3, false);

    assert.equal(obj2.name,  'hello', 'overwriteable = false, 扩展后，不覆盖旧属性!');
    assert.equal(obj2.age,  999, '扩展后，添加新属性成功!');

    extend(obj2, obj3);
    assert.equal(obj2.name,  'world', '扩展后，覆盖旧属性!');

    extend(obj1, 'hello');
    assert.deepEqual( obj1, {}, "非对象处理逻辑OK" );

    extend(obj1, [1,2,4]);
    assert.deepEqual( obj1, {}, "数组的处理逻辑OK" );
});

QUnit.test("Test exportTo in base.js", function(assert) {
    var obj1 = {};
    var obj2 = {name: 'hello'};
    var obj3 = {name: 'world', age : 999};

    exportTo('M0.M1.M2', obj2);
    assert.deepEqual( M0.M1.M2, obj2, "Two objects can be the same in value" );

    exportTo('M0.M1.M2', obj3, false);
    assert.equal( M0.M1.M2.name, 'hello', "不覆盖旧属性测试通过" );    
   
    exportTo('M0.M1.M2', obj3);
    assert.equal( M0.M1.M2.name, 'world', "覆盖旧属性测试通过" );      
});
