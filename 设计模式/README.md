# 前端常见的7种设计模式
## 设计模式

- [工厂模式](./工厂模式.md)
- [单例模式](./单例模式.md)
- [观察者模式](./观察者模式.md)
- [迭代器模式](./迭代器模式.md)

## OOP
面向对象思想 OOP，其三要素：

- 继承 - 抽离公共代码，实现代码复用

```ts
class Father {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    console.log(name, age);
    this.name = name;
    this.age = age;
  }

  say() {
    console.log(`my name is ${this.name}`);
  }
}

class Son extends Father {
  sex: string;
  constructor(name: string, age: number, sex: string) {
    super(name, age);
    this.sex = sex;
  }
}
```

- 封装 - 高内聚，低耦合，private、protected

```ts
class Father {
  name: string;
  age: number;
  private weight: number = 500;
  constructor(name: string, age: number) {
    console.log(name, age);
    this.name = name;
    this.age = age;
  }

  say() {
    console.log(`my name is ${this.name}, weight: ${this.weight}`);
  }
}

class Son extends Father {
  sex: string;
  constructor(name: string, age: number, sex: string) {
    super(name, age);
    this.sex = sex;
  }
}
```

- 多态 - 更好的拓展性

```ts
class JQuery {
  css(key: string, value: string): void;
  css(key: IStyleInfo): void;
  css(key: string | IStyleInfo, value?: string): void {
    if (typeof key === 'string') {
      // key value
    } else {
      // object
    }
  }
}
const j = new JQuery();
j.css({});
```

实际上，Vue 与 React 组件都是对象



## UML图

面相对象系统的说明图

三个区域：名称 + 属性 + 方法

类与类之间的关系

- 实现 - 实现接口 <<interface>>，虚线 + 空心箭头

![image-20230102101003524](http://m.qpic.cn/psc?/V534E0Go2CQHfE4fw42n3wGB6T0JFp4I/ruAMsa53pVQWN7FLK88i5lKT8qcOlZfD9uNjL6R6wsBF0BNx*FmC9aWEpErPey4LL5C4dFKgce3AVhd4fy1xIqqEyRkRMO52b4I78L2jEvw!/b&bo=HwEyAQAAAAADBw8!&rf=viewer_4)

-   泛化 - 继承父类

![image-20230102102531949](http://m.qpic.cn/psc?/V534E0Go2CQHfE4fw42n3wGB6T0JFp4I/ruAMsa53pVQWN7FLK88i5tvap80XMzAW4t2hN*2QS2S53svYaefUhAh1OsHgj.n5ToUvrjbmsyDXh0kdtYvysHijnq.fxjlX4BeB91jf8Is!/b&bo=PQJDAQAAAAADF08!&rf=viewer_4)

- 关联 - A 是 B 的属性

![image-20230102102730871](http://m.qpic.cn/psc?/V534E0Go2CQHfE4fw42n3wGB6T0JFp4I/ruAMsa53pVQWN7FLK88i5tvap80XMzAW4t2hN*2QS2StHgwJAokNO3rV1IfR8jI6ZzzT6WeXsVnGVR4K7uEgof2dMFoZdXpN5WcJx0CfPGc!/mnull&bo=5AO.AAAAAAADB3s!&rf=photolist&t=5)

关联关系的细化：

- 聚合 - 整体包含部分，部分可以脱离整体而单独存在

![image-20230102103015512](http://m.qpic.cn/psc?/V534E0Go2CQHfE4fw42n3wGB6T0JFp4I/ruAMsa53pVQWN7FLK88i5tvap80XMzAW4t2hN*2QS2R.NrWWkAn7DI3yaNEld*jWUOvE2LK1pDF*O0r13HBIwuj*yHlDSPsy4TkbyjwhUIg!/b&bo=5gO9AAAAAAADB3o!&rf=viewer_4)

- 组合 - 整体包含部分， 部分不可以脱离整体

![image-20230102103053343](http://m.qpic.cn/psc?/V534E0Go2CQHfE4fw42n3wGB6T0JFp4I/ruAMsa53pVQWN7FLK88i5tvap80XMzAW4t2hN*2QS2T9U6OKSZc03G24YDOaFjAetUMPU3qWNrcqZADBj*qHpJpFfXlzkwH2FpJMfhecY*4!/b&bo=5gPGAAAAAAADFxE!&rf=viewer_4)

- 依赖 - 不是属性关系，而是函数参数或返回值

![image-20230102103112830](http://m.qpic.cn/psc?/V534E0Go2CQHfE4fw42n3wGB6T0JFp4I/ruAMsa53pVQWN7FLK88i5v.BerpOxfcpjGE.o*YUSlnkp5LTg88MF0Eo4K5*O*Y7ptRhY4a5SDMa1mkZ7aiEXRVKcrPtnCU1e2ApbNtv.pE!/b&bo=7gO3AAAAAAADF2g!&rf=viewer_4)



## 设计原则

五大设计原则 SOLID：

- S单一职责原则：功能程序做好一件事，保持相互独立
- O开放封闭原则：对扩展开放，对修改封闭，需要发生改变时，通过扩展来解决，而非改动
- L李氏置换原则：子类能覆盖父类，父类出现的地方，子类也能出现
- I接口隔离原则：保持接口的单一独立， 避免胖接口
- D依赖倒置原则：面向接口编程，而非面向实例

下面给出一个实现 S 与 O原则的小案例：

```ts
function loadImg(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject('loading error');
    };
    img.src = src;
  });
}

const src = `https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png`;

loadImg(src)
  .then((img) => {
    // 只做获取width操作
    console.log(img.width);
    return img;
  })
  .then((img) => {
    // 只做获取height操作
    console.log(img.height);
  })
  .catch((err) => {
    console.log(err);
  });
```

- 小即是美
- 让每个程序只做一件事
- 快速建立原型
- 舍弃高效率，而更关注可移植性和扩展性
- 采用纯文本方式来存储数据







