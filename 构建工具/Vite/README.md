# Vite

## 定义

Vite 在开发阶段基于浏览器原生 ESM 的支持实现了`no-bundle`服务，另一方面借助 Esbuild 超快的编译速度来做第三方库构建和 TS/JSX 语法编译，从而能够有效提高开发效率

优势：

- 模块化方面，Vite 基于浏览器原生 ESM 的支持实现模块加载，并且无论是开发环境还是生产环境，都可以将其他格式的产物(如 CommonJS)转换为 ESM。
- 语法转译方面，Vite 内置了对 TypeScript、JSX、Sass 等高级语法的支持，也能够加载各种各样的静态资源，如图片、Worker 等等。
- 产物质量方面，Vite 基于成熟的打包工具 Rollup 实现生产环境打包，同时可以配合`Terser`、`Babel`等工具链，可以极大程度保证构建产物的质量。









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





