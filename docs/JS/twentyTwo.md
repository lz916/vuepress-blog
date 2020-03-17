# Promise的实现

promise接受一个函数作为参数，所以我们的思路是要写一个这样的函数传进去。

## 1、声明

```js
    class Promise {
        constructor(executor) {
            this.state = 'pending'
            this.value = undefined
            this.reason = undefined

            let resolve = value => {
                if (this.state === 'pending') {
                    this.state = 'fulfilled'
                    this.value = value
                }
            }

            let reject = reason => {
                if (this.state === 'pending') {
                    this.state = 'rejected'
                    this.reason = reason
                }
            }

            try {
                executor(resolve, reject)
            } catch {
                reject(err)
            }
        }
    }
```