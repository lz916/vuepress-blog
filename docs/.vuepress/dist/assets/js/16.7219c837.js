(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{202:function(e,n,a){"use strict";a.r(n);var o=a(0),l=Object(o.a)({},function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("p",[e._v("js的深浅拷贝需要从js的数据类型说起：")]),e._v(" "),a("h3",{attrs:{id:"js的数据类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#js的数据类型","aria-hidden":"true"}},[e._v("#")]),e._v(" js的数据类型")]),e._v(" "),a("ul",[a("li",[e._v("基本数据类型： undifined、null、number、string、boolean、symbol(es6总新增)")]),e._v(" "),a("li",[e._v("复制数据类型：object")])]),e._v(" "),a("h3",{attrs:{id:"简单数据类型和复杂数据类型的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#简单数据类型和复杂数据类型的区别","aria-hidden":"true"}},[e._v("#")]),e._v(" 简单数据类型和复杂数据类型的区别")]),e._v(" "),a("ul",[a("li",[e._v("在内存中的存储方式：\n（1）简单数据类型占据了内存的固定大小，存储在栈内存中。当一个变量向另一个变量复制基本类型的值，会创建这个值的一个副本\n（2）复制数据类型及引用数据类型，它的值是对象，存储在堆内存中，包含引用类型的值的并不是对象本身，而是对象所指向的指针。从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终都指向同一个对象。")])]),e._v(" "),a("p",[e._v("知道了基本数据类型和复制数据类型的区别，也就知道为什么会有浅拷贝和深拷贝之分了。我们来看下面这个列子。")]),e._v(" "),a("pre",[a("code",[e._v("var a = 1\nvar b = a\nb = 2\nconsole.log(a) // 1\nconsole.log(b) // 2\n")])]),e._v(" "),a("p",[e._v("在这个列子中，a,b都是基本数据类型，把a的复制给b,b就是a的一个副本，他们两占有不同位置的内存空间，所以修改b的值，不会改变a的值。")]),e._v(" "),a("p",[e._v("下面我们再看一个关于复制数据类型赋值的例子：")]),e._v(" "),a("pre",[a("code",[e._v("var a = {\n    name: 'liaozhen',\n    age: 24\n}\nvar b = a\nb.age = 25\nconsole.log(a) // {name: 'liaozhen', age: 25}\nconsole.log(b) // {name: 'liaozhen', age}\n")])]),e._v(" "),a("p",[a("img",{attrs:{src:"https://leanote.com/api/file/getImage?fileId=5ac86e04ab64417bf7000ab7",alt:"title"}}),e._v("\n我们发现改变b中的age,a中的age也改变了，那是因为a,b都是引用类型，他们指向同一个内存地址。其实这一段就是一个浅拷贝的过程。有时候我们只是想备份数组，但是只是简单让它赋给一个变量，改变其中一个，另外一个就紧跟着改变，但很多时候这不是我们想要的。于是深拷贝就出现了。")]),e._v(" "),a("h3",{attrs:{id:"深拷贝（让两个对象不指向同一个内存地址）"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#深拷贝（让两个对象不指向同一个内存地址）","aria-hidden":"true"}},[e._v("#")]),e._v(" 深拷贝（让两个对象不指向同一个内存地址）")]),e._v(" "),a("p",[e._v("先列举出一些深拷贝的方法，我们一起来探讨：")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("利用JSON.parse和JSON.stringify\n先看下面这段代码：")]),e._v(" "),a("pre",[a("code",[e._v(" var a = {\n     name: 'liaozhen',\n     age: 24\n  }\n var b = JSON.parse(JSON.stringify(a))\n b.age = 25\n console.log(a) // {name: 'liaozhen', age: 24}\n console.log(b) // {name: 'liaozhen', age: 25}\n")])])])]),e._v(" "),a("p",[a("img",{attrs:{src:"https://leanote.com/api/file/getImage?fileId=5ac870daab64417a09000b34",alt:"title"}}),e._v("\n我们发现改变b中的age,a中的age并没有改变，这就是一个深拷贝，因为利用JSON.parse的时候他会为每个对象开辟一个新的空间。\n但是这种方法只适用于对象中不存在函数的情况下，我们看下面这个例子：")]),e._v(" "),a("pre",[a("code",[e._v("var a = {\n    name: 'liaozhen',\n    say: function() {\n        console.log('my name is liaozhen')\n    } \n}\nvar b = JSON.parse(JSON.stringify(a))\nconsole.log(a) //  {name: 'liaozhen', say: }\nconsole.log(b) // {name: 'liaozhen'}\n")])]),e._v(" "),a("p",[a("img",{attrs:{src:"https://leanote.com/api/file/getImage?fileId=5ac8758aab64417a09000b93",alt:"title"}}),e._v("\n我们发现b没有拷贝进来a中的函数，所以这个方法只适合用在对象中没有函数的场景。")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("数组的深拷贝可以用slice和concat方法（这两种方法不会改变原数组）")]),e._v(" "),a("pre",[a("code",[e._v("  var a = [1, 2, 3]\n  var b = a.concat()\n  b[0] = 4\n  console.log(a) // [1, 2, 3]\n  console.log(b) // [4, 2, 3]\n  var c = a.slice(0)\n  c[0] = 4\n  console.log(a) // [1, 2, 3]\n  console.log(b) // [4, 2, 3]\n")])])])]),e._v(" "),a("p",[e._v("数组的这两个方法可以实现数组的深拷贝，但是这种方法只适用于数组中的值是基本数据类型的。")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("对象的深拷贝（封装一个方法）")]),e._v(" "),a("pre",[a("code",[e._v("  function deepCopy(obj) {\n      var result = {}\n      for (key in obj) {\n          if (typeof obj[key] === 'object') {\n             result[key] = deepCope(obj[key])\n          } else {\n            result[key] = obj[key]\n          }\n      }\n     return result\n  }\n  var a = {\n      name: 'liaozhen',\n      info: {\n          age: 24,\n          sex: '女'\n      }\n  }\n  var b = deepCopy(a)\n  b.name = '廖珍'\n  console.log(a)\n  console.log(b)\n")])])])]),e._v(" "),a("p",[e._v("这里封装了一个对象的深拷贝方法。但是这个方法只适用于对象的深拷贝，并不适用用数组的深拷贝，下面我们封装一个适用于对象和数组通用的深拷贝方法。")]),e._v(" "),a("pre",[a("code",[e._v("    function deepCope(source) {\n         let obj = null\n         for (key in source) {\n             if (source.hasOwnProperty(key)) {\n                 if (typeof source[key] === 'null') {\n                     obj[key] = null\n                 } else if (Object.prototype.toString.call(obj[key] === '[Object Arry]')) {\n                    obj[key]=[];\n                    for(var i=0;i<this[attr].length;i++){\n                        obj[key].push(source[key][i].deepCopy());\n                    }\n                 } else {\n                     obj[key] =  deepCope(source[key])\n                 }\n              }\n         }\n    }")])])])},[],!1,null,null,null);n.default=l.exports}}]);