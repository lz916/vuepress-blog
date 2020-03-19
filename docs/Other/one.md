# eslint 检测和 prettier 格式化在项目中的使用

把这两个用于项目中，主要是方便团队合作，在团队合作的时候发现，每个人的编码方式不一样，显得项目很乱，eslint 主要用于规范写法，prettier 主要用于来格式化代码

## eslint

> eslint 是一个 javascript 代码检测工具

### eslint 在项目中的应用

-   在 package.json 中添加了 eslint 依赖，如果没有安装 eslint 依赖请使用一下命令安装：

```js
    npm install eslint
```

-   确保编辑器中安装了 eslint 插件，如果没有安装，在编辑器中安装一下

-   确保在文件的更目录下创建了.eslintrc.js 文件，下面是我平常项目中的配置,具体 eslint 的配置，请移步[eslint 官网]('https://eslint.bootcss.com/docs/user-guide/getting-started')查看具体配置

```js
module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true, //使用require就不会报错了
        commonjs: true
    },
    extends: ['eslint:recommended', 'prettier', 'prettier/standard'],
    plugins: ['prettier'],
    globals: {
        App: true,
        Page: true,
        Component: true,
        dd: true,
        getApp: true,
        getCurrentPages: true
    },
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        semi: ['error', 'never'],
        quotes: ['error', 'single'],
        indent: ['error', 4]
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    }
}
```

## prettier

> 一个代码格式化的工具，能够解析代码，使用你自己设定的规则来重新打印出格式规范的代码

### prettier 在项目中的应用

-   在 package.json 中添加了 prettier 依赖，如果没有安装 eslint 依赖请使用一下命令安装：

```js
    npm install prettier // 全局安装或者本地安装都是可以的
```

-   在编辑器中安装 prettier 插件

-   在项目根目录创建 prettier.config.js 文件，用于设定格式化规则，下面是我平常项目中的配置,具体 prettie 的配置，请移步[prettie 官网]('https://prettier.io/')查看具体配置

```js
module.exports = {
    printWidth: 80, //一行的字符数，如果超过会进行换行，默认为80
    tabWidth: 4, //一个tab代表几个空格数，默认为80
    useTabs: false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
    singleQuote: true, //字符串是否使用单引号，默认为false，使用双引号
    semi: false, //行位是否使用分号，默认为true
    trailingComma: 'none', //是否使用尾逗号，有三个可选值"<none|es5|all>"
    bracketSpacing: true, //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
    htmlWhitespaceSensitivity: 'ignore',
    jsxBracketSameLine: true,
    endOfLine: 'auto',
    overrides: [
        {
            files: '*.js',
            options: {
                parser: 'babel'
            }
        },
        {
            files: '*.axml',
            options: {
                tabWidth: 4,
                parser: 'html'
            }
        }
    ]
}
```

## 在本地提交前做 lint，未通过 eslint 检测不让本地提交

有兴趣的可以看下这篇文章[用 husky 和 lint-staged 构建超溜的代码检查工作流]('https://segmentfault.com/a/1190000009546913'),下面我说一下我项目中的配置

* 安装 husky

```js
npm in husky -D
```
:::danger
    如果安装husky不生效，可以先把.git文件下的hooks先删掉，把husky删掉，再重装
    ```js
        rm -rf .git/hook
        npm uninstall husky -D
        npm install husky -D
    ```
:::

* 安装 lint-staged

```js
    npm i lint-staged
```

* 在 package.json 中添加配置

```js
    "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": [
      "prettier --write",
      "eslint --fix",
      "git add"
    ]
  },
```


