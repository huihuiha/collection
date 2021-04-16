
function Fn(name) {
    this.name = name
    this.age = 20
    return {1111:111}
}
Fn.prototype.say = function () {
    console.log(this.age)
}

function mynew(Fn, ...args) {
    const obj = {}
    obj.__proto__ = Fn.prototype
    let result = Fn.apply(obj, args)
    return result instanceof Object ? result : obj
}

