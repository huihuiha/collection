// 模拟打车
// 打车时，你可以打快车和专车
// 无论什么车，都有车牌号和车辆名称
// 价格不同，快车每公里1元，专车每公里2元
// 打车时，你要启动行程并显示车辆信息
// 结束行程时候，显示价格

// 抽象类，必须被子类实现，不能直接new Car
abstract class Car {
  name: string;
  number: string;
  abstract price: number; // 抽象属性 - 必须被子类重写
  constructor(name: string, number: string) {
    this.name = name;
    this.number = number;
  }
}

class ExpressCar extends Car {
  price = 1;
  constructor(name: string, number: string) {
    super(name, number);
  }
}

class SpecialCar extends Car {
  price = 2;
  constructor(name: string, number: string) {
    super(name, number);
  }
}

class Order {
  car: Car; // 类型是Car, 是为了兼容 Car 的子类，依赖抽象而不是具体（依赖倒置原则）
  distance: number = 5;

  constructor(car: Car) {
    this.car = car;
  }

  start() {
    console.log(this.car.name + this.car.number);
  }

  end() {
    console.log(this.car.price * this.distance);
  }
}

export default 1;
