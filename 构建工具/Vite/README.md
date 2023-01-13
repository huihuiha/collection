# Vite

`Vite`实现原理：
- 利用浏览器原生支持 ESM 特性，省略对模块的打包，不需要生成 bundle，初次启动更快，HRM机制支持更好
- 开发模式下，通过启动 Koa 服务器在服务器端完成模块的改写（比如单文件的解析和编译）和请求处理，实现真正的按需编译
- Vite Server 的所有逻辑基本都依赖中间件去完成，中间件拦截请求之后做的处理有：
  - 1. 处理 ESM 语法，例如将业务代码中的 import 第三方依赖路径转换成浏览器能够识别的依赖路径
  - 推 .ts .vue 文件进行及时编译
  - 对 Sass/Less 需要预编译的模块进行编译
  - 和浏览器建立 Socket 连接，实现 HMR



## 插件

受限制的 `rollup`插件，一些钩子可能没有

命名限制：rollup-plugin-xxx ：公用的插件，只支持 `vite`的插件：vite-plugin-xxx



### 支持的钩子

- 构建初期：options、buildStart
- 每个模块：resolveld、load、transform
- 服务关闭时：buildEnd、closeBundle
- modulePased不会被调用：该钩子是 ast 解析



### 独有钩子：

- config
- configResolved
- configureServer
- transformIndexHtml
- handleHotUpdate



### 执行时机enforce

控制插件执行顺序

- pre
- normal
- post



### 条件

- 没有使用 moduleParsed 钩子
- 在打包钩子和输出钩子之间没有很强的耦合





