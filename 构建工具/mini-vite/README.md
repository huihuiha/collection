# mini-vite

## 启动
- node kvite.js
- 浏览器访问 http://localhost:3000/

## 任务拆分
- 一个 node 服务器，处理浏览器加载各种资源的请求
- 将一些裸模块替换成相对地址，让浏览器去加载
- node 服务器解析 .vue 文件，让浏览器去识别它
- 支持第三方库