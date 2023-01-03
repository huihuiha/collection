class DataContainer {
  data = [10, 20, 30, 40, 50];

  // 获取迭代器
  getIntertor() {
    return new DataIntertor(this);
  }
}

class DataIntertor {
  private data: number[];
  private index = 0;

  constructor(container: DataContainer) {
    this.data = container.data;
  }

  next(): number | null {
    if (this.hasNext()) {
      return this.data[this.index++];
    }
    return null;
  }

  hasNext(): boolean {
    return this.index < this.data.length;
  }
}

const container = new DataContainer();
const iterator = container.getIntertor();
while (iterator.hasNext()) {
  console.log(iterator.next());
}

// 可迭代对象 - 内置Symbol.iterator
const arr = [10, 20, 30];

const arrIterator = arr[Symbol.iterator]();
console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());

// 简易迭代器
interface IteratorRes {
  value: number | undefined;
  done: boolean;
}

class CustomIterator {
  private length = 3;
  private index = 0;

  next(): IteratorRes {
    this.index++;
    if (this.index <= this.length) {
      return {
        value: this.index,
        done: false,
      };
    }
    return {
      value: undefined,
      done: true,
    };
  }

  [Symbol.iterator]() {
    return this;
  }
}

const iterator1 = new CustomIterator();
for (let n of iterator1) {
  console.log(n);
}
