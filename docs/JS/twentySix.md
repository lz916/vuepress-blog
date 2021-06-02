# JS 一些常用的手写方法

## 判断数据类型

```js
function checkIsDataType(data) {
    return Object.prototype.toString.call(data).slice(8, -1)
}
```

## 数组去重

```js
function unique(array) {
    return array.filter((item, index, array) => {
        return array.indexOf(item) === index
    })
}
```

## 数组扁平化

```js
function flatten(array) {
    let res = []
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            res.concat(flatten(array[i]))
        } else {
            res.push(array[i])
        }
    }
}

function flatten(array) {
    while (array.some((item) => Array.isArray(item))) {
        array.concat(...item)
    }
}
```

## 浅拷贝

```js
function shadowCopy(obj) {
    if (typeof obj !== 'object') return
    let newObj = obj instanceof array ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnPrototype(key)) {
            newObj[key] = obj[key]
        }
    }
    return newObj
}
```

```js
function deepCopy(obj) {
    if (typeof obj !== 'object') return
    let newObj = obj instanceof array ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnPrototype(key)) {
            newObj[key] =
                typeof obj[key] === 'object' ? deepCopy(obj) : obj[key]
        }
    }
}
```

## forEach 的模拟实现

```js
    Array.prototype.myForEach = function(fn, thisArg) {
        if (this == null) {
            throw new TypeError('this is null or is not defined')
        }
        if (typeof fn !== 'function') {
            throw new TypeError(`${fn} is not a funciton`)
        }
        const len = this.length
        this = thisArg || window
        for (let i = 0; i < len; i++) {
            fn.call(this.value, this[i], i, this)
        }
    }
```

## map 的模拟实现

```js
    Array.prototype.myForEach = function(fn, thisArg) {
        if (this == null) {
            throw new TypeError('this is null or is not defined')
        }
        if (typeof fn !== 'function') {
            throw new TypeError(`${fn} is not a funciton`)
        }
        const len = this.length
        let res = []
        this = thisArg || window
        for (let i = 0; i < len; i++) {
            res[i] = fn.call(this.value, this[i], i, this)
        }
        return res
    }
```

## filter 的模拟实现

```js
    Array.prototype.myFilter = function(fn, thisArg) {
        if (this == null) {
            throw new TypeError('this is null or is not defined')
        }
        if (typeof fn !== 'function') {
            throw new TypeError(`${fn} is not a funciton`)
        }
         const len = this.length
        let res = []
        this = thisArg || window
        for (let i = 0; i < len; i++) {
            if (fn.call(this.value, this[i], i, this)) {
                res[i] = this[i]
            }
        }
        return res
    }
```

## some 的模拟实现

```js
     Array.prototype.mySome = function(fn, thisArg) {
        if (this == null) {
            throw new TypeError('this is null or is not defined')
        }
        if (typeof fn !== 'function') {
            throw new TypeError(`${fn} is not a funciton`)
        }
         const len = this.length
        let res = []
        this = thisArg || window
        for (let i = 0; i < len; i++) {
            if (fn.call(this.value, this[i], i, this)) {
                return true
            }
        }
        return false
    }
```

## call 的模拟实现

```js
Function.prototype.myCall = function(context) {
    var context = context || window
    context.fn = this
    var args = []
    for (let i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
    }
    context.fn(...args)
    delete context.fn
}
```

## apply 的模拟实现

```js
Function.prototype.myApply = function(context) {
    var context = context || window
    context.fn = this
    var args = []
    for (let i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
    }
    context.fn(args)
    delete context.fn
}
```

## new 的模拟实现

```js
function createFactory() {
    var obj = new Obj()
    Constructor = [].shift.call(arguments)
    obj._proto_ = Constructor.prototype
    let res = Constructor.apply(obj, arguments)
    return typeof ret === 'object' ? ret : obj
}
```

## Object.assign 模拟实现

```js
Object.assign2 = function(target, ...source) {
    let obj = target
    source.forEach((item) => {
        if (obj !== null) {
            for (let key in obj) {
                ret[key] = obj[key]
            }
        }
    })
}
```

## 节流（throttle）的实现

```js
function throttle(fn, wait) {
    var timeout
    var previous = 0
    return function() {
        var now = new Date()
        context = this
        args = argument
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                fn.call(context, args)
            })
        }
    }
}

function throttle(fn, wait) {
    var context, args
    var previous = 0
    return function() {
        var now = +new Date()
        context = this
        args = arguments
        if (now - previous > wait) {
            fn.call(context, args)
            previous = now
        }
    }
}
```

## 防抖(debounce)的实现

```js
function debounce(func, wait) {
    var timeout
    return function() {
        var context = this
        var args = argument
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait)
    }
}
```

## EventBus 的手写实现

```js
    class EventBus {
        private events = {};

        on(name, callback) {
            this.events[name] = this.events[name] || [];
            this.events.push(callback);
        }
        emit(name, data) {
            (this.events[name] || []).forEach((fn) => {
            fn(data);
            });
        }
        off(name, fn) {
            const index = this.events[name].indexOf(fn);
            if (index > 0) {
            this.events[name].splice(index, 1);
            }
        }
}
```
