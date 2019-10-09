javaScript函数在执行的时候，会形成只一个执行上下文。执行上下文包括了变量对象、作用域链、this。
变量对象中存储着执行上下文中定义的变量和函数。
执行上下文有进入执行上下文阶段和执行阶段。而变量对象的创建经历了以下几个过程。

* 建立agreement对象，检查函数中的参数，建立该对象下的属性和属性值。
* 检查执行上下文中的函数声明，在变量对象中建立一个以函数名为属性，属性值为指向该函数的引用内存地址。如果遇到重名的，如果函数名的属性已经存在，那么该属性将会被新的引用所覆盖。
* 检查上下文中和变量声明，每找到一个变量什么，就在变量对象中创建。就在变量对象中以变量名建立一个属性，属性值为undefined。如果该变量名的属性已经存在，为了防止同名的函数被修改为undefined，则会直接跳过，原属性值不会被修改。
* ![图片标题](http://upload-images.jianshu.io/upload_images/599584-7d131cfe82a20d37.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 执行阶段
在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值。变量对象（VO）变成了活动对象（AO）。

下面我们来看下几个例子：
// demo01
        
    function test() {
        console.log(a) // undefined
        console.log(foo()); //
        var a = 1
        function foo() {
           return 2
        }
    }
    test()
    test()函数执行，进入执行上下文。创建变量对象
    VO = {
        argements: {
            length: 0
        },
        foo: <引用地址>，
        a: undefined
    }
    执行的顺序为：
    function test() {
        function foo() {
           return 2;
        }
        var a
        console.log(a);
        console.log(foo());
        a = 1
    }
