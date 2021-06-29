# Webpack

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

// 0 1
```javascript
    class MyPromise {
        consturctor(executor) {
            this.status = 'pending'
            this.value = null
            this.reason = null
            this.fullfilledCallback = []
            this.rejectCallback = []
            executor(this.resolve, this.reject)
        }

        resolve(value) {
            if (this.status === 'pending') {
                this.status = 'fullfilled'
                this.value = value
            }
        }

        reject(reason) {
            if (this.status === 'pending') {
                this.status = 'rejected'
                this.reason = reson
            }
        }
        then(onFullfilled, onRejected) {
            if (this.status === 'fullfilled') {
                onFullfilled(this.value)
            } else if (this.status === 'rejected'){
                onRejected(this.reason)
            } else {
                this.fullfilledCallback.push(onFullfilled)
                this.rejectedCallback.push(onRejected)
            }
        }
    }
```
