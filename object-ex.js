/**
 * Expansion of native Object
 * 
 * @author  hechangmin@gmail.com
 * @date    2014.8
 */
extend(Object.prototype, function(){

    var idOfObj = 0;
    /**
     * 给对象一个ID
     * @return 
     */
    var id = function(){
        if(!this.__id__){
            this.__id__ = ++idOfObj;
        }
        return this.__id__;
    };

    return {
        id: id
    };
}(), false);