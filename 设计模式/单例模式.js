function genGetInstance() {
  let instance;

  class SingleTon {}

  return () => {
    if (instance === null) {
      instance = new SingleTon();
    }
    return instance;
  };
}
