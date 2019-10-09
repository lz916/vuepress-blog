数组去重
1.双层循环

    funtion unqiue(arr) {
        let res = []
        for (i=0; i<arr.length; i++) {
            for(j=0; j<res.length; i++) {
                if (res[j] === res[j]) {
                    break
                }
            }
            if (j === res.length) {
                res.push(arr[i])
            }
        }
        return res
    }

2.循环+indexOf

    function unquie(arr) {
        for(i=0; i<arr.length; i++) {
            if (res.indexOf(arr[i] === -1) {
                res.push(arr[i])
            }
        }
        return res
    }
    
3.排序后去重

    function unquie(arr) {
        let res = []
        let sort = arr.concat().sort()
        for(i=0; i<arr.length; i++) {
            if (i === 0 || arr[i] !== lastValue) {
                res.push(arr[i])
            }
            lastValue = arr[i]
        }
        return res
    }
    
    4.filter
    
        function unquie(arr) {
            arr.filter(item, index, arrry) {
                return array.indexOf(item) === index
            }
        }
    
