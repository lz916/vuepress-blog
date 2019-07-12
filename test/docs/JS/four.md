js的数据类型分两大类。

* 基本数据类型：number,string,bollean,undefined,null。
* 引用数据类型：object,function,array,regExp,date 
要判断变量属于哪种数据类型。通常有以下几种方法。

* typeof
看以下几个列子，就知道typeof的作用了。

        const foo = function() {}
        typeof 1 //"number"
        typeof '1' //"string"
        typeof [] //"object"
        typeof {} //"object"
        typeof false // "bollean"
        typeof null // "object"
        typeof undefined //  "undefined"
        typeof foo // "function"
从上面这些例子可以看出，typeof value返回一个字符串，这个字符串就是对应着变量的数据类型，有number,string,object,undefined,function,bollean这几种。
从上面的列子不难看出，用typeof检测数据类型有一定的**局限性**：
数组和对象返回的都是"object",无法判断变量是数组还是对象。
**特点**
（1）对于基本数据类型，除了**null返回object**,其余的都返回正常的结果。
（2）对于引用类型，除了**function返回function**,其余都返回object。
* instanceof
instanceof用来检测A是B的实列，返回的结果是一个boolean值**（检测的是原型）**

* Object.prototype.toString
toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object Xxx] ，其中 Xxx 就是对象的类型。

        Object.prototype.toString.call('') ;   // [object String]
        Object.prototype.toString.call(1) ;    // [object Number]
        Object.prototype.toString.call(true) ; // [object Boolean]
        Object.prototype.toString.call(Symbol()); //[object Symbol]
        Object.prototype.toString.call(undefined) ; // [object Undefined]
        Object.prototype.toString.call(null) ; // [object Null]
        Object.prototype.toString.call(new Function()) ; // [object Function]
        Object.prototype.toString.call(new Date()) ; // [object Date]
        Object.prototype.toString.call([]) ; // [object Array]
        Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
        Object.prototype.toString.call(new Error()) ; // [object Error]
        Object.prototype.toString.call(document) ; // [object HTMLDocument]
        Object.prototype.toString.call(window) ; //[object global] window 是全局对象 global 的引用
