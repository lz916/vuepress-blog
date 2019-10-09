(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{203:function(n,o,e){"use strict";e.r(o);var t=e(0),r=Object(t.a)({},function(){var n=this,o=n.$createElement,e=n._self._c||o;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("ul",[e("li",[e("p",[n._v("new有什么作用？我们先看一个例子：")]),n._v(" "),e("pre",[e("code",[n._v("  function Person(name, age) {\n      this.name = name\n      this.age = age\n  }\n  Person.prototype.strength = 60\n  let person = new Person('liaozhen', 24)\n  console.log(person.name)\n  console.log(person.age)\n  console.log(person.strength)\n")])])])]),n._v(" "),e("p",[n._v("从这个例子中我们可以看出，实例person:")]),n._v(" "),e("ul",[e("li",[n._v("可以访问到构造函数Person里面的属性")]),n._v(" "),e("li",[n._v("可以访问到构造函数Person原型上的属性")])]),n._v(" "),e("p",[n._v("接下来我们来模拟实现一下new的实现，写一个函数来模拟new的实现：")]),n._v(" "),e("pre",[e("code",[n._v("    function objectFactory() {\n        let obj = new Object()\n        Constructor = [].shift.call(arguments) // 取出arguments的第一个值\n        obj.__proto__ = Constructor.prototype // 让obj的原型指向Constructor的原型，使得obj可以访问到Constructor原型上的属性\n        Constructor.apply(obj, arguments) //使得obj可以访问到构造函数上的属性\n        return obj\n    }\n    \n    objectFactory(Person, 'liaozhen', 24) //返回的结果和上面那个例子是一样的。\n")])])])},[],!1,null,null,null);o.default=r.exports}}]);