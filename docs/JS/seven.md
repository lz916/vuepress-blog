# 闭包

## 定义
### MDN中的定义
> 闭包是指那些能够访问自由变量（在函数中使用的，但既不是函数参数也不是函数的局部变量的变量）的函数。
由此看来，闭包由两部分组成函数和自由变量。
```javascript
    var value = 1
    function foo() {
        console.log(value)
    }
    foo
```
value不是foo的参数也不是foo的局部变量。但是在foo中使用了value。所以foo形成了闭包。

### 理论上的闭包
通过MDN中的定义，我们在理论上可以认为所有的函数都是闭包。回顾一下作用域，在函数创建的时候，就会保存所有父变量对象到[[scope]]中。这样函数就能返回父级的变量。
### 实际的闭包
而在实际中，我们认为满足一下条件的才是闭包：
1. 创建这个变量的执行上下文已经被销毁，但是这个变量仍然还可以被访问。
2. 函数中使用到了自由变量。
```javascript
function foo() {
    var a = 20;
    var b = 30;
    function bar() {
        return a + b;
    }
    return bar;
}
var bar = foo();
bar();
```
捋一捋这段代码的执行过程：
1. 全局代码执行，globalEcs压入入执行上下文栈中。
2. 执行foo，fooEcs压入执行上下文栈中。
3. foo执行完，fooEcs被销毁，fooEcs里面的变量对象也被垃圾回收。
4. 执行bar，barEcs被压入执行上下文栈中，foo执行上下文进入执行阶段，用到了foo中的变量对象a，b。但是此时fooEcs已经被销毁，所以bar是闭包。

## 常见闭包题
```javascript
var data = [];
for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}
data[0]();
data[1]();
data[2]();
```
代码分析：
1. 全局代码执行，当for循环执行完之后，此时全局上下文的AO为：
```
    AO: {
       i: 3,
       data: [] 
    }
```
2. 执行data[0]，此时data[0]的作用域为：
```
    data[0]Context = {
        Scope: [AO, global.AO]
    }
```
data[0]输出i，再其作用域中找i，找到了global.AO中的i为3。
3. data[1]、data[2]同data[0]。所以都是输出3。

这个题还不是闭包，那我们怎么将它改写成闭包？根据闭包的特点，可以这样改写。
```javascript
var data = [];
for (var i = 0; i < 3; i++) {
  data[i] = (function(i) {
      return function() {
          console.log(i);
      }
  })(i)
}
data[0]();
data[1]();
data[2]();
```
分析一下这段代码，为什么这个就是闭包了？
1. 执行全局代码，此时全局上下文的AO为：
```
    AO: {
       i: 3,
       data: [...,...,...] 
    }
```
2. 执行data[0]时，此时data[0]的作用域为：
```
    data[0]Context = {
        Scope: [AO, 匿名函数AO, AO]
    }
```
data[0]输出i，再其作用域中找i，找到了匿名函数AO中的i为0。

3. data[1] 和 data[2] 是一样的道理



