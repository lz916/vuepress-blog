# Vue-router 的原理

之前路由都是后端定义的，所谓前端路由就是一个 url 对应一个视图，

## 什么是 SPA

SPA(单页应用)就是只有一个 html 文件，一旦项目加载完成，不会因为用户的操作而对页面进行重新加载，取而代之的是通过 js 去动态改变 html 的内容。

## 什么是前端路由

简单的说，就是在保证只有一个 HTML 页面，且与用户交互时不刷新和跳转页面的同时，为 SPA 中的每个视图展示形式匹配一个特殊的 url。在刷新、前进、后退和 SEO 时均通过这个特殊的 url 来实现。

### 实现前端路由要满足以下两点

-   改变 url 且不让浏览器像服务器发送请求。
-   能够监听到 url 的变化

## hash 模式

这里的 hash 指的是 hash 后面的#以及#后面的字符，hash 的变化不会导致向浏览器发出请求，而且 hash 值的变化会触发 changehash,浏览器的前进后退也能进行控制

### hash 模式用代码来实现

```javascript
class hashRouter {
    constructor() {
        //用于存储不同hash值对应的回调函数
        this.routers = {}
        window.addEventListener('hashchange', this.load.bind(this), false)
    }

    // 用户注册视图
    register(hash, callback = function() {}) {
        this.routers[hash] = callback
    }

    // 注册首页
    registerIndex(callback) {
        this.routers['Index'] = callback
    }

    // 注册404页面
    registerNotFound(callback) {
        this.routers['404'] = callback
    }

    // hash值变化的回调函数
    load() {
        let hash = window.location.hash.slice(1)
        let handler
        if (!hash) {
            handler = this.routers['404']
        } else {
            handler = this.routers[hash]
        }
        handler.call(this)
    }
}
```

## history 模式

在 HTML5 之前，就已经有了 history 模式，但是之前的 history 模式只能进行前进后退，HTML5 中，history 新增了以下 api

-   pushState：history.pushState() 添加新的状态到历史状态栈中
-   replaceState: history.replaceState() 用新的状态替换掉新的状态
-   state：history.state 返回当前状态对象

由于 history.pushState() 和 history.replaceState() 可以改变 url 同时，不会刷新页面，所以在 HTML5 中的 histroy 具备了实现前端路由的能力。

对于单页应用的 history 模式而言，url 的改变只能由下面四种方式引起：

-   点击浏览器的前进或后退按钮
-   点击 a 标签
-   在 JS 代码中触发 history.pushState 函数
-   在 JS 代码中触发 history.replaceState 函数

### history 模式的实现

```javascript
    class historyRouter {
        constructor() {
            this.routers = {}
                //监听popstate
            listenPopState(){
                window.addEventListener('popstate',(e)=>{
                    let state = e.state || {},
                        path = state.path || '';
                    this.dealPathHandler(path)
                },false)
            }
        }

        resigter(hash, callback = function() {}) {
            this.routers[hash] = callback
        }

        resigterIndex(callback) {
            this.routers['Index'] = callback
        }

        resigterNotFound(callback) {
            this.routers['404'] = callback
        }
    
        assign(path) {
            history.pushHistory({path}, null, path)
        }

        replace(path) {
            history.replace({path}, null, path)
        }

        dealPathHandle(path) {
            let handler = this.routers[path]
            handler.call(this)

        }
    }
```
