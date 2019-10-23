# Promise
## 定义
>Promise是异步编程的一种方式，比起传统的方式（回调和时间）有更大的优势

## Promise解决的痛点
* 回调地狱
* 耦合性差，不易维护
* 代码臃肿

 ## 基本用法
 ES6规定，Promise对象是一个构造函数，用来生产Promise实例

```javascript
    const promise = new Promise((resolve, reject) => {
        if (/* 异步操作成功 */) {
            resolve()
        } else {
            reject()
        }
    })
```
Promise接受一个函数作为参数，该函数的两个参数分别是resolve, reject。resole和reject是两个函数，由javascript引擎部署，不需要自己部署。

### Promise的状态
 * pending：异步任务正在执行
 * fulfilled： 异步任务执行成功
 * rejected：异步任务执行失败

 :::danger
 Promise的状态的改变只有两种可能：从pending变为fulfilled和从pending变为rejected，一旦状态改变，就不会再变。
 :::

 ### resolve和reject的作用
 * resolve：resolve是将Promise对象从未完成（pending）变成成功（fulfilled）
 * reject: reject是将Promise对象从未完成（pending）变成失败（rejected）

 ## API

 * Promise.prototype.then

 then方法定义在原型对象Promise.prototype上，**then方法的作用是当Promise状态变化时，为它添加回调函数。** then方法的第一个参数是状态变为resolve的回调函数，第二个参数（可选）是状态变为reject的回调函数。

 ```javascript
    const promise = new Promise((resove, reject) => {

    })

    promise.then(
        success => console.log(success),
        error => console.log(error)
    )
 ```

