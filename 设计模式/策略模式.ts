class User {
  private type: string;
  constructor(type: string) {
    this.type = type;
  }

  buy() {
    const { type } = this;

    if (type === 'ordinary') {
      console.log('普通用户购买');
    }
    if (type === 'menber') {
      console.log('会员用户购买');
    }
    if (type === 'vip') {
      console.log('vip 用户购买');
    }
  }
}

const user1 = new User('vip');

interface IUser {
  buy: () => void;
}

class OrdinaryUser implements IUser {
  buy() {
    console.log('普通用户购买');
  }
}

class MemberUser implements IUser {
  buy() {
    console.log('会员用户购买');
  }
}

class VipUser implements IUser {
  buy() {
    console.log('vip 用户购买');
  }
}

const user2 = new OrdinaryUser();

const strategies = {
  S: function (salary: number) {
    return salary * 4;
  },
  A: function (salary: number) {
    return salary * 3;
  },
  B: function (salary: number) {
    return salary * 2;
  },
};

const calculatiBouns = function (level: 'S' | 'A' | 'B', salary: number) {
  return strategies[level](salary);
};
