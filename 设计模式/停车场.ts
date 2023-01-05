// 模拟停车场
// 某车场，分3层。每层100车位
// 每个车位可以监控车辆的进入和离开
// 车辆进入时，显示每层的空余车位数量
// 车辆进入时，摄像头可识别车牌号和时间
// 车辆出来时，出口显示器显示车辆号和停车时长

// 停车信息
interface IEntryInfo {
  number: string;
  inTime: number;
  place?: ParkPlace;
}

// 车辆信息
class Car {
  number: string;
  constructor(number: string) {
    this.number = number;
  }
}

// 摄像头
class ParkCamera {
  shot(car: Car): IEntryInfo {
    return {
      number: car.number,
      inTime: Date.now(),
    };
  }
}

// 显示器
class ParkScreen {
  show(info: IEntryInfo) {
    const { number, inTime } = info;
    const duration = Date.now() - inTime;
    console.log(`车牌号： ${number}, 停车时长： ${duration}`);
  }
}

// 车位
class ParkPlace {
  isEmpty = true;
  getInfo() {
    this.isEmpty = false;
  }
  out() {
    this.isEmpty = true;
  }
}

// 层
class ParkFloor {
  index: number;
  parkPlaces: ParkPlace[];
  constructor(index: number, places: ParkPlace[]) {
    this.index = index;
    this.parkPlaces = places;
  }

  get emptyPlaceNum(): number {
    let num = 0;
    for (const place of this.parkPlaces) {
      if (place.isEmpty) num++;
    }
    return num;
  }
}

// 停车场
class Park {
  parkFloors: ParkFloor[];
  parkCamera = new ParkCamera();
  parkScreen = new ParkScreen();
  entryInfoList: Map<string, IEntryInfo> = new Map();

  constructor(floors: ParkFloor[]) {
    this.parkFloors = floors;
  }

  getInfo(car: Car) {
    // 调用摄像头拍照
    const entryInfo = this.parkCamera.shot(car);
    // 某个车位
    const i = Math.round((Math.random() * 100) % 100);
    // 停在第一层某个车位
    const place = this.parkFloors[0].parkPlaces[i];
    place.getInfo();
    // 记录车辆信息
    entryInfo.place = place;
    this.entryInfoList.set(car.number, entryInfo);
  }

  out(car: Car) {
    const entryInfo = this.entryInfoList.get(car.number);
    if (entryInfo === null) return;
    const { place } = entryInfo;
    if (place === null) return;
    // 车位离开
    place.out();

    // 出口显示器
    this.parkScreen.show(entryInfo);

    // 删除停车信息
    this.entryInfoList.delete(car.number);
  }

  get emptyInfo(): string {
    return this.parkFloors
      .map((floor) => {
        return `${floor.index}层 还有${floor.emptyPlaceNum}个空闲车位`;
      })
      .join('\n');
  }
}
