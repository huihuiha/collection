class RealImg {
  fileName: string;
  constructor(fileName: string) {
    this.fileName = fileName;
  }

  display() {
    this.loadFromDist();
    console.log(`display... ${this.fileName}`);
  }

  private loadFromDist() {
    console.log(`loading.... ${this.fileName}`);
  }
}

class ProxyImg {
  realImg: RealImg;
  constructor(fileName: string) {
    this.realImg = new RealImg(fileName);
  }
  // 代理
  display() {
    // 这里可以做很多操作
    this.realImg.display();
  }
}

const star = {
  name: 'huihuui',
  age: 18,
  phone: '10000000',
  price: 0,
};

const agent = new Proxy(star, {
  get(target, key) {
    if (key === 'phtone') {
      return '123123123'; // 经纪人电话
    }
  },
});
