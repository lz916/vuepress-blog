### 数组扁平化

数组扁平化是将一个嵌套多层的数组转换成一个只有一层的数组。

举例如下：

```javascript
    const arr = [1, [2, 3, [4, 5, [6]]]]
    // 扁平化之后
    arr = [1, 2, 3, 4, 5, 6]
```

我们首先想到的方式是递归

### 递归

```javascript
    function flatten(array) {
        let result = []
        for(i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                result = result.concat(flatten(array[i]))
            } else {
                result.push(i)
            }
        }
        console.log(result)
        return result
    }
```

### toString
如果数组里面全部是数字，可以用toString方法

```javascript
    const arr = [1, [2, 3, [4, 5]]]
    arr.toString() // 1, 2, 3, 4, 5

    function flatten(array) {
        return array.toString().split(',').map(item => {
            return +item
        })
    }
```

### reduce

```javascript
    function flatten(array) {
        return array.reduce((prev, next) => {
            return prev.concat(Array.isArray(next) ? flatten(next) : next)
        }, [])
    }
```

