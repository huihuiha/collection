Function.prototype.ownCall = function (context, ...args) {
    context = (typeof context === 'object' ? context : window)
    // 防止覆盖掉原有属性
    const key = Symbol()
    // 这里的this为需要执行的方法
    context[key] = this
    // 方法执行
    const result = context[key](...args)
    delete context[key]
    return result
}

Function.prototype.ownApply = function (context, args) {
    context = (typeof context === 'object' ? context : window)
    // 防止覆盖掉原有属性
    const key = Symbol()
    // 这里的this为需要执行的方法
    context[key] = this
    // 方法执行
    const result = context[key](...args)
    delete context[key]
    return result
}

// Function.prototype.bind = function (context) {
//     //返回一个绑定this的函数，我们需要在此保存this
//     let self = this
//     // 可以支持柯里化传参，保存参数
//     let arg = [...arguments].slice(1)
//     // 返回一个函数
//     return function () {
//         //同样因为支持柯里化形式传参我们需要再次获取存储参数
//         let newArg = [...arguments
// ]
//         // 返回函数绑定this，传入两次保存的参数
//         //考虑返回函数有返回值做了return
//         return self.apply(context, arg.concat(newArg))
//     }
// }



// Function.prototype.myBind = function (context) {
//     // 判断调用对象是否为函数
//     if (typeof this !== "function") {
//         throw new TypeError("Error");
//     }

//     // 获取参数
//     const args = [...arguments].slice(1),
//         fn = this;

//     return function Fn() {

//         // 根据调用方式，传入不同绑定值
//         return fn.apply(this instanceof Fn ? new fn(...arguments) : context, args.concat(...arguments));
//     }
// }