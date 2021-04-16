

let obj1 = {
    name: "你好呀",
    message: {
        age: 18,
        sex: "男",
        arr:[1,3,4]
    }
}


function deepClone(obj) {
    if (obj === null) return null; //null 的情况
    if (obj instanceof RegExp) return new RegExp(obj); //正则表达式的情况
    if (obj instanceof Date) return new Date(obj); //日期对象的情况
    if (typeof obj == 'Function') return new function (obj) { }; //函数的情况
    if (typeof obj != "object") {
        //非复杂类型,直接返回 也是结束递归的条件
        return obj
    }
    //[].__proto__.constructor=Array()
    //{}.__proto__.constructor=Object()
    //因此处理数组的情况时,可以取巧用这个办法来new新对象
    var newObj = {}
    for (var key in obj) {
        newObj[key] = deepClone(obj[key])
    }
    return newObj;
}




let obj2 = deepClone(obj1)
console.log(obj2);
obj2.message.age = 20
obj2.message.arr[1] = 999
console.log(obj1)


