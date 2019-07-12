在学函数作用域之前，我们必须了解全局变量和局部变量的概念。
(1)全局变量：在整个代码中都能调用的变量。使用隐式声明的变量就是全局变量(不用关键词var)
(2)局部变量：只能在本变量函数声明的内部调用，其他的地方不能用。

    function  Name() {
    i='jirengu';
     }
    Name();
    funciton printName() {
    console.log(i);
     }
    printName();//jirengu.因为i为全局变量。在整个代码中都能调用。

     function  Name() {
     var  i='jirengu';
    }
    Name();
    funciton printName() {
    console.log(i);
     }
     printName()//报错，i  is not defined。因为此时的i是局部变量，只能在自己的函数声明内部调用，其他地方不能调用。
js中的作用域是通过函数还实现的，即一个函数内定义的变量在 函数外不能访问。
* 函数作用域链：
任何执行上下文时刻的作用域, 都是由作用域链来实现.
当一个函数被声明的时候,会给这个函数添加一个scope属性.
在一个函数对象被调用的时候，会创建一个活动对象(也就是一个对象), 然后对于每一个函数的形 参，都命名为该活动对象的命名属性, 然后将这个活动对象做为此时的作用域链(scope chain)最前端, 并将这个函数对象的[[scope]]加入到scope chain中.
作用域链的原理和原型链很类似，如果这个变量在自己的作用域中没有，那么它会寻找父级的，直到最顶层。
下面通过一个例子来理解一下：
         fn();
         var i=10;
         var fn=20;
         console.log(i);
         function fn() {
          console.log(i);
          var i=99;
          fn2();
          console.log(i);
          function fn2() {
             i=100;
             }
          }
根据变量前置和声明前置，次代码等价于如下代码：
          var i;//全局变量
          var fn;//全局变量
          function fn() {
              var i;函数fn中的局部变量
              function fn2() {
                  i=100;//全局变量
          }
          console.log(i);//fn中的i此时只是声明了，并没有被赋值，所以输出undefined。
          fn2();//把100赋值给全局变量中的i。
          console.log(i)//此时i为100；
         }
        i=10;
       fn=20;
       console.log(i)//10
* 闭包