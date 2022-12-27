// 实现字符串的repeat方法
// 输入字符串s，以及其重复的次数，输出重复的结果，例如输入abc，2，输出abcabc。

// 数组转化
function repeat(s, n) {
  return new Array(n + 1).join(s);
}

// 字符串递归相加
function repeat(s, n) {
  return n > 0 ? (s += repeat(s, --n)) : '';
}

console.log(repeat('abc', 2));
