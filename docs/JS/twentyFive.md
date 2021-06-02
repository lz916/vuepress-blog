# 观察者模式

```javascript
    let subjectid = 0
    let observerid = 0
    class Subject() {
        constructor(name) {
            this.observers = []
            this.id = subjectid++
            this.name = name
        }

        // 添加观察者
        addListener(observer) {
            this.observers = this.push(observer)
        }

        // 删除观察者
        removeListener(observer) {
            this.observers = this.observers.filter(item => item.id !== observer.id)
        }

        // 通知
        dispatch() {
            this.observers.forEach(item => {
                item.watch(this.name)
            })
        }
    }

    class Observer {
        constructor() {
            this.id = observerid ++
        }

        watch(subjectName) {
            console.log(`观察者${this.id}发现了被观察者${subjectName}产生了变化`)
        }
    }

    const sub = new Subject('div元素')
    const observer1 = new Observer()
    const observer2 = new Observer()

    sub.addListener(observer1)
    sub.addListener(observer2)
    sub.dispatch()


    // demo02
console.log('golb1');

setTimeout(function() {
    console.log('timeout1');
    process.nextTick(function() {                                            
        console.log('timeout1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('timeout1_promise');
        resolve();
    }).then(function() {
        console.log('timeout1_then')
    })
})

setImmediate(function() {
    console.log('immediate1');
    process.nextTick(function() {
        console.log('immediate1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('immediate1_promise');
        resolve();
    }).then(function() {
        console.log('immediate1_then')
    })
})

process.nextTick(function() {
    console.log('glob1_nextTick');
})
new Promise(function(resolve) {
    console.log('glob1_promise');
    resolve();
}).then(function() {
    console.log('glob1_then')
})

setTimeout(function() {
    console.log('timeout2');
    process.nextTick(function() {
        console.log('timeout2_nextTick');
    })
    new Promise(function(resolve) {
        console.log('timeout2_promise');
        resolve();
    }).then(function() {
        console.log('timeout2_then')
    })
})

process.nextTick(function() {
    console.log('glob2_nextTick');
})
new Promise(function(resolve) {
    console.log('glob2_promise');
    resolve();
}).then(function() {
    console.log('glob2_then')
})

setImmediate(function() {
    console.log('immediate2');
    process.nextTick(function() {
        console.log('immediate2_nextTick');
    })
    new Promise(function(resolve) {
        console.log('immediate2_promise');
        resolve();
    }).then(function() {
        console.log('immediate2_then')
    })
})
```
