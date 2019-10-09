# this的指向问题
在执行上下文的创建阶段，会分别确定变量对象、作用域链、this的指向。**所以this的指向是在函数被调用的时候确定的**

## this是什么？
this是一个指针，指向函数调用的对象。所以this的指向很灵活，谁调用它，就指向谁。
## this的绑定方式
1. 默认绑定
2. 隐式绑定
3. 显示绑定
4. new绑定

### 默认绑定
默认绑定通常是独立调用函数。
```javascript
var a = 10;
function foo() {
    console.log(this.a);
}
foo(); // 默认非严格模式，this指向全局对象。
```
执行foo的时候，独立调用，在严格模式下，this指向undefined，但是在非严格模式中，当this指向undefined时，它会被自动指向全局对象。
### 隐式绑定
函数被某一个对象所调用。一般的表现形式为xxx.fn()，这个时候的this指向被调用的对象。
```javascript
var a = 20;
var obj = {
    a: 10,
    c: this.a + 20,
    fn: function () {
        return this.a;
    }
}
obj.fn() // 10
```
fn被obj调用。所以this指向obj这个对象。
### 显示绑定
显示绑定就是通过apply、call、bind等方式改变this的指向
```javascript
function fn() {
    console.log(this.a);
}
var obj = {
    a: 20
}
fn.call(obj);
```
通过call改变fn的指向，使fn中的this指向obj对象。
### new绑定
```javascript
function sayHi(name){
    this.name = name;
}
var Hi = new sayHi('Yevtte');
console.log('Hello,', Hi.name);
```
this指向Hi
通过new操作符调用构造函数，会经历以下4个阶段。

* 创建一个新的对象；
* 将构造函数的this指向这个新对象；
* 指向构造函数的代码，为这个对象添加属性，方法等；
* 返回新对象。

当new操作符调用构造函数时，this其实指向的是这个新创建的对象。
