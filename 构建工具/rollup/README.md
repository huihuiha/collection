# Rollup

更注重打包，以 `ESM` 标准为目标的构建工具，特性：

- tree-shaking



## 常见命令

-i：输入文件

--dir：输出目录，可用于多文件输入

--verson：查看版本

--format：产物格式

- iife
- es
- umd，需要指定 --name xx 来设置全局对象
- cjs

--file 单文件输出

--watch：监听文件变化

--config、-c ：指定配置文件

--envirment：指定环境，可在配置文件输出，process.env..TEST

--mode：可用于指定配置文件，例如 process.env.mode 可以获取我们 mode 信息

--plugin：指定插件



## 配置文件

rollup.config.js

```js


module.exports = {
  input: 'index.js',
  external: ['react'], // 将react文件不打入包里面
  output: {
    file: 'dist.js',
    format: 'umd', // 可配置数组多个文件
    name: 'Index',
    plugin: [terser()], // 编译完成之后才会执行的plugin
    banner: "/** Hello **/" // 在文件最上面加入信息
  },
};

```



## 插件

插件流程

input -> rollup main -> plugin1 -> plugin2 -> emit file -> finish



### hooks

- buildStart
- resolveId
- Options

> https://www.rollupjs.com/guide/plugin-development#build-hooks

大部分插件可以直接在 `Vite`中使用



### 官方插件

- alias：设置引入路径别名，映射到别的路径

  > https://github.com/rollup/plugins/tree/master/packages/alias

- babel：转译代码

  > https://github.com/rollup/plugins/tree/master/packages/babel

- replace：指定代码替换

  > htte



### 常见插件

- @rollup/pligun-json：可引入 json 文件
- @rollup/plugin-node-resolve // 将一些第三方的插件打包在业务文件一起 
- @rollup/plugin-commonjs：将 commonjs 转化成 esm 
- @roolup-plugin-terser
- eslint
- image
- strip
- wasm
- typescript

