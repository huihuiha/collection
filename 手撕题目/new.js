function Fn(name) {
  this.name = name;
  this.age = 20;
  return { 1111: 111 };
}
Fn.prototype.say = function () {
  console.log(this.age);
};

function mynew(Fn, ...args) {
  const obj = {};
  obj.__proto__ = Fn.prototype;
  let result = Fn.apply(obj, args);
  // 1.如果 result 返回的是一个复杂类型，则返回 result
  return result instanceof Object ? result : obj;
}

let obj = new Fn('qwe');
console.log(myNew(Fn, 'qwe'));
console.log(obj);
