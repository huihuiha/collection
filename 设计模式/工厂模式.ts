function create(a: string, b: string) {
  class Fn {}
  if (a) return new Fn();
  if (b) return new Fn();
  return false;
}

// 简易工厂模式
// class Productor {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }

// class Creator {
//   create(name: string): Productor {
//     return new Productor(name);
//   }
// }

// 标准工厂模式
type FnType = () => void;
interface IProductor {
  name: string;
  fn1: FnType;
}

class Productor1 implements IProductor {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  fn1() {
    console.log('fn1');
  }
}

class Productor2 implements IProductor {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  fn1() {
    console.log('fn1');
  }
}

class Creator {
  // 依赖倒置原则
  create(type: string, name: string): IProductor {
    if (type === 'p1') {
      return new Productor1(name);
    }
    if (type === 'p2') {
      return new Productor2(name);
    }

    throw new Error('Invalid type');
  }
}

// 场景$
declare interface Window {
  $: (selector: string) => JQuery;
}

class JQuery {
  selector: string;
  length: number;
  constructor(selector: string) {
    const domList = Array.prototype.slice.call(
      document.querySelectorAll(selector)
    );
    const length = domList.length;

    for (let i = 0; i < length; i++) {
      this[i] = domList[i];
    }

    this.selector = selector;
    this.length = length;
  }

  append(dom: Element): JQuery {
    // append操作
    console.log(dom);
    return this;
  }
}

// 不用工厂模式
const div1 = new JQuery('.div1');
const div2 = new JQuery('.div2');

// 使用工厂模式
window.$ = (selector: string) => {
  return new JQuery(selector);
};
