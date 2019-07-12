js的深浅拷贝需要从js的数据类型说起：
### js的数据类型
* 基本数据类型： undifined、null、number、string、boolean、symbol(es6总新增)
* 复制数据类型：object
### 简单数据类型和复杂数据类型的区别
* 在内存中的存储方式：
（1）简单数据类型占据了内存的固定大小，存储在栈内存中。当一个变量向另一个变量复制基本类型的值，会创建这个值的一个副本
（2）复制数据类型及引用数据类型，它的值是对象，存储在堆内存中，包含引用类型的值的并不是对象本身，而是对象所指向的指针。从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终都指向同一个对象。

知道了基本数据类型和复制数据类型的区别，也就知道为什么会有浅拷贝和深拷贝之分了。我们来看下面这个列子。

    var a = 1
    var b = a
    b = 2
    console.log(a) // 1
    console.log(b) // 2

在这个列子中，a,b都是基本数据类型，把a的复制给b,b就是a的一个副本，他们两占有不同位置的内存空间，所以修改b的值，不会改变a的值。

下面我们再看一个关于复制数据类型赋值的例子：

    var a = {
        name: 'liaozhen',
        age: 24
    }
    var b = a
    b.age = 25
    console.log(a) // {name: 'liaozhen', age: 25}
    console.log(b) // {name: 'liaozhen', age}
![title](https://leanote.com/api/file/getImage?fileId=5ac86e04ab64417bf7000ab7)
我们发现改变b中的age,a中的age也改变了，那是因为a,b都是引用类型，他们指向同一个内存地址。其实这一段就是一个浅拷贝的过程。有时候我们只是想备份数组，但是只是简单让它赋给一个变量，改变其中一个，另外一个就紧跟着改变，但很多时候这不是我们想要的。于是深拷贝就出现了。

### 深拷贝（让两个对象不指向同一个内存地址）
先列举出一些深拷贝的方法，我们一起来探讨：

*  利用JSON.parse和JSON.stringify
先看下面这段代码：

        var a = {
            name: 'liaozhen',
            age: 24
         }
        var b = JSON.parse(JSON.stringify(a))
        b.age = 25
        console.log(a) // {name: 'liaozhen', age: 24}
        console.log(b) // {name: 'liaozhen', age: 25}

![title](https://leanote.com/api/file/getImage?fileId=5ac870daab64417a09000b34)
我们发现改变b中的age,a中的age并没有改变，这就是一个深拷贝，因为利用JSON.parse的时候他会为每个对象开辟一个新的空间。
但是这种方法只适用于对象中不存在函数的情况下，我们看下面这个例子：
   
    var a = {
        name: 'liaozhen',
        say: function() {
            console.log('my name is liaozhen')
        } 
    }
    var b = JSON.parse(JSON.stringify(a))
    console.log(a) //  {name: 'liaozhen', say: }
    console.log(b) // {name: 'liaozhen'}
![title](https://leanote.com/api/file/getImage?fileId=5ac8758aab64417a09000b93)
我们发现b没有拷贝进来a中的函数，所以这个方法只适合用在对象中没有函数的场景。

* 数组的深拷贝可以用slice和concat方法（这两种方法不会改变原数组）


        var a = [1, 2, 3]
        var b = a.concat()
        b[0] = 4
        console.log(a) // [1, 2, 3]
        console.log(b) // [4, 2, 3]
        var c = a.slice(0)
        c[0] = 4
        console.log(a) // [1, 2, 3]
        console.log(b) // [4, 2, 3]
数组的这两个方法可以实现数组的深拷贝，但是这种方法只适用于数组中的值是基本数据类型的。

* 对象的深拷贝（封装一个方法）

        function deepCopy(obj) {
            var result = {}
            for (key in obj) {
                if (typeof obj[key] === 'object') {
                   result[key] = deepCope(obj[key])
                } else {
                  result[key] = obj[key]
                }
            }
           return result
        }
        var a = {
            name: 'liaozhen',
            info: {
                age: 24,
                sex: '女'
            }
        }
        var b = deepCopy(a)
        b.name = '廖珍'
        console.log(a)
        console.log(b)
这里封装了一个对象的深拷贝方法。但是这个方法只适用于对象的深拷贝，并不适用用数组的深拷贝，下面我们封装一个适用于对象和数组通用的深拷贝方法。

        function deepCope(source) {
             let obj = null
             for (key in source) {
                 if (source.hasOwnProperty(key)) {
                     if (typeof source[key] === 'null') {
                         obj[key] = null
                     } else if (Object.prototype.toString.call(obj[key] === '[Object Arry]')) {
                        obj[key]=[];
                        for(var i=0;i<this[attr].length;i++){
                            obj[key].push(source[key][i].deepCopy());
                        }
                     } else {
                         obj[key] =  deepCope(source[key])
                     }
                  }
             }
        }