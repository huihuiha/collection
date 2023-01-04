class Circle {
  draw() {
    console.log('draw');
  }
}

class Decorator {
  private circle: Circle;
  constructor(circle: Circle) {
    this.circle = circle;
  }

  draw() {
    this.circle.draw();
    this.setBorder();
  }

  private setBorder() {
    console.log('draw border');
  }
}

const circle = new Circle();
const decorator = new Decorator(circle);
decorator.draw();

function testable(val: boolean) {
  return function (target: any) {
    target.isTestable = val;
  };
}

@testable(false)
class Foo1 {
  static isTestable?: boolean;
}

console.log(Foo1.isTestable);

function readOnly(target: any, key: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
}

class Foo2 {
  private name = '张三';
  private age = 20;

  @readOnly
  getName() {
    return this.name;
  }

  getAge() {
    return this.age;
  }
}

function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const oldValue = descriptor.value;

  descriptor.value = function () {
    console.log('记录日志');
    return oldValue.apply(this, arguments);
  };
}

class Foo3 {
  @log
  fn1() {
    // 业务功能....
  }
}
