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
                ['', '首页'],     /* /foo/ */
                ['one', 'css'],  /* /foo/one.html */
                ['tow', 'css1']   /* /bar/four.html */
            ],
            '/JS/': [
                ['', 'JS首页'],
                ['one', '内存空间'],
                ['two', '变量对象'],
                ['three', '执行上下文'],
                ['four', '数据类型判断'],
                ['five', '隐式类型转换'],
                ['six', 'new的模拟实现'],
                ['seven', 'call和apply的模拟实现'],
                ['eight', '数组去重'],
                ['nine', '深浅拷贝'],
                ['ten', 'es6的应用'],
                ['eleven', '作用域链'],
            ]
        }
    },
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    serviceWorker: true // 是否开启 PWA
}