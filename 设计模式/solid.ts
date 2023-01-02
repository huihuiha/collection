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
