# Babel

转译器，原因是前端语言特性和宿主环境告诉发展，但是宿主环境无法第一时间支持新语言特性，而开发者又需要兼顾各种宿主环境，因此语言特性的降级成为刚需

责任：
- 语法转换，一般是高级语言特性的降级
- Polyfill（垫片/补丁）特性的实现和接入
- 源码转换，比如 JSX 等

## Babel设计理念
- 可插拔（Pluggable），比如 Babel 需要有一套灵活的插件机制，召集第三方开发者力量，同时还需要方便接入各种工具；

- 可调式（Debuggable），比如 Babel 在编译过程中，要提供一套 Source Map，来帮助使用者在编译结果和编译前源码之间建立映射关系，方便调试；

- 基于协定（Compact），Compact 可以简单翻译为基于协定，主要是指实现灵活的配置方式，比如你熟悉的 Babelloose 模式，Babel 提供 loose 选项，帮助开发者在“尽量还原规范”和“更小的编译产出体积”之间，找到平衡



`Babel`底层编译
Source code -> @babel/core -> @babel/traverse -> AST -> @babel/generator -> outPut code


## 统一标准化的 babel-preset
qw