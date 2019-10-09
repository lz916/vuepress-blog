# 数组去重
数组去重是我们经常要用的，以下是总结的常用的几种方法。
## 双重循环
```javascript
    const arr = [1, '11', 2, 3, 1, 3, 2, 5, 6]
    function unique(arr) {
        let newArr = []
        const arrLen = arr.length
        const newArrLen = newArr.length
        for (i = 0; i < arrLen; i++) {
            for(j = 0; j < newArrLen; j++) {
                if (arr[i] === newArrLen[j]) {
                    break;
                }
            }
            if (j === newArrLen) {
                newArr.push(arr[i])
            }
        }
        return newArr
    }
```

## 利用indexOf
```javascript
    const arr = [1, '11', 2, 3, 1, 3, 2, 5, 6]
    function unique(arr) {
        let newArr = []
        for (i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i]) < 0) {
                newArr.push(arr[i])
            }
        }
        return newArr
    }
```

## 利用filter
```javascript
    const arr = [1, '11', 2, 3, 1, 3, 2, 5, 6]
    function unique(arr) {
        return arr.filer((item, index, arrary) => {
            return arrary.indexOf(item) === index
        })
    }
```
## es6
```javascript
    const arr = [1, '11', 2, 3, 1, 3, 2, 5, 6]
    function unique(arr) {
        return [...new Set(arr)]
    }
```