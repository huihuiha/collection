class Subject {
  private state: number = 0;
  private observers: Observer[] = [];

  getState(): number {
    return this.state;
  }

  setState(newState: number) {
    this.state = newState;
    this.notify();
  }

  attach(observer: Observer) {
    this.observers.push(observer);
  }

  private notify() {
    this.observers.forEach((observer) => {
      observer.update(this.state);
    });
  }
}

class Observer {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  update(state: number) {
    console.log(`${this.name} updated, state is ${state}`);
  }
}

const sub = new Subject();
const observer1 = new Observer('A');
const observer2 = new Observer('B');
sub.attach(observer1);
sub.attach(observer2);
sub.setState(1);

// mutationObserver
function callback(records: MutationRecord[], observer: MutationObserver) {
  console.log(observer);
  for (const record of records) {
    console.log(record);
  }
}

const observer = new MutationObserver(callback);

const elem = document.getElementById('container');

observer.observe(elem, {
  attributes: true, // 监听属性变化
  attributeOldValue: true, // 变化之后，记录旧的属性值
  childList: true, // 监听子节点的变化
  characterData: true, // 监听节点的内容或文本变化
  subtree: true, // 递归监听下级所有节点
});
