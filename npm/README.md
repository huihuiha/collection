# npm 与 yarn

## 一、开发依赖
开发依赖是仅用于开发的程序包，在生产环境中并不需要，如`npm i -D`

`npm`依赖与开发依赖
- http://nodejs.cn/learn/npm-dependencies-and-devdependencies

## 二、package.lock.json
package.json 与 package.lock.json 的关系：
- https://www.cnblogs.com/yalong/p/15013880.html
- https://blog.csdn.net/qq_29722281/article/details/108550752

## 三、版本关系
一个版本有三部分：X, Y, Z，分别指代大版本、小版本、查缺补漏版本


## 四、npm-preinstall
`npm-preinstall` 切换`npm`源版本，代码中有展示



## 五、私域镜像
部署`npm`私域镜像：
- nexus
- verdaccio
- cnpm

`nexus`部署教程文档：
- https://www.hangge.com/blog/cache/detail_2844.html

私有的`npm`镜像优点：
- 确保 npm 服务高速、稳定
- 操作更加安全

## 六、依赖管理
`npm`与`yarn`依赖管理
- https://juejin.cn/post/6908954127728918536

上面代码做了个测试，就是我的项目引入了`webpack-sources`，版本是`1.4.0`
然后`webpack`也引入了`webpack-sources`，但版本是`~1.4.1`，这时候`npm i`安装依赖，会出现：
- node_modules会出现 webpack-sourcse@1.4.0
- webpack的node_modules会多出 webpack-sources@1.4.3

否则的话，只会在`node_modules`中出现符合两者的版本，再`webpack`依赖中不会出现


## 七、npm depupe
todo: 了解`npm depupe`命令



## 总结
- 如果package.json的依赖版本与package.lock.json版本不一致的时候，就会更新package.lock.json的文件
- 兼容的意思就是package.lock.json的版本 是否在 package.json版本规范的范围
    - ^ 表示大版本、小版本都可以更高
    - ~ 只能查缺补漏版本更高