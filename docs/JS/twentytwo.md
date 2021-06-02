## 继承 

继承是对类的封装

### 构造函数继承

```javascript
    function Person(name, age) {
        this.name = name
        this.age = age
    }

    function Student(sex, name, age) {
        this.sex = sex
        Person.call(this, name, age)
    }

    var s = new Student('女', 'liaozhen', 27)
```

### 原型链继承
让子类的原型对象成为父类的实例

```javascript
    function Person() {
        this.name = '廖珍'
    }

    Person.prototype.getName = function() {
        console.log(this.name)
    }

    function Child() {
        this.age = 27
    }

    Child.prototype = new Person()

    var c1 = new Child()
```

### 组合继承
构造函数继承和原型链继承组合

```javascript
    function Parent(name) {
        this.name = name
        this.colors = ['red', 'blue', 'green']
    }

    Parent.prototype.getName = function() {
        console.log(this.name)
    }

    function Child(name, age) {
        Parent.call(this, name, age)
        this.age = age
    }

    Child.prototype = new Parent()
    Child.prototype.constructor = Child
```

### 原型式继承

```javascript
function createObj(proto) {
    function Fn() {}
    Fn.prototype = proto
    return new Fn()
}

````


