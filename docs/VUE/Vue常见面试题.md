# Vue面试题

## nextTick是如何实现的
nextTick是将回调延迟到下次dom更新循环后调用，在修改数据之后立即使用它，获取修改之后的dom。vue在dom更新的时候是异步的，只要监听到数据变化，vue将开启一个任务队列，并且缓存所有的数据变化，如果一个watcher被触发多次，会去重，只保留最后一次，然后在下一个的事件循环中，去执行队列里面的方法，Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

## 父子组件挂在时生命周期的是如何的
子beforeCreated -- 子created -- 子beforeMounted --> 父beforeCreated --> 父created -->父beforeMounted --> 父mounted -- 子mounted --> 子beforeUpdate -> 父beforeUpdate -- 父updated -- 子updated --子beforeDestory -- 父beforeDestory -- 子 -- 父destory -- 子destory

## Vue的双向绑定是如何实现的

Vue的双向绑定主要是用数据劫持和观察者模式

* 数据劫持利用Object.defineProperty对数据进行响应式，当读取数据的时候进行收集依赖，数据变更的时候通知watcher执行更新

## Vue2中对于数组有做啥特殊处理

重写数组原型方法

## defineProperty 和porxy有啥区别
