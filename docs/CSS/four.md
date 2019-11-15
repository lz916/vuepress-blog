# 回流和重绘

## 浏览器的渲染过程

先看来自MDN的渲染过程图：
![title](//upload-images.jianshu.io/upload_images/16323523-11f8f0d37fd2d592.png)

从这张图我们可以简单的分析出浏览器的渲染过程分为以下几个步骤：
1、解析HTML，形成DOM树
2、解析CSS，形成CSSOM，
3、将DOM树和CSSOM树结合生成渲染树（Render Tree）
4、根据生成的渲染树，进行回流，计算节点的位置和大小（回流/Layout）
5、根据渲染树和回流得到的几何信息，得到节点的绝对元素（重绘/Painting）
6、将元素发送到GPU，展示再页面上（展示/Display）

生产的渲染树如下所示：
![title](https://camo.githubusercontent.com/4f6b3a439d409d75a6baea662b623e0ac5ac8e34/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31322f31302f313637393862386438333961376436643f773d3131353026683d35333726663d706e6726733d3334393434)