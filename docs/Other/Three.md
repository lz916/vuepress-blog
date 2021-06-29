# 性能优化

性能优化总结起来就是要减少请求数量，减少请求大小，提高响应和加载速度，优化资源加载时期，优化加载方式

## 资源层面

* 对html,css,js进行压缩，合并css，选用合适的图片格式，响应式图片，图片懒加载，雪碧图

## webpack构建方面

* Tree-shaking: Tree shaking 会去除掉无用的代码
* 代码压缩：uglifyjs-webpack-plug,减少代码体积
* 作用域提升
* noParse
* dllPlugin: 重复的库，提取出来，避免打包时不变的库重新构建
* 代码拆分

## 传输层优化

* 开启keep-alive
* 开启Gzip
* http缓存

## 代码层面
合理利用loadin和骨架屏，减少重绘和节流，利用防抖和节流，懒加载，按需加载