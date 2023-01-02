class SingleTon {
  name: string;
  static instacnce: SingleTon | null;
  private constructor(name: string) {
    this.name = name;
  }
  static getInstance(name: string): SingleTon {
    if (!SingleTon.instacnce) {
      SingleTon.instacnce = new SingleTon(name);
    }
    return SingleTon.instacnce;
  }
}

SingleTon.getInstance('huihui');
