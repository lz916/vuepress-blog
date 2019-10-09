module.exports = {
    title: 'liaozhen`S Blog',
    description: '快乐工作，认真生活',
    head: [
        ['link', { rel: 'icon', href: `/logo.png` }]
    ],
    port: 9999,
    themeConfig: {
        nav: [
            { text: 'HTML', link: '/HTML/' },
            { text: 'CSSs', link: '/CSS/' },
            { text: 'JS', link: '/JS/' },
        ],
        sidebar: {
            '/HTML/': [
              ['', '首页'],     /* /foo/ */
              ['one', 'html'],  /* /foo/one.html */
              ['tow', 'html1']  /* /foo/two.html */
            ],
            '/CSS/': [
                ['one', 'BFC及其应用'],     /* /foo/ */
                ['one', 'css'],  /* /foo/one.html */
                ['tow', 'css1']   /* /bar/four.html */
            ],
            '/JS/': [
                ['one', '内存空间'],
                ['two', '执行上下文'],
                ['three', '执行上下文栈'],
                ['four', '变量对象'],
                ['five', '作用域和作用域链'],
                ['six', 'this的指向'],
                ['seven', '闭包'],
                ['eight', '原型和原型链'],
                ['nine', '深浅拷贝'],
                ['ten', 'new的模拟实现'],
                ['eleven', 'call和apply的模拟实现'],
                ['thirteen', '数组去重']
            ]
        }
    },
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    serviceWorker: true // 是否开启 PWA
}