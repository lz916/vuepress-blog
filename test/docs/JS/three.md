### 什么是执行上下文？
* 每当控制器转到可执行代码时，就会创建一个执行上下文。执行上下文可以理解为当前代码的执行环境。它会形成一个作用域。javaScript的执行环境大概可以理解为以下几种：
（1）全局环境：代码运行起来，首先会运行改环境。
（2）函数环境：函数被调用执行时，会进入函数环境执行。
（3）eval(不建议使用)
因此在一个javascript程序中，会有很多个执行上下文，他们共同组成了一个执行上下文栈（栈采用的是先进先出的方式），首先进入栈的是全局环境，栈底永远是全局上下文，而栈顶永远是当前正在执行的函数，当函数执行完，就会跳出执行上下文。
下面我们来看一个执行上下文栈的变化过程

        var color = 'blue';
        function changeColor() {
            var anotherColor = 'red';
            function swapColors() {
                var tempColor = anotherColor;
                anotherColor = color;
                color = tempColor;
            }
            swapColors();
        }
        changeColor()
我们用ESStack来表示上下文栈，很容易理解，第一进入的是全局上下文。
![图片标题](http://upload-images.jianshu.io/upload_images/599584-bb2d5907b658c456.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)。
进入全局上下文后，里面的可代码开始执行。直到遇到changeColor(),changeColor()入栈。
![图片标题](http://upload-images.jianshu.io/upload_images/599584-bbc841d4908c05cb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
执行changeColor里面的可执行代码。遇到swaoColors(),swapColors开始执行入栈。
![图片标题](http://upload-images.jianshu.io/upload_images/599584-8bc0424ffcb2507b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
swaoColors中没有可以执行的函数，swaoColors执行完毕出栈
![图片标题](http://upload-images.jianshu.io/upload_images/599584-bbc841d4908c05cb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
swapColors执行完后，继续执行changeColor,changeColor中没有可以执行的函数，changeColor执行完毕出栈。
http://upload-images.jianshu.io/upload_images/599584-bb2d5907b658c456.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
只剩下全局执行环境。关闭浏览器窗口，全局函数执行完毕。
执行上下文由一下三个部分组成：
（1）变量对象
（2）作用域链
（3）this
接下来我们来分别理解一下这三个部分