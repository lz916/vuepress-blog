# HTTP相关

## HTTP状态码

### 1xxx
1xx表示请求已被接受，但需要后续处理。

** 100（continue）:客户端应继续发送请求
** 101:需要切换协议，服务器通过Upgrade响应头字段通知客户端

### 2xxx
2xx表示请求已成功被服务器接受、理解、并接受

** 200（ok）：请求已成功，请求所希望的响应头或数据体将随此响应返回

** 201（create）:请求已被实现，而且有一个新的资源已经依据请求的需要而被创建，在RESTFul风格的URL设计中，通常用来响应POST请求。

** 202（Accepted）:服务器已接受请求，但尚未处理


** 205（Reset Content）: 服务器成功处理了请求，但不需要返回任何实体内容，205响应禁止包含任何消息体， 与204不同的是，返回此状态码的响应要求请求者重置文档视图。比如用户刚刚提交一个表单，返回205后页面重置，用户可以立即填写下一个表单。

** 206（Partial Content）:HTTP协议允许分片传输。请求头中包含Range字段时。响应需要只返回Range指定的那一段

### 3xx
这类状态码代表需要客户端采取进一步的操作才能完成请求，通常，这些状态码用来重定向

** 301（Moved Permanently）:被请求的资源已永久移到新的位置，并且将来任何对此资源的引用都应该使用本响应返回的诺干URI之一

** 302（Found）:请求的资源现在临时从不同的URI响应请求，除非指定了Cache-Control或Expires，否则该响应不可缓存。 如果当前请求非HEAD或GET，浏览器需取得用户确认，再进行重定向。
** 303（See Other）:对应当前请求的响应可以在另一个URI上被找到，而且客户端应当采用get的方式访问那个资源
** 304（not Modify）：如果客户端发送了一个带条件的GET请求且该请求已被允许，而文档的内容并没有改变，304禁止包含任何实体消息

### 4xx
这类的状态码代表了客户端看起来可能发生了错误，妨碍了服务器的处理。

** 400(Bad Request)：由于包含语法错误，当前请求请求无法被服务器理解，400 通常在服务器端表单验证失败时返回

** 401（Unauthorized）:当前请求需要用户验证，响应中会包含一个WWW-Authenticate字段来询问

** 403（Forbidden）: 服务器已经理解请求，但是拒绝执行它，

** 404（Not Found）: 请求资源未被在服务器上发现

** 405（Method Not Allowed）:请求行中指定的请求方法不能被用于相应的资源

## 5xx
这类状态码代表了服务器在处理请求的过程中有错误或者异常状态发送

** 500（Internal Server Error）: 通常是代码错误，后台Bug

** 502（Bad Gateway）:作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的反应

** 504（Gateway Time-out）:请求超时

## HTTP缓存策略

### 什么是浏览器缓存

浏览器缓存就是浏览器保存通过HTTP获取的所有资源，是浏览器将网络资源存储在本地的一种行为。

### 缓存的资源去哪里了

** memory cache：将资源缓存到内存中，等待下次访问时不需要重新下载，而直接从内存中获取。退出进程时数据会被清除，
** disk cache：将资源缓存到磁盘中，退出进程时数据不会被清除

### 三级缓存原理

1、先在内存中查找，如果有直接加载。
2、如果内存中不存在，则在硬盘中查找，如果有直接加载。
3、如果硬盘中也没有，那么就进行网络请求。
4、请求获取的资源缓存到硬盘和内存

### 浏览器缓存的分类

1、强缓存
2、协商缓存

浏览器再向服务器请求资源时，首先判断是否命中强缓存，再判断是否命中协商缓存

#### 强缓存

####  Expires
它是http1.0时的规范，为一个绝对时间的GMT格式的时间字符串，代表这个资源的失效时间，这个是个绝对时间，当服务器的时间和客户端时间相差较大时，缓存会错乱

#### Cache-Control
它是http1.1出现的header信息，主要利用max-age

