// Generator 生成器
function* genNums() {
  yield 10;
  yield 20;
  yield 30;
}

const generator = genNums(); // 迭代器
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());

for (const n of generator) {
  console.log(n);
}

class CustomIterator1 {
  private data: number[];
  constructor() {
    this.data = [10, 20, 30];
  }
  *[Symbol.iterator]() {
    yield* this.data;
  }
}
const iterator2 = new CustomIterator1();
for (const n of iterator2) {
  console.log(n);
}

// generator + yield 实现深度遍历Dom结构

function* traverse(eleList: Element[]) {
  for (const el of eleList) {
    yield el;
    const childList = Array.from(el.children);

    if (childList.length) {
      yield* traverse(childList);
    }
  }
}

const container1 = document.getElementById('container');
for (const node of traverse([container1])) {
  console.log(node);
}
