## 配置篇

网上关于 Taro小程序的单元测试配置比较少，下面有些配置参考了taro-ui与taro-doji

需要安装的依赖：

```json
"@testing-library/jest-dom": "^5.16.5"
"@testing-library/react": "^12.1.2"
"jest": "^26.4.2"
"ts-jest": "^26.3.0"
"@wojtekmaj/enzyme-adapter-react-17": "^0.6.7"
```

enzyme-adapter-react 需要与react的版本对应，例如：enzyme-adapter-react-16 对应 react^16.4.0-0

对应参考：https://github.com/enzymejs/enzyme

关于jest.config.js配置文件：

```js
module.exports = {
  verbose: true,
  moduleNameMapper: {
    "@tarojs/components": "@tarojs/components/dist-h5/react",
    "^.+\\.(css|scss|less)$": "<rootDir>/style-mock.js",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.esm.js?$": "ts-jest",
  },
  rootDir: __dirname,
  setupFiles: ["<rootDir>/test/setup"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!@taro)",
    "^.+\\.(css|sass|scss|less)$",
  ],
};
```

- moduleNameMapper：模块，例如上面配置将小程序的组件对应到h5的组件，像css的文件我们一般都不需要测试，所以就写一个style-mock.js文件，访问直接返回空内容即可

- transform：文件转换器

- setupFiles：预加载， 提前引入哪个文件的内容

- moduleFileExtensions：模块测试的后缀，如果模块没有后缀的时候，则按照该提供的列表查找

- transformIgnorePatterns：测试忽视的文件，常配置 node_modules

- .eslint配置一些取消测试文件提示的报错

```js
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true
    }
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true //预定义的全局变量，这里是浏览器环境
  },
  extends: ['taro/react', 'react-app'],
  globals: {
    test: true,
    expect: true,
  }
}
```



## 宗旨

你的测试越像你的软件使用的方式，测试就越能给你带来信心




## 相关知识

### 命令模式

