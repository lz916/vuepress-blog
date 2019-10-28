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

:::danger
    Promise新建之后会立即执行
:::

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
 :::danger
 promise新建后会立即执行，但是then方法指定的回调函数会在当前脚本中所有的同步任务执行完才会执行
 :::

 1、如果resolve和reject执行的时候带有参数，参数会传递给then注册的回调函数

 ```javascript
    const promise = new Promise((resolve, reject) => {
        resolve('resolve')
    })
    promise.then((value) => console.log(value)) // 输出resolve
 ```

 2、当resolve的参数是一个Promise实例时，之前的Promise的状态由参数的Promise状态决定

 ```javascript
    const promise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('我的状态变为reject了')
        }, 2000)
    })

    const promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(promise1)
        }, 1000)
    })

    promise2.then((value) => {
        console.log(value)
    }).catch(err => {
        console.log(err)
    })
 ```
promise2中resolve了promise1实例，所以promise2的状态由promise1决定，promise1 2s后reject,所以promise2的状态也是rejected，最后执行catch

3、链式调用，then方法返回的是一个新的Promise实例，不是原来那个，所以可以链式调用。

```javascript
    // 例1
    const promise1 = new Promise((resolve, reject) => {
        resolve('执行成功')
    })

    promise1.then(value => console.log(value))
            .then(() => {
                console.log(1)
            })
    
    const promise2 = new Promise((resolve, reject) => {
        resolve('执行成功')
    })

    // 例2
    promise2.then((value) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('再次执行成功')
            }, 2000)
        })
    }).then((value) => {
        console.log(value) // 再次执行成功
    })
```
* 当执行完then方法后，then方法里面没有return出来一个Promise实例，那么then方法访问的返回一个状态为resolve的Promise实例，链式调用后面的then方法会立即执行。（如例1）

* 当执行完then方法后，then方法里面有return出来一个新的Promise实例，那么then方法返回的是return出来的这个Promise实例，链式调用后面的then方法的执行会根据返回出来的Promise实例状态来执行。（如例2）

* Promise.prototype.catch
 
 Promise.prototye.catch用于指定发生错误时的回调函数。等同于Promise.prototype.then(null, rejection)和Promise.prototype.then(undefined, rejection)

 :::danger
    Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
 :::

 ```javascript
   const promise = new Promise((resolve, reject) => {
       resolve()
   })

   promise.then(() => {

   }).then(() => {

   }).catch(() => {
       // 捕捉前面3个Promise产生的错误
   })
 ```
* Promise.prototype.finally

finally用于不管Promise最后的状态如何，都会执行的操作，回调函数中不接受任何参数

```javascript
    const promise = new Promise((resolve, reject) => {

    })

    promise.then()
           .catch()
           .finally()
```
* Promise.all()
Promise.all用于将多个Promise实例生产一个Promise实例，接收的参数是一个数组，数组里面的值都是Promise实例，如果不是Promise实例，则调用Promise.resolve变成Promise。

生产的新的实例的状态由传入的数组的每个Promise实例状态共同决定，有一下规则：

1、 当所有实例状态为fulfilled时，新的实例才为fulfilled，数组里面的各个实例的返回值组成一个数组，传给新实例的回调函数
2、 当数组中有一个被reject了，则新的Promise的状态就变成了rejected状态，被reject的那个实例的返回值，传给新实例的回调函数

```javascript
    const p1 = new Promise((resolve, reject) => {
        resolve('p1执行成功')
    })

    const p2 = new Promise((resolve, reject) => {
        resolve('p2执行成功')
    })

    const p3 = new Promise((resolve, reject) => {
        resolve('p3执行成功')
    })

    const p = Promise.all([p1, p2, p3]).then(value => console.log(value)) // ["p1执行成功", "p2执行成功", "p3执行成功"]
```
在上例中，p的状态由p1, p2, p3共同决定，p1, p2, p3的状态都为fullfilled，所以p的状态也为fullfilled，然后p执行then回调函数，回调函数的值为p1,p2,p3的返回值组成的数值


```javascript
    const p1 = new Promise((resolve, reject) => {
        resolve('p1执行成功')
    })

    const p2 = new Promise((resolve, reject) => {
        reject('p2执行失败')
    })

    const p3 = new Promise((resolve, reject) => {
        resolve('p3执行成功')
    })

     const p = Promise.all([p1, p2, p3]).then(value => console.log(value))
                                        .catch(error => console.log(error)) // p2执行失败
```
在上例中，p的状态由p1, p2, p3共同决定， p2的状态都为rejected，所以p的状态也为rejected，然后p执行catch回调函数，回调函数的值为p2的值

* Promise.race
Promise.race的作用和Promise的作用一样，也是用于将多个Promise实例生产一个Promise实例，接收的参数也是一个数组，但是新生产的实例的状态规则和all不一样。

```javascript
    const p = Promise.race([p1, p2, p3])
```

新生产的实例的状态规则，以上面那个例子来说明：

只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

* Promise.any()

Promise.any和Promise.all类似，都是将多个Promise对象生产一个Promise对象，参数是一个数组，新生产的实例的状态规则如下：

```javascript
    const p = Promise.race([p1, p2, p3])
```

1、只要p1、p2、p3中有一个状态变为fullfilled，则p的状态就变为fullfilled。
2、当p1、p2、p3中所有的状态变为rejected的时候，p的状态才变为fullfilled。

* Promise.resolve()
Promise.resolve()的作用是讲对象转换为Promise实例，接收的参数有以下几种形式。
1、参数本来就是Promise对象，那么使用Promise.resolve(),将原封不动的访问这个Promise实例

```javascript
    const p1 = new Promise((resolve, reject) => {
        resolve('执行成功')
    })

    const p2 = Promise.resolve(p1)
    console.log(p2)
    console.log(p1 === p2) // true
```
在上例中p2和p1是同一个Promise实例

2、参数是一个thenable对象，使用Promsie.resolve(),将对象变成Promsie实例，然后立即执行thenable对象的then方法。

3、参数不是thenable对象，只是一个普通的对象，Promise.resolve返回一个状态为fullfilled的Promise对象。

4、不带任何参数，Promsie.resolve返回一个状态为fullfilled的Promise对象。

* Promise.reject

Promise.reject返回一个状态为rejected的Promise实例

## Promise的模拟实现


