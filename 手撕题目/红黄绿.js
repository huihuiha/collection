// 循环打印红黄绿
// 红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？

function red() {
  console.log('red');
}

function green() {
  console.log('green');
}

function yellow() {
  console.log('yellow');
}

const task = (timer, light) =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (light === 'red') {
        red();
      } else if (light === 'green') {
        green();
      } else if (light === 'yellow') {
        yellow();
      }
      resolve();
    }, timer);
  });
const step = () => {
  task(3000, 'red')
    .then(() => task(2000, 'green'))
    .then(() => task(2100, 'yellow'))
    .then(step);
};
step();
