function add3(val) {
  return val + 3;
}

function mul2(val) {
  return val * 2;
}

function pipe(...fns) {
  function callback(input, fn) {
    return fn(input);
  }

  return function (param) {
    return fns.reduce(callback, param);
  };
}

const computed = pipe(add3, mul2);
console.log(computed(3));
