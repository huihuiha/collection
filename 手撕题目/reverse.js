// 实现字符串翻转
// 在字符串的原型链上添加一个方法，实现字符串翻转：

String.prototype.reverse = function () {
  const s = this;
  return s.split('').reverse().join('');
};

console.log('123'.reverse());
