# rollup 生成 umd 模块分析

相关`demo`放在同文件夹`code`目录下

分析如下：
`umd`，是`javascript`通用的一种模块定义规范，能够在前端所有场景下使用：

- script标签引入
- amd -define
- commonjs - require
- es module - import

`demo`执行`npm run budile`，其中`utils`指定了导出的代码放在全局对象的`utils`属性中

``` bash
rollup -i src/index.js -o dist/bundle.umd.js -f umd -n utils
```

打包生成了`umd`模块（对应`code`文件夹的`dist`），`code`如下：

```js
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.utils = {}));
})(this, (function (exports) { 'use strict';

	const age = 18;

	exports.age = age;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
```

从整体来看，这是一个立即执行函数，第一个参数传入当前环境，如果通过`script`标签引入则`this`指向的是`window`，第二个参数传入的是一个函数，内部是我们打包前的代码

然后就开始判断当前环境是否存在`exports`和`module`对象，这是因为`commonjs`导出包是通过`module.export`，`es module`导出包是通过`exports`，这两者都是为了兼容`commonjs`与`ES Module`规范

然后也借着判断是否存在`define`，目的是兼容`amd`规范

最后判断是`node`环境还是浏览器环境，将我们编写代码的导出对象放到全局对象的属性中

然后都是通过

