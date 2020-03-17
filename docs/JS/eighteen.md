# JS中获取元素宽高和位置各属性的区别

## clientWidth、clientHeight、offsetWidth、offsetHeight

clientWidth表示元素内容的宽度，包括width+padding
clientHeight表示元素内容的高度，包括height+padding
offsetWidth表示元素内容的宽度，包括width+padding+border
offsetWidth表示元素内容的高度，包括height+padding+border

```html
    <div class="red"></div>
```

```css
.red {
    width: 2000px;
    height: 500px;
    border: 2px solid red;
    padding: 20px;
}
```
```js
    let red = document.document.getElementsByClassName('red')[0]
    console.log(red.clientWidth) // 540
    console.log(red.clientHeight) // 540
    console.log(red.offsetWidth) // 548
    console.log(red.offsetHeight) // 548
```
:::danger
在不考虑浏览器兼容的情况下，clientWidth和offsetWidth的区别是offsetWidth包括了边框的宽度
:::

## clientX、clientY、offsetX、offsetY、scrollX、scrollY、pageX、pageY

首先这几个属性是event对象才有的属性
```html
    <div class="box"><div>
```
```css
    .box {
        width: 500px;
        height: 500px;
        border: 4px solid red;
        padding: 20px;
    }
```
```js
    let box = document.document.getElementsByClassName('box')[0]
    box.addEventListener.on('click', (e) => {
        console.log(e.clientX) 
        console.log(e.clientY)
        console.log(e.offsetX)
        console.log(e.offsetY)
        console.log(e.pageX)
        console.log(e.pageY)
    })
```

### clientX、clientY
当前事件被触发时鼠标位置针对于浏览器窗口（浏览器可视区域）的X、y轴距离，不会随着滚动条而改变

:::danger
我们通常所说的可视区不包括工具栏和滚动条
:::

### offsetX、offsetY
触发点相对于触发dom的x、y轴距离

### pageX、pageY
触发点相对于文档区域的X和Y轴距离，会随着滚动条而改变。

### scrollX、scrollY
触发点相对于屏幕显示器的X和Y轴距离





