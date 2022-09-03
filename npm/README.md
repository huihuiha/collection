开发依赖是仅用于开发的程序包，在生产环境中并不需要，如`npm i -D`

`npm`依赖与开发依赖
- http://nodejs.cn/learn/npm-dependencies-and-devdependencies


package.json 与 package.lock.json 的关系：
- https://www.cnblogs.com/yalong/p/15013880.html
- https://blog.csdn.net/qq_29722281/article/details/108550752

一个版本有三部分：X, Y, Z，分别指代大版本、小版本、查缺补漏版本


`npm-preinstall` 切换`npm`源版本，代码中有展示

私有的`npm`镜像优点：
- 确保 npm 服务高速、稳定
- 操作更加安全

部署`npm`私域镜像：
- nexus
- verdaccio
- cnpm

`nexus`部署教程文档：
- https://www.hangge.com/blog/cache/detail_2844.html


总结：
- 如果package.json的依赖版本与package.lock.json版本不一致的时候，就会更新package.lock.json的文件
- 兼容的意思就是package.lock.json的版本 是否在 package.json版本规范的范围
    - ^ 表示大版本、小版本都可以更高
    - ~ 只能查缺补漏版本更高