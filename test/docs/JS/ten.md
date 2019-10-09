最近看到这样一道练习题：
 
    const obj = {a: 1, b: 2, c: 3}
    function select(obj, arr) {
        // 请实现该方法
    }
    select(obj, ['a', 'c'])
    提示：
    1、尽量使用es6
    2、用尽可能多的实现方式，代码越短越好
    
    // 普通方法
      function select(obj, arr) {
      let result = {}
      // 通过forEach循环
      arr.forEach((item) => {
       result[item] = obj[item]
      })
      return result
    }
    
    // hasOwnProtopy
    function select(obj, arr) {
      let result = {}
      // 通过forEach循环
      arr.forEach((item) => {
      if (obj.)
       result[item] = obj[item]
      })
      return result
    }
    
     //  通过hasOwnPropert更严谨的判断
    function select(obj, arr) {
      let result = {}
      arr.forEach((item) => {
        if(obj.hasOwnProperty(item)) {
          result[item] = obj[item]
        }
      })
      return result
    }
    
    