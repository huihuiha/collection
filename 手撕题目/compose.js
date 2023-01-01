function add3(val) {
  return val + 3;
}

function mul2(val) {
  return val * 2;
}

function compose(...fns) {
  function callback(input, fn) {
    return fn(input);
  }

  return function (param) {
    return fns.reduceRight(callback, param);
  };
}

const computed = compose(add3, mul2);
console.log(computed(2));
