# 防抖（debounce）和节流（throttle）

## 定义
### 防抖
当持续触发事件时，一段时间内没有再触发事件，事件函数才会执行一次，如果在在设定的时间内又触发了事件，则重新开始延时。
### 节流
当持续触发事件时，保证在一定的事件间隔内只执行一次。

## 模拟实现
### 防抖的模拟实现

```javascript
    function debounce(fn, wait) {
        // fn: 要执行的函数，wait：设定的时间
        var timeout
        return function() {
            var context = this
            var args = arguments
            if (timeout !== null) {
                clearTimeout(timeout)
            }
            timeout = setTimeout(function() {
                fn.apply(context, args) // 让fn中的this指向正确
            }, wait)
        }
    }
```

### 节流的模拟实现

```javascript
    function throttle(fn, wait) {
        var prev = new Date() * 1
        return function () {
            var context = this
            var args = arguments
            var now = new Date() * 1
            if (now - prev >= wait) {
                fn.apply(context, args)
                prev = new Date() * 1
            }
        }
    }
```

## 两者的区别
函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而函数防抖只是在最后一次事件后才触发一次函数。

### 使用场景
防抖：
1. window 的 resize、scroll
2. mousedown、mousemove
3. keyup、keydown
节流：
页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求