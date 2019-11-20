# JS数组方法总结

## push、pop、shift、unshift
这几个方法都是用于操作数组，会改变数组的内容及长度

### push
向数组的末尾添加内容，会返回一个新的数组

```js
    const arr = [1, 2]
    arr.push(3, 4) // [1, 2, 3, 4]
```

### unshift
向数组的头部添加内容，返回**数组长度**，会改变原数组

```js
    const arr = [1, 2]
    arr.unshift(0) // 3
    console.log(arr) [0, 1, 2]
```

### pop
删除数组的最后一个元素，返回**删除的元素的值**，会改变原数组

```js
    const arr = [1, 2, 3]
    arr.pop() // 3
    console.log(arr) // [1, 2]
```

### shift
删除数组的第一个元素，返回**删除的元素的值**，会改变原数组。

## splice、slice
这两个方法都可以对数组做添加、删除、修改操作，但是又有一定的区别。

### splice
splice可以对数组进行添加、删除、修改操作。返回被修改的内容。**会改变原数组**。
下面分别对splice操作数据的方法做简单的介绍：
splice的基本语法：

```js
    splice(start, deleteCount, item)
    // start: 表示开始的位置，从0开始，如果大于数组的长度，则从数组末尾添加内容，如果为负数，则从数组末尾的第几位开始。
    // deleteCount: 表示要删除的个数（可选），
    // item: 标识添加的元素
```

#### 添加(插入)/替换

```js
    // 从位置0开始删除1个元素，插入1，
    const arr = [1, 2, 3]
    arr.splice(0, 1, 0) // [1],返回被修改的元素
    console.log(arr) // [0, 2, 3]
    // 这个例子实现了数组的替换
```

```js
    // 从位置1开始，删除0个元素，插入1
    const arr = [0, 1, 2]
    arr.splice(1, 0, 1) // [] 没有元素被删除
    console.log(arr) // [0,1,1,2]
```

## 删除
删除和插入的区别就是，调用splice的时候第三个参数不传

```js
    const arr = [1, 2]
    arr.splice(0, 1) // [1]
    console.log(arr) // [2]
```

### slice
可以对数组进行删除操作，返回一个**新数组**，**不会改变元数组**，因为他不会改变原数组，所以可以用它来实现原数组的浅拷贝。

```js
    slice(start, end)
    // start: 开始位置
    // end：结束位置
    // 截取的时候包括start,不包括end
```

```js
    const arr = [1, 2, 3, 4, 5, 6, 7]
    arr.slice(0, 4) // [1, 2, 3, 4]
    console.log(arr) // [1, 2, 3, 4, 5, 6, 7]
```
slice还有一个重要的用途：将类数组转成数组