# 变量对象
## 前言
我们知道了javascript的可执行代码在执行的时候会创建一个执行上下文。执行上下文的创建阶段包含了三个重要的属性：变量对象、作用域链、this的指向。
现在我们先看一下变量对象，先看一个我们常说的变量提升的题目：
```javascript
console.log(foo) // foo函数
var foo = 1
function foo() {
        console.log(1)
}
```
console.log(foo) 输出的是一个foo函数。看到这题的时候，知道考察的是变量提升。但是为什么会有变量提升却不知道。了解了变量对象，就会知道为什么会有变量提升了。
## 定义
变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。
::: tip
变量对象简写为VO，进入执行上下文执行阶段时，变量对象变成了活动对象（AO），其实这两个是同一个东西，只是变量对象的属性是不能访问的。只能变成活动对象时才能访问。
:::
## 变量对象的创建过程
当进入执行上下文的创建阶段时（在执行上下文中我们说过，在创建阶段还没有执行代码，只是做一下准备）会创建变量对象，变量对象的创建过程如下：
1. 建立arguments对象(函数的所有形参组成的对象),（只有函数执行上下文才有）。
2. 检查当前执行上下文中的所有函数声明。**如果变量对象中存在同名的，则覆盖之前的同名变量对象**
3. 检查当前执行上下文中变量声明。**如何这个变量声明和arguments对象中的属性或者函数声明同名，则该变量声明不会干扰已经同名的变量声明**。

::: danger
在同一个执行上下文中，函数声明会优先于变量声明。
:::

## 用变量对象来解释变量提升
```javascript
console.log(foo) 
var foo = 1
function foo() {
    console.log(1)
}
```
执行以上代码，进入执行上下文的创建阶段，创建变量对象。根据变量对象的创建过程。以上代码的执行顺序为：
```javascript
function foo() {
    console.log(1)
}
var foo // 和函数声明同名，不会干扰函数声明
console.log(foo)
foo = 1
```
## 例子巩固
```javascript
function test() {
    console.log(a);
    console.log(foo());

    var a = 1;
    function foo() {
        return 2;
    }
}

test()
```

```javascript
test函数执行，进入test函数执行上下文，上下文创建阶段：
testEcs
VO: {
        arguments: {
                length: 0
        },
        foo:  <foo reference> // foo的地址引用。
        a: undefined
}
执行上下文创建完成后，进入执行阶段。
VO变AO
AO: {
        arguments: {
                length: 0
        },
        foo:  <foo reference> // foo的地址引用。
        a: 1
}
```


