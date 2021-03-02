# 响应式原理和简单实现

Vue 是**MVVM**模式的框架，在操作数据（修改 javascript）的时候，会引起试图的改变。它的核心是**响应式系统**，下面我们对响应式的原理来解析实现一下。

## Object.defineProperty

**Object.defineProperty()**方法会直接在一个对象上新增一个属性，或者修改一个属性，并返回这个对象。基本用法如下：

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

```javascript
function observe(obj) {
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key]) // 此方法在下面
    })
}
```

:::danger
实际上 observe 是会递归的，我们现在只是简单实现
:::

```javascript
// 这个方法通过Object.defineProperty来实现对象的响应式
function defineReactive(obj, prop, value) {
    Object.defineProperty(obj, prop, {
        configurable: true,
        enumerable: true,
        get: (getter = () => {
            return value
        }),
        set: (setter = (newValue) => {
            value = newValue
            if (value === newValue) return
            cb(newValue) // 此方法在下面
        })
    })
}
```

```javascript
// 更改视图
function cb(val) {
    // 更新视图的一些方法
    console.log('视图更新啦！')
}
```

通过上面这几步，我们基本实现了响应式，下面我们通过 observe 来封装一个 Vue 吧~

```javascript
class Vue {
    // Vue构造类
    constructor(options) {
        this._data = options.data
        observe(this._data)
    }
}
```

这样的话，我们只要 new 一个对象，就会将 data 的数据进行响应式。

下面我们来几个小小的例子哈

```javascript
let VM = new Vue({
    data: {
        test: '我是test'
    }
})

VM._data.test = '我是修改后的test' // 视图更新啦！
```

至此，我们简单的实现了一个简单的 Vue 响应式系统

