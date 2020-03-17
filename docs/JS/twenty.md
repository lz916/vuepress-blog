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
slice还有一个重要的用途：将类数组转成数组：

```js
    Array.prototype.slice.call()
    [].prototype.slice.call()
```

为什么上面的方法可以实现将类数组转换为数组？下面我们来模拟一下slice的实现

```js
    function slice(start, end) {
        const localStart = start || 0
        const localEnd = end || this.length // 类数组都有length属性
        const result = []
        for (let i = localStart; i < localEnd; i++) {
            result.push(this[i])
        }
        return result
    }
```
Array.prototype.slice.call(arguments) 将slice方法中的this指向类数组

## map、forEach、filter
这几个方法使我们对遍历数组，过滤数组，组装新的数组的常见方法

### map
map会创建一个新数组，返回该数组中的每一个元素都调用一个函数后返回的结果，**不会改变原数组**

```js
    const arr = [1, 2, 3, 4]
    arr.map(x => x + 1) // [2, 3, 4, 5]
```
上面这个例子中可以给map传了一个函数，但是其实这个函数里面是有三个参数的，上面的例子没有完全体现出来：

```js
    callback(currentValue, index, array, thisArg)
    // currentValue：当前元素
    // index：当前元素在数组中的索引，这个值是可选的
    // array：调用map的数组,可选
```
知道了map的作用，如果用es5实现map?

### 用ES5实现map
首先明白实现map的两个核心

* 回调函数的参数以及返回值
* 不改变原数组

```js
    Array.prototype.myMap = function(fn, context) {
        console.log(fn)
        console.log(context)
        const arr = Array.prototype.slice.call(this)
        const newArr = []
        for(i = 0; i < arr.length; i++) {
            newArr.push(fn.call(context, arr[i], i, this))
        }
        return newArr
    }

    [1, 2, 3].myMap(x => x + 1)
```

### 使用map时常见的坑
我们经常会遇到这样一个面试题

```js
    ["1", "2", "3"].map(parseInt)
    // 很多同学认为这个题的输出结果是[1, 2, 3]而实际上是[1, NaN, NaN]
```
下面我们来解析一下上面这个题：

:::info
parseInt相当于我们给map传的回调函数，回调函数有三个参数：currentValue、index、array，而parseInt只需要两个参数，所以第三个参数会被parseInt忽略掉
:::

```js
["1", "2", "3"].map(parseInt)等价于["1", "2", "3"].map(parseInt(value, index))
```
具体执行过程如下：

:::info
第一个元素：["1", "2", "3"].map(parseInt("1", 0)) // 0
第二个元素：["1", "2", "3"].map(parseInt("2", 1)) // NaN
第三个元素：["1", "2", "3"].map(parseInt("3", 2)) // NaN
:::


