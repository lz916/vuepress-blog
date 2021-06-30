# 响应式原理和简单实现

Vue 是**MVVM**模式的框架，在操作数据（修改 javascript）的时候，会引起试图的改变。它的核心是**响应式系统**，下面我们对响应式的原理来解析实现一下。

## Object.defineProperty

**Object.defineProperty**方法会直接在一个对象上新增一个属性，或者修改一个属性，并返回这个对象。基本用法如下：

```javascript
Object.defineProperty(obj, prop, descriptor)
/*
        obj: 目标对象，
        prop: 新增或修改的属性
        descriptor: 描述符
    */
```

**descriptor**是一个对象，里面有很多属性，简单介绍一下几个属性，更多的用法请移步[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

-   configurable：属性能否被改变和删除，默认 false
-   enumerable：属性是否可以枚举，默认 false
-   get：属性的 getter 函数，访问属性时，会调用这个函数，函数的返回值，会成为这个属性的值。默认为**undefined**
-   set：属性的 setter 函数，当属性被修改时，会调用此函数。默认为**undefined**

## 响应式实现原理

上面提到了 Object.defineProperty,Vue2 的响应式是基于它实现的。
在 Vue 的运行机制概览中，我们说过，在 init 的时候，会通过 Object.defineProperty 来设置 getter 和 setter 函数。

所以我们先要使得传入进来的每个属性都要有设置 getter 和 setter 函数，使得它变得是可观察的

### 对象的劫持

```javascript
class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        for (let key in data) {
            defineReactive(data, key, data[key])
        }
    }
}

function defineReactive(data, key, vlaue) {
    observer(data)
    Object.defineProperty(data, key, {
        get: () => {
            return value
        },
        set: (value, newValue) => {
            value = newValue
        },
    })
}

function observer(value) {
    if (
        Object.prototype.toString.call(value) === '[object Object]' ||
        Array.isArray(value)
    ) {
        return new Observer(value)
    }
}
```

:::warning
思考一：这样的数据劫持方式对数组有什么影响？
:::
这样递归的方式其实无论是对象还是数组都进行了观测 但是我们想一下此时如果 data 包含数组比如 a:[1,2,3,4,5] 那么我们根据下标可以直接修改数据也能触发 set 但是如果一个数组里面有上千上万个元素 每一个元素下标都添加 get 和 set 方法 这样对于性能来说是承担不起的 所以此方法只用来劫持对象

:::warning
思考二：Object.defineProperty 缺点？
:::

对象新增或者删除的属性无法被 set 监听到 只有对象本身存在的属性修改才会被劫持

### 数组的观测

```javascript
class Observer {
    constructor(data) {
        if (Array.isArray(val)) {
            // 这里对数组做了额外判断
            // 通过重写数组原型方法来对数组的七种方法进行拦截
            value.__proto__ = arrayMethods
            // 如果数组里面还包含数组 需要递归判断
            this.observeArray(value)
        } else {
            this.walk(data)
        }
    }
    walk(data) {
        for (let key in data) {
            defineReactive(data, key, data[key])
        }
    }
    observeArray(items) {
        for (let i = 0; i < value.length; i++) {
            observe(items[i])
        }
    }
}

function defineReactive(data, key, vlaue) {
    observer(data)
    Object.defineProperty(data, key, {
        get: () => {
            return value
        },
        set: (value, newValue) => {
            value = newValue
        },
    })
}

function observer(value) {
    if (
        Object.prototype.toString.call(value) === '[object Object]' ||
        Array.isArray(value)
    ) {
        return new Observer(value)
    }
}

// 先保留数组原型
const arrayProto = Array.prototype
// 然后将arrayMethods继承自数组原型
// 这里是面向切片编程思想（AOP）--不破坏封装的前提下，动态的扩展功能
export const arrayMethods = Object.create(arrayProto)
let methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'reverse',
    'sort',
]
methodsToPatch.forEach((method) => {
    arrayMethods[method] = function(...args) {
        console.log('args')
        console.log(args)
        //   这里保留原型方法的执行结果
        const result = arrayProto[method].apply(this, args)
        // 这句话是关键
        // this代表的就是数据本身 比如数据是{a:[1,2,3]} 那么我们使用a.push(4)  this就是a  ob就是a.__ob__ 这个属性就是上段代码增加的 代表的是该数据已经被响应式观察过了指向Observer实例
        const ob = this.__ob__

        // 这里的标志就是代表数组有新增操作
        let inserted
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
            default:
                break
        }
        // 如果有新增的元素 inserted是一个数组 调用Observer实例的observeArray对数组每一项进行观测
        if (inserted) ob.observeArray(inserted)
        // 之后咱们还可以在这里检测到数组改变了之后从而触发视图更新的操作--后续源码会揭晓
        return result
    }
})
```
