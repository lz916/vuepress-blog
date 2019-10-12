# CSS布局

### 两栏布局

1. float + margin

```html
    <div>
        <div class="left">我是左边，宽度固定</div>
        <div class="right">我是右边，宽度自适应</div>
    </div>
```

```css
    .left {
        float: left;
        width: 100px;
        height: 500px;
        background-color: yellow;
    } 
    .right {
        background: red;
        margin-left: 110px;
        height: 500px;
    }
```
效果图：
![title](../../docs/.vuepress/public/images/css-three1.png)

2. float + overflow
```html
    <div>
        <div class="left">我是左边，宽度固定</div>
        <div class="right">我是右边，宽度自适应</div>
    </div>
```
```css
    .left {
        float: left;
        width: 100px;
        height: 500px;
        background-color: yellow;
        margin-right: 10px;
    }
    .right {
        background-color: red;
        overflow: hidden;
        height: 500px;
    }
```
效果图：
![title](../../docs/.vuepress/public/images/css-three1.png)

3. absolute + relative
```html
    <div class="parent">
        <div class="left">我是左边，宽度固定</div>
        <div class="right">我是右边，宽度自适应</div>
    </div>
```
```css
    .parent {
        position: relative;
    }
    .left {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        background: yellow;
        height: 500px;
    }
    .right {
        position: absolute;
        background: red;
        left: 110px;
        right: 0px;
        height: 500px;
    }
```
效果图：
![title](../../docs/.vuepress/public/images/css-three1.png)

4. flex布局（pc端兼容性不好）
```html
    <div class="parent">
        <div class="left">我是左边，宽度固定</div>
        <div class="right">我是右边，宽度自适应</div>
    </div>
```

```css
     .parent {
            display: flex;
        }
        .left {
            width: 100px;
            height: 500px;
            background: yellow;
            margin-right: 10px;
        }
        .right {
            flex: 1;
            background: red;
            height: 500px;
        }
```
效果图：
![title](../../docs/.vuepress/public/images/css-three1.png)

