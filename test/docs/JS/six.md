* new有什么作用？我们先看一个例子：

        function Person(name, age) {
            this.name = name
            this.age = age
        }
        Person.prototype.strength = 60
        let person = new Person('liaozhen', 24)
        console.log(person.name)
        console.log(person.age)
        console.log(person.strength)
        
从这个例子中我们可以看出，实例person:

* 可以访问到构造函数Person里面的属性
* 可以访问到构造函数Person原型上的属性

接下来我们来模拟实现一下new的实现，写一个函数来模拟new的实现：

        function objectFactory() {
            let obj = new Object()
            Constructor = [].shift.call(arguments) // 取出arguments的第一个值
            obj.__proto__ = Constructor.prototype // 让obj的原型指向Constructor的原型，使得obj可以访问到Constructor原型上的属性
            Constructor.apply(obj, arguments) //使得obj可以访问到构造函数上的属性
            return obj
        }
        
        objectFactory(Person, 'liaozhen', 24) //返回的结果和上面那个例子是一样的。
        
        