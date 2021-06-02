# 响应式系统的收集依赖原理

## 为什么会有收集依赖
前面我们了解了响应式系统，在访问属性的时候，会调用getter函数，当属性被修改的时候会调用set函数，然后执行更新视图的方法，下面我们看下如下的例子：

```javascript
    let VM = new Vue({
        template:  `<div>
            <span>{{name}}</span> 
            <span>{{age}}</span> 
        <div>`,
        data: {
            name: '廖珍'，
            age: 26,
            sex: '女'
        }
    })
    VM.data.sex = '男'
    // 在这里我们修改了sex属性，但是我们视图中并没有用到这个属性，所以修改属性的时候，并不要执行视图更新的方法。
```

从上面的例子可以看出，收集依赖是为了在修改数据的时候，收集这个数据用到的视图（依赖），然后再逐个的通知依赖，我修改了，你们更新下视图吧。

## 收集依赖的实现

```javascript
    class Vue({
        constructor(options) {
            this.data = options.data
            observer(this.data)
            new Watcher()
        }
    })
    // 订阅者 --- 每一个数据引用都是订阅者
    class Watcher({
        constructor() {
            Dep.target = this
        }

        update() {
            console.log('我更新了')
        }
    })

    // 发布者 ---每一个数据都是发布者
    class Dep() {
        constructor() {
            this.subs = []
        }

        addSubs(sub) {
            this.subs.push(sub)
        }

        notify() {
            this.subs.forEach(item => {
                item.update()
            })
        }
    }

    function observer(obj) {
        if (!obj && typeof obj !== 'object') return
        Object.keys(obj).forEach(key => {
            let val = obj[key] {
                observer(val) // 递归
            }
        })
        defineReactive(obj, key, val) {
            const dep = new Dep()
            Object.defineProperty(obj, key, {
                enumerable: true,
                configurable: true,
                get: getters = () => {
                    dep.addSub(Dep.target)
                    return val
                },
                set: setter = (newVal) => {
                    if (newVal === val) return
                    dep.nodify()
                }
            })
        }
    }
```
 响应式对象中的每一个属性都对应一个dep,每一个属性对应一个dep，而每一个dep对象多个Watcher(可能有多个视图依赖这个属性，所以每个Vue实例会new一个Watch)，在get的时候才会addSub，所以例子一中因为text3没有地方去get，所以就不会addSub，也就不会触发更新视图的操作。

