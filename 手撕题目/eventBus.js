class EventBus {
  constructor() {
    this.listener = {};
  }

  // 订阅
  subscriber(type, cb) {
    const fns = this.listener[type] || [];
    this.listener.fns = [...fns, cb];
  }

  // 发布
  publisher(type, ...args) {
    const fns = this.listener[type] || [];
    fns.forEach((fn) => {
      fn(...args);
    });
  }

  // 取消订阅
  unsubscriber(type, cb) {
    const fns = this.listener[type] || [];
    const index = fns.findIndex((fn) => fn === cb);
    if (index > -1) {
      fns.splice(index, 1);
      if (!fns.length) delete this.listener[type];
    }
  }

  // 取消全部订阅
  unsubscriberAll(type) {
    delete this.listener[type];
  }

  // 清空监听列表
  clearEvent() {
    this.listener = {};
  }
}
