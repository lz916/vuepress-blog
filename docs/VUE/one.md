# Vue运行机制概览
业务写多了，发现自己对Vue的一些内部实现原理，不是很了解，我们先来看下vue的一个内部实现流程图，再来一步步的看看每个流程的作用，vue内部实现流程图，如下所示：

![title](../../docs/.vuepress/public/images/vue-one1.png)

## 初始化（init）

**new Vue** 之后会调用_init方法，进行初始化，初始化生命周期、data、methods、computed、watch等。最重要的是通过[Object.defineProperty]('https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty')来设置**setter**和**getter**函数，用来实现**响应式**和**收集依赖**。

## 挂载（mount）
初始化之后，会调用$mount之后挂载组件

## 编译（compile）
编译分为三个部分parse、optimize、generate三个阶段，最终得到render function。

### parse

**parse**会用正则来解析template中的指令、class、style等，形成AST。

### optimize

**optimize**的主要作用是用来标记静态节点，在update的时候，会有一个patch的过程，如果是静态节点，diff会直接跳过，这样会减少比较的过程，优化patch过程

### generate

**generate**是将AST转换成render function的过程，得到的结果是render字符串和staticRenderFns字符串。

经过compile的三个阶段之后，组件中就会存在VNode（虚拟dom）所需的render function

##　响应式
响应式的核心是object.defineProperty，上面有讲过在初始化的时候，通过object.defineProperty绑定了setter和getter函数，在对象被读取的时候，会调用getter函数，当对象被赋值的时候，会调用setter函数，而当渲染render function时，会读取所需的对象，所以会调用getter函数，

## Virtual Dom
render function 会被转化成 VNode 节点。Virtual DOM 其实就是一棵以 JavaScript 对象（ VNode 节点）作为基础的树，用对象属性来描述节点，实际上它只是一层对真实 DOM 的抽象。最终可以通过一系列操作使这棵树映射到真实环境上。由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node 等。

虚拟Dom
```javascript
    {
        tag: 'div',                 /*说明这是一个div标签*/
        children: [                 /*存放该标签的子节点*/
            {
                tag: 'a',           /*说明这是一个a标签*/
                text: 'click me'    /*标签的内容*/
            }
        ]
    }
```

渲染后的效果
···html
    <div>
        <a>click me</a>
    </div>
```

## 更新dom
