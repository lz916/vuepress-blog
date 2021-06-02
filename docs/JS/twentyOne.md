# 事件循环机制

事件循环机制（Event Loop）,是负责整个 javascript 执行环境的问题，是执行环境的机制，不是 javascript 的机制，事件循环机制主要是为了解决异步事件

说到异步就会说到浏览器的线程

## 浏览器线程

-   GUI 渲染
-   js 引擎
-   定时器
-   I/O 事件
-   http

:::danger
JS 引擎
浏览器并不能太执行 javascript 代码，需要在浏览器中植入内核，为 javascript 提供执行环境，chrome 中，这个内核就是 v8。
每一个网页进程，浏览器只会启动一个 JavaScript 引擎线程来配合完成网页的交互。
:::

如何没有异步事件，函数调用栈几乎能负责所有的代码执行顺序问题,异步事件需要任务队列（task queue）来执行

-   js 是单线程，线程中拥有一个唯一的事件循环

## 任务队列

-   队列的特点是：先进先出
-   队列分为宏任务（macro-tack/task）和微任务(micro-task/jobs)
-   宏任务有 script()setimeout/setinterval/setImmediate/I/O/gui rending
-   微任务有 promose/await/async/process.nextTick
-   setTimeout/Promise 是任务源，进入任务队列的是他们制定的执行代码
-   来自不同任务源的任务会进入到不同的任务队列，setTimeout 和 setInterval 是同源

## 事件循环的顺序

-   从 script(整体代码)开始第一次循环，进入函数调用栈
-   函数调用栈全部清空后，开始执行所有的微任务，讲微任务放在函数调用栈中执行
-   所有微任务执行完之后，循环再次从宏任务开始，找到**其中一个任务队**列执行完毕，再执行所有的微任务

```javascript
const p1 = new Promise((resolve) => {
    resolve()
})
    .then(function f1() {
        console.log(1)
        const p2 = new Promise((resolve) => {
            resolve()
        })
            .then(function f3() {
                console.log(2)
            })
            .then(function f4() {
                console.log(4)
            })
    })
    .then(function f2() {
        console.log(3)
    })

console.log(0)

// 0 1 2
```