npx jest --watch会启动命令模式：
![](https://image.lexiang-asset.com/company_a2d7ff42d35411e78229525400ebd317/assets/2022/09/9034584e-300c-11ed-980c-7a9021c0cb4a.png-resize1920?sign=/lLVL8CADDhc2shJsQATX1j23p1hPTEwMDI5MTYyJms9QUtJRE4yMmgydDZqV0pscEtMYWdsVVRSaWx6czFycjZvYWZ2JmU9MTY2MzM5MjkwNiZ0PTE2NjI3ODgxMDYmcj0zMzk0NTI3MzAmZj0vY29tcGFueV9hMmQ3ZmY0MmQzNTQxMWU3ODIyOTUyNTQwMGViZDMxNy9hc3NldHMvMjAyMi8wOS85MDM0NTg0ZS0zMDBjLTExZWQtOTgwYy03YTkwMjFjMGNiNGEucG5nJmI9bGV4aWFuZy0xMDAyOTE2Mg==)

- a：执行所有的测试案例

- f：只执行上次失败的测试文件

- p：让你输入一个正则/字符串，检查所有匹配到的文件名

- u：更新快照信息

- i：只更新失败的快照信息

- q：退出监听模式

例如，组件内容发生变化了，快照对不上了，则出现下面的报错
![](https://image.lexiang-asset.com/company_a2d7ff42d35411e78229525400ebd317/assets/2022/09/c722e6ae-300c-11ed-9ffe-329e220bf0ca.png-resize1920?sign=gURb0kan0wv1k4eNAcqyrjhQrtlhPTEwMDI5MTYyJms9QUtJRE4yMmgydDZqV0pscEtMYWdsVVRSaWx6czFycjZvYWZ2JmU9MTY2MzM5MzExOCZ0PTE2NjI3ODgzMTgmcj04NzAwNDk1MjYmZj0vY29tcGFueV9hMmQ3ZmY0MmQzNTQxMWU3ODIyOTUyNTQwMGViZDMxNy9hc3NldHMvMjAyMi8wOS9jNzIyZTZhZS0zMDBjLTExZWQtOWZmZS0zMjllMjIwYmYwY2EucG5nJmI9bGV4aWFuZy0xMDAyOTE2Mg==)

这时候就需要按 w 展示更多，接着按u 更新快照信息则可以测试通过
![](https://image.lexiang-asset.com/company_a2d7ff42d35411e78229525400ebd317/assets/2022/09/cec6607a-300c-11ed-a74c-9e0fe88f37f9.png-resize1920?sign=Vh6Q0aA4A9UPH5FCQSAZcK3FZYlhPTEwMDI5MTYyJms9QUtJRE4yMmgydDZqV0pscEtMYWdsVVRSaWx6czFycjZvYWZ2JmU9MTY2MzM5MzE0NCZ0PTE2NjI3ODgzNDQmcj04NDU0NTE4MjMmZj0vY29tcGFueV9hMmQ3ZmY0MmQzNTQxMWU3ODIyOTUyNTQwMGViZDMxNy9hc3NldHMvMjAyMi8wOS9jZWM2NjA3YS0zMDBjLTExZWQtYTc0Yy05ZTBmZTg4ZjM3ZjkucG5nJmI9bGV4aWFuZy0xMDAyOTE2Mg==)



## 某些API

### Jest

- toBe(value) 相当于 === 

- toEqual(value) 匹配内容是否相等，不匹配引用

- toBeUndefined：只匹配 undefined

- toBeDefined：只匹配 null

- Jest.fn() 返回一个模拟函数

  - toBeCalledTimes(count) 函数被调用的次数

  - toBeCalledWith(1, 2) 函数被调用时候传递的参数




### enzyme

渲染组件方法：

- shallow：浅渲染，只会渲染组件的第一层DOM

- Mount: 将组件渲染成真实的DOM

- render 将组件渲染成静态 HTML 字符串

元素查找或者属性：

- find(selector) 查找选择器下的DOM 元素，返回一个数组。

- contains(node) 确定是否包含该节点或者一些节点 ，返回true 或者 false

- is(selector) 判断改节点是否能够匹配选择器的节点 ，返回true 或者 false

- hasClass(className) 判断是否包含这个类，返回true 或者 false

- prop[key] 返回组件上某个属性的值

- setState(props) 设置组件状态，函数组件不能使用

- simulate(event[,mock]) 模拟一个节点上的事件




## 常见用法

### 元素

使用 shallow 方法渲染，通过 find(selector) 选择器去找元素

调用 props 方法获取目标元素的一些属性进行一些断言

```js
test('input 框默认提示文案为 请输入todo事件', () => {
 const wrapper = shallow(<Header />);
 const input = wrapper.find('.input');
 expect(input.props().placeholder).toBe('请输入todo事件');
});
```



### 测试交互

通过 simulate 方法在组件上模拟触发某个 DOM 事件，比如 click，change 等等

函数组件由于不像类组件那样可以通过实例获取属性，测试一些 state也是通过交互产生的副作用进行确认

```js
test('输入框输入内容时，inputValue 值发生改变', () => {
 const fn = jest.fn();
 const wrapper = shallow(<Header/>);
 const input = wrapper.find('.input');
 input.simulate('input', {
   detail: {
     value: 'GGG'
  }
});
 const newInput = wrapper.find('.input');
 expect(newInput.props().value).toBe('GGG');
});
```



## TDD 开发模式

优点

- 在开始可以比较明确自己要做什么，把错误暴露在整个开发流程比较靠前的位置，修改的成本也比较小

- -在之后对代码优化的过程中，因为有测试代码的存在，可以更好的优化代码，优化完之后再执行一遍代码，而不用担心优化过程中又出错

- 通过测试代码，可以帮助理清楚程序中关键点

也更有利于之后的维护




缺点：

- 会增加工作量（前期不熟悉的情况较大）

- 如何写更全的测试案例是一个问题




## 学习文档

- https://itxiaohao.github.io/passages/automated-testing-learn-introduction/