# ES6 Set和Map

## Set

### 定义
Set是一种数据结构，类似于数组，但是成员中的值是唯一的，没有重复的

### Set的属性和方法
1. 属性
* Set.prototype.constructor: 构造函数
* Set.prototype.size: 返回Set实例的成员总数

2. 方法
(1)、操作数据方法
* Set.prototype.add(value): 添加某个值，返回Set结构本事
* Set.prototype.delete(value): 删除某个值，返回一个布尔值，表示删除与否
* Set.prototype.has(value): 返回一个布尔值，判断该值是不是Set中的一员
* Set.prototype.clear(): 清空所有成员，没有返回值

(2)、遍历方法
* Set.prototype.keys(): 返回遍历的键名
* Set.prototype.values(): 返回遍历的值
* Set.prototype.entries(): 返回遍历的键值对
* Set.prototype.forEach(): 使用回调函数遍历emi

```js
    // add方法
    const s = new Set()
    s.add(1).add(2).add(1).add(3)
    console.log(s) // {1, 2， 3} Set里面的成员不能重复

    // delete方法
    s.delete(1) // true

    // has方法
    s.has(2) // true

    // clear方法
    s.clear()
```

3. 应用

* 数组去重

```javascript
    const a = [1, 2,3, 4, 5, 1, 3, 4]
    const b= [...new Set(a)]
```