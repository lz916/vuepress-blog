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

## WeakSet

### 定义
WeakSet和Set类似，也是不重复的集合，但是和Set又有区别

* WeakSet的成员只能是对象，不能是其他的值

```javascript
    let ws = new WeakSet()
    ws.add(1) // 会报错，因为WeakSet里面的成员只能是对象
```

### 语法

可以使用new命令，创建 WeakSet 数据结构，可以接受数组或这类数组作为参数，数组的所有成员都会成为WeakSet的成员

```javascript
    const a = [[1, 2], [2, 3]]
    const b = new WeakSet(a) // {[1, 2], [2, 3]}
    const c = [1, 2, 3]
    const d = new WeakSet(c) // 报错
```

:::danger
注意，是a数组的成员成为 WeakSet 的成员，而不是a数组本身。这意味着，数组的成员只能是对象。
:::

### 方法
 * WeakSet.prototype.add(value): 添加成员，
 * WeakSet.prototype.delete(value): 删除成员，返回布尔值
 * WeakSet.prototype.has(value): 判断某个值是否存在，返回布尔值

## Map

### 定义
Map数据结果，类似于对象，也是键值对得集合，但是键得范围不仅仅限于字符串，键和值都可以是对象。

```javascript
    const m = new Map()
    const obj = {p : 'hello world'}
    m.set('o', obj)
    m.get('o') // 'content'

    m.has(o) // true
    m.delete(o) // true
```

### Map的属性和方法
 1. 属性
 * size: 返回成员总数
 
 2. 方法

 * Map.prototype.set(key, value): 设置键名为相应key的value。
 * Map.prototype.get(key): 得到某个键名的值
 * Map.prototype.has(key): 判断是否含有某个键，返回布尔值
 * Map.prototype.delete(key): 删除某个键名，返回布尔值
 * Map.prototype.clear(): 清空，无返回值
 * Map.prototype.keys()：遍历，返回键名
 * Map.prototype.values: 遍历，返回值
 * Map.prototype.entries()： 返回所有成员的遍历器
 * Map.prototype.forEach(): 遍历所有成员