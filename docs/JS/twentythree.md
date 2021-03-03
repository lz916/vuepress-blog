# Promise的封装
先看一下Promise的使用

```javascript
    function xxx() {
       return new Promise((resolve, reject) => {
           console.log(1)
       })
    }
    
    xxx.then(() => {
        console.log(2)
    })

```

从以上例子可以看出：
1、给Promise构造函数传了一个回调函数，回调函数中有连个参数**resolve**、**reject**
2、执行then中的回调函数，我们暂时取名为then_cb

所以我们可以大概这样封装：
 
 ```javascript
    const pending = 'PENDING'
    const resolved = 'RESOLVED'
    const rejected = 'REJECTED'
    const isFunction = (fn) => return typeof function === 'function'
    class myPromise {
        constructor(executor) {
            this.thenCallback = null
            this.rejectCallBack = null
            this.onResolvedQueue = []
            this.onRejectedQueue = []
            this._status = pending
            this._value = null
            executor(this._resolve.bind(this), this._reject.bind(this))
        }

        _resolve(value) {
            this._value = value
            this._status = resolved
            if (!pending) return
            const run = () => {
                this._status = resolved
                let cb
                if (cb === this.onResolvedQueue.shift()) {
                    this._value = value
                    cb(value)
                }
            }
            setTimeout(run, 0)
        }

        _reject(value) {
            this._value = value
            if(!pending) return
            let run = () => {
                this._status = REJECTED
                let cb
                if (cb === this.onRejectedQueue.shift()) {
                    cb(value)
                }

            }
            this.rejectCallBack(value)
        }

        then(onResolve, onRejected) {
            if (this._status === pending) {
                if(isFunction(onResolve)) {
                    this.onResolvedQueue.push(onResolve)
                }
                if(isFunction(onRejected)) {
                    this.onRejectedQueue.push(onResolve)
                }
            }
            this.rejectCallBack = onRejected
        }

        catch(onRejected) {
            this.then(null, onRejected)
        }
    }
 ```

写个例子验证一下

```javascript
    const p = new myPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('resolve')
        }, 1000)
    })

    p.then((value) => {
        console.log(value)
    })
```