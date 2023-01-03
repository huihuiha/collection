class Foo {}

const foo = new Foo();

// @ts-ignore
console.log(foo.__proto__ === Foo.prototype); // true
// @ts-ignore
console.log(Foo.prototype.__proto__ === Object.prototype); // true
// @ts-ignore
console.log(Foo.__proto__ === Function.prototype); // true
// @ts-ignore
console.log(Function.prototype.__proto__ === Object.prototype); // true
// @ts-ignore
console.log(Object.prototype.__proto__ === null); // true
