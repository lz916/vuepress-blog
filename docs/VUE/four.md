# VNode 节点的实现

## 什么是 VNode 节点

render function 会被转化成 VNode 节点。Virtual DOM 其实就是一棵以 JavaScript 对象（ VNode 节点）作为基础的树，用对象属性来描述节点，实际上它只是一层对真实 DOM 的抽象。最终可以通过一系列操作使这棵树映射到真实环境上

## 实现一个 VNode

```javascript
    class VNode() {
        constructor(tag, data, children, text, ele) {
            this.tag = tag
            this.data = data
            this.children
            this.text = text
            this.elm = elm
        }
    }
```

我们有如下 Vue 代码

```html
<template>
    <span class="demo" v-show="isShow">
        This is a span.
    </span>
</template>
```

用 javascript 代码形式就是这样的

```javascript
function render() {
    return new VNode(
        'span',
        {
            directives: [
                {
                    /* v-show指令 */
                    rawName: 'v-show',
                    expression: 'isShow',
                    name: 'show',
                    value: true
                }
            ],
            /* 静态class */
            staticClass: 'demo'
        },
        [new VNode(undefined, undefined, undefined, 'This is a span.')]
    )
}
```

转换成 VNode 以后

```javascript
    {
    tag: 'span',
    data: {
        /* 指令集合数组 */
        directives: [
            {
                /* v-show指令 */
                rawName: 'v-show',
                expression: 'isShow',
                name: 'show',
                value: true
            }
        ],
        /* 静态class */
        staticClass: 'demo'
    },
    text: undefined,
    children: [
        /* 子节点是一个文本VNode节点 */
        {
            tag: undefined,
            data: undefined,
            text: 'This is a span.',
            children: undefined
        }
    ]
}
```

### 创建一个空节点

```javascript
function createEmptyVNode() {
    const node = new VNode()
    node.text = ''
    return node
}
```

### 创建一个文本节点

```javascript
function createTextVNode(val) {
    return new VNode(undefined, undefined, undefined, String(val))
}
```
### 克隆一个VNode

```javascript
    function cloneVNode (node) {
    const cloneVnode = new VNode(
        node.tag,
        node.data,
        node.children,
        node.text,
        node.elm
    );
    return cloneVnode;
}
```